<script lang="ts">
	import Infotri from '../../infotri.svelte';
	import { onMount } from 'svelte';

	let categorie = $state('');
	let consigne = $state('');
	let avecPhrase = $state(false);

	onMount(() => {
		const searchParamsString = window.location.search;
		const searchParams = new URLSearchParams(searchParamsString);
		categorie = searchParams.get('categorie') || '';
		consigne = searchParams.get('consigne') || '';
		avecPhrase = searchParams.get('avecPhrase') == "true"
	});

	onMount;
</script>

<main class="flex flex-col items-center justify-center">
	<Infotri {categorie} {consigne} {avecPhrase} />
</main>
