<template>
	<div class="flex flex-col" v-if="page == 'finish'">
		<div class="flex justify-center p-4">
			<button
				@click="copy()"
				class="p-4 border bg-gray-700 text-gray-200 rounded-md"
			>
				Commit
			</button>
		</div>
		<table class="prose">
			<thead>
				<tr>
					<th>Image</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in result" :key="i.name">
					<td>
						<img :src="i.url" class="flex-grow object-cover h-10" />
					</td>
					<td>
						{{ i.name }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="flex flex-col h-full" v-else-if="page == 'commit'">
		<input
			type="text"
			v-model="title"
			@keypress.enter="enter()"
			ref="text"
		/>
		<img :src="current.url" class="object-contain min-h-0" />
	</div>
	<div v-else-if="page == 'list'" class="grid grid-cols-fill-52 gap-3 p-8">
		<div
			class="h-52 flex items-center justify-center p-4 border rounded-md"
			:class="{
				'bg-blue-200': i.start,
				'bg-red-200': i.end,
			}"
			@click="click(i)"
			v-for="i in files"
			:key="i.file"
		>
			<img :src="i.url" />
		</div>
	</div>
	<div v-else>
		Finished
	</div>
</template>
<script>
import Config from "./HelloWorld.code";
export default Config;
</script>