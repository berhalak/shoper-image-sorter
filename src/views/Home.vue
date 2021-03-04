<template>
	<div class="bg-red-400">
		{{ files }}
	</div>
</template>

<script lang="ts">
import * as fs from "fs";
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
	name: "Home",
	components: {
		HelloWorld,
	},
	data() {
		return {
			files: [],
		};
	},
	created() {
		const root = fs.readdirSync("/");
		this.files = root as any;
	},
});
</script>
