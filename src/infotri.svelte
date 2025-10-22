<script lang="ts">
	import Triman from './parts/triman.svelte';
	import Website from './parts/website.svelte';
	import Chaussures from './parts/chaussures.svelte';
	import Consigne1 from './parts/consigne-1.svelte';
	import Consigne2 from './parts/consigne-2.svelte';
	import Consigne3 from './parts/consigne-3.svelte';
	import CartoucheFr from './parts/cartouche-fr.svelte';
	import Phrase1 from './parts/phrase-1.svelte';
	import Phrase2 from './parts/phrase-2.svelte';
	import Phrase3 from './parts/phrase-3.svelte';
	import Tissu from './parts/tissu.svelte';
	import Tous from './parts/tous.svelte';
	import Vetement from './parts/vetement.svelte';

	let { avecPhrase, categorie, consigne} = $props();
</script>

<div>
	{#if avecPhrase}
		<div class="flex justify-center">
			<Phrase1 />
		</div>
	{/if}

	<div class="pt-4 flex gap-2">
		<Triman />
		{#if categorie}
			<div class="relative flex items-center gap-1 rounded-lg px-2 pt-1 ring-2">
				<CartoucheFr />
				{#if categorie === 'chaussures'}
					<Chaussures />
				{/if}
				{#if categorie === 'tous'}
					<Tous />
				{/if}
				{#if categorie === 'vetement'}
					<Vetement />
				{/if}
				{#if categorie === 'tissu'}
					<Tissu />
				{/if}

				{#if consigne === '1'}
					<Consigne1 />
				{/if}

				{#if consigne === '2'}
					<Consigne2 />
				{/if}

				{#if consigne === '3'}
					<Consigne3 />
				{/if}
			</div>
		{/if}
	</div>

	<div class="flex items-center justify-center pt-2">
		<Website />
	</div>
</div>
