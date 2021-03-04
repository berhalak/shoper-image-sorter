<template>
	<div class="">
		<template v-if="finish">
			<div class="flex flex-col">
				<button
					@click="commit()"
					class="p-4 border bg-gray-700 text-gray-200"
				>
					Commit
				</button>
				<table>
					<thead>
						<tr>
							<th>Image</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="i in result" :key="i.name">
							<td>
								<img
									:src="i.url"
									class="flex-grow object-cover h-10"
								/>
							</td>
							<td>
								{{ i.name }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
		<template v-else-if="commit">
			<div class="flex flex-col">
				<input
					type="text"
					v-model.lazy="name"
					@keypress.enter="enter()"
					ref="text"
				/>

				<img :src="current.url" class="flex-grow object-cover" />
			</div>
		</template>
		<template v-else>
			<div class="grid grid-cols-fill-40 gap-3 p-8">
				<div
					class="h-40 flex items-center justify-center p-4 border rounded-md"
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
		</template>
	</div>
</template>
<script>
import Config from "./HelloWorld.back";
export default Config;
</script>