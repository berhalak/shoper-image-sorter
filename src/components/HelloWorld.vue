<template>
	<div class="text-lg text-red-300">Hello</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "HelloWorld",
	props: {
		msg: String,
	},
});
</script>
