import { Bus } from "@/Bus";
import { ipcMain } from "electron";
import * as fs from "fs";
import fse from "fs-extra";
import path from "path"
import Vue from "vue";


const folder = ".";

type FILE = { url: string, file: string, start: boolean, end: boolean, index: number, name: string }

const START = 1
const END = 2


export default Vue.extend({
	data() {
		const files: FILE[] = [];
		return {
			files,
			folder,
			what: START,
			page: 'list' as 'list' | 'finish' | 'commit' | 'end',
			title: '',
			current: null as any as FILE
		}
	},
	computed: {
		result() {
			let files = this.files as FILE[];
			return files.filter(x => x.start && x.name);
		}
	},
	methods: {
		copy() {
			class Pack {
				name = '';
				files: FILE[] = [];
			}
			const packs: Pack[] = [];
			let current = (f: FILE) => { };
			const hasStart = (f: FILE) => {
				const p = packs[packs.length - 1];
				p.files.push(f);
				if (f.end) {
					current = noStart;
				}
			}
			const noStart = (f: FILE) => {
				if (f.start && f.name) {
					const p = new Pack();
					p.name = f.name;
					p.files.push(f);
					packs.push(p);
					current = hasStart;
				}
			}
			current = noStart;
			for (const f of this.files) {
				current(f);
			}


			for (const p of packs) {

				const folderPath = path.join(this.folder, p.name);
				if (!fs.existsSync(folderPath)) {
					fse.mkdirSync(folderPath);
				}
				for (const f of p.files) {
					const destFile = path.join(folderPath, path.basename(f.file))
					if (fs.existsSync(destFile)) continue;
					fse.moveSync(f.file, destFile);
					console.log(`Copy ${f.file} to ${destFile}`)
				}
			}
			this.page = 'end';
		},
		enter() {
			this.current.name = this.title;
			this.current = this.files.find(x => x.index > this.current.index && x.start) as any;
			if (!this.current) {
				this.page = 'finish';
			}
			this.title = this.current.name;
		},
		click(file: FILE) {
			if (file.start) {
				file.start = false;
				return;
			}
			if (file.end) {
				file.end = false;
				return;
			}

			if (file.index == this.files.length - 1) {
				file.end = true;
			} else {
				if (file.index > 0) {
					this.files[file.index - 1].end = true;
				}
				file.start = true;
			}
		},
		back() {
			if (this.page == 'commit') {
				this.page = 'list';
			} else if (this.page == 'finish') {
				this.current = this.files[0];
				this.title = this.current.name;
				this.page = 'commit';
			}
		},
		load(folder: string) {
			this.folder = folder;
			if (!fs.existsSync(folder)) {
				console.log("Folder " + folder + " doesnt exist");
				return;
			}
			const root = fs.readdirSync(folder).filter(x=> x.toLowerCase().endsWith("jpg"));
			const sources = root.map((x, i) => ({
				file: `${folder}\\${x}`,
				url: `local://${folder}\\${x}`,
				start: false,
				end: false,
				name: '',
				index: i
			}));
			this.files = sources;
			this.page = 'list';
			this.what = START;
		}
	},
	created() {
		Bus.sub(this, 'commit', () => {
			this.page = 'commit';
			this.current = this.files[0];
		});
		Bus.sub(this, 'directory', (x: string) => {
			this.load(x)
		})
		Bus.sub(this, 'back', (x: string) => {
			debugger;
			this.back()
		})
	},
});