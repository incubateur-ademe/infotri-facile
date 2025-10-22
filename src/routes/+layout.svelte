<script lang="ts">
	import "@gouvfr/dsfr/dist/dsfr.min.css"
	import "@gouvfr/dsfr/dist/utility/utility.min.css"
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
