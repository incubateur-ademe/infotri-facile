<script lang="ts">
	import Infotri from '../../infotri.svelte';
	import { onMount } from 'svelte';

	let categorie = ""
	let consigne = ""
	let avecPhrase = false

	onMount(() => {
		const searchParamsString = window.location.search;
		const searchParams = new URLSearchParams(searchParamsString);
		let categorie = searchParams.get('categorie');
		let consigne = searchParams.get('consigne');
		let avecPhrase = searchParams.get('avecPhrase');
	});

	onMount;
</script>

<main class="flex flex-col items-center justify-center">
	<Infotri categorie={categorie} consigne={consigne} avecPhrase={avecPhrase} />
</main>
