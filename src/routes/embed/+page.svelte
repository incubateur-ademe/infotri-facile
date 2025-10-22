<script lang="ts">
	import Infotri from '../../infotri.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	console.log({ data });
</script>

<main class="flex flex-col items-center justify-center">
	<Infotri categorie={data.categorie} consigne={data.consigne} avecPhrase={data.avecPhrase} />
</main>
