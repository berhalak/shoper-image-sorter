import Vue from 'vue'
import { ipcRenderer } from "electron"

const Registry : { parent: any, event: string, handler: any }[] = [];

const Bus = new Vue({
	methods : {
		sub(parent: any, event: string, handler: any) {
			Registry.push({
				parent, 
				event, 
				handler
			});
			this.$on(event, handler);
		},
		close(parent: any) {
			const entries = Registry.filter(x=> x.parent == parent);
			for(const e of entries){
				Registry.splice(Registry.indexOf(e), 1);
				Bus.$off(e.event, e.handler);
			}
		}
	}
});

ipcRenderer.on("commit", () => {
	Bus.$emit('commit');
});

ipcRenderer.on("directory", (...args) => {
	Bus.$emit('directory', args[1]);
});
ipcRenderer.on("back", (...args) => {
	Bus.$emit('back');
});

export {
	Bus
}