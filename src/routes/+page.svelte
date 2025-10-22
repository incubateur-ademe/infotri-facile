<script lang="ts">
	import type { PageProps } from './$types';
	import Infotri from '../infotri.svelte';
	import H2 from '../h2.svelte';

	let categorie = $state('');
	let categories = ['tous', 'chaussures', 'vetement', 'tissu'];

	let consigne = $state('');
	let consignes = [
		['1', 'À déposer dans un conteneur'],
		['2', 'À déposer dans un conteneur ou dans une association'],
		['3', 'À déposer dans un conteneur, dans une association ou dans un magasin volontaire']
	];

	let avecPhrase = $state(false);
	let afficherScript = $state(false);
	let copied = $state(false)
	let { data }: PageProps = $props();
	let iframe = $derived(`<iframe src="${data.url}embed?consigne=${consigne}&categorie=${categorie}&avecPhrase=${avecPhrase}"></iframe>`);

	async function copyText(text) {
		try {
			await navigator.clipboard.writeText(iframe);
			copied = true
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<div class="grid h-screen w-screen grid-cols-2 gap-4 divide-x">
	<main class="flex flex-col items-start gap-1 p-2">
		<h1
			class="mb-2 text-2xl leading-none font-extrabold tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
		>
			Concevez facilement votre Info-tri [Beta]
		</h1>

		<p class="max-w-prose">
			Ce générateur ne permet, pour le moment, que la création d’Info-tri destiné à des produits
			tels que des textiles d’habillement, du linge de maison et/ou des chaussures.
		</p>

		<form class="mr-auto flex h-full max-w-full flex-col gap-4">
			<div>
				<H2 text="Choisissez une catégorie de produit" />

				{#each categories as _category}
					<div class="mb-2 flex items-center">
						<input
							type="radio"
							bind:group={categorie}
							value={_category}
							name="categories"
							id={_category}
							class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
						/>
						<label for={_category} class="ms-2 text-sm text-gray-900">{_category}</label>
					</div>
				{/each}
			</div>

			{#if categorie}
				<div>
					<H2 text="Choisissez la consigne" />
					{#each consignes as _consigne}
						<div class="mb-2 flex items-center">
							<input
								type="radio"
								bind:group={consigne}
								value={_consigne[0]}
								id={_consigne[0]}
								name="categories"
								class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
							/>
							<label for={_consigne[0]} class="ms-2 text-sm text-gray-900">{_consigne[1]}</label>
						</div>
					{/each}
				</div>
			{/if}

			{#if consigne}
				<div class="fr-toggle">
				    <input bind:checked={avecPhrase} type="checkbox" class="fr-toggle__input" id="toggle" aria-describedby="toggle-messages toggle-hint">
				    <label class="fr-toggle__label" for="toggle" data-fr-checked-label="Activé">Afficher la phrase</label>
				    <div class="fr-messages-group" id="toggle-messages" aria-live="polite">
				    </div>
				</div>
			{/if}

			{#if avecPhrase}
				<div>
					<button
						type="button"
						class="fr-btn"
						onclick={() => (afficherScript = true)}
					>
						Générer
					</button>
				</div>
			{/if}
			{#if afficherScript}
			<div>
				<H2 text="Code à implémenter" />

				<div>
					<p>
						Cette balise HTML vous permet d'afficher l'Info-tri générée sur une page de votre site
						internet. Celle-ci sera automatiquement mis à jour avec les dernières nouveautés.
					</p>
					<p>
						Pour l'utiliser, il vous suffit de copier/coller le code ci-dessous dans votre site
						Internet. En cas de difficultés ou de besoin d'assistance, vous pouvez contacter notre
						équipe .
					</p>
				</div>

				<div class="fr-callout">
					<pre class="whitespace-normal">{iframe}</pre>
					<button
						type="button"
						class="fr-btn"
						onclick={() => copyText(iframe)}
					>
						{#if copied}
						Copié
						{:else}
						Copier
						{/if}
					</button>
				</div>
			</div>
			{/if}
		</form>
	</main>

	<aside class="flex flex-col items-center justify-center">
		<Infotri {consigne} {categorie} {avecPhrase} />
	</aside>
</div>
