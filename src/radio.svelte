<script lang="ts">
	let { group, item, name } = $props();
</script>

<div class="mb-4 flex items-center">
	<input
		type="radio"
		bind:group={group}
		name="categories"
		id={item[0]}
		value={item[0]}
		class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
	/>
	<label for={item[0]} class="ms-2 text-sm text-gray-900">{item[1]}</label>
</div>
