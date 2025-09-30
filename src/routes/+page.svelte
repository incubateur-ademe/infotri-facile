<script lang="ts">
	// import Triman from '../parts/triman.svelte';
	// import Website from '../parts/website.svelte';
	// import Chaussures from '../parts/chaussures.svelte';
	// import Consigne1 from '../parts/consigne-1.svelte';
	// import Consigne2 from '../parts/consigne-2.svelte';
	// import Consigne3 from '../parts/consigne-3.svelte';
	// import Phrase1 from '../parts/phrase-1.svelte';
	// import Phrase2 from '../parts/phrase-2.svelte';
	// import Phrase3 from '../parts/phrase-3.svelte';
	// import Tissu from '../parts/tissu.svelte';
	// import Tous from '../parts/tous.svelte';
	// import Vetement from '../parts/vetement.svelte';
	import NextTriman from '../nextParts/triman.svelte';

	type Box = { width: number; height: number; x: number; y: number };
	let category = $state('');
	let categories = ['tous', 'chaussures', 'vetement', 'tissu'];

	let consigne = $state('');
	let consignes = [
		['1', 'À déposer dans un conteneur'],
		['2', 'À déposer dans un conteneur ou dans une association'],
		['3', 'À déposer dans un conteneur, dans une association ou dans un magasin volontaire']
	];

	let withPhrase = $state(false);

	// Next approach
	// Init elements
	let trimanEl: SVGGElement;
	let cartoucheEl: SVGRectElement;
	let w = $state(175);
	let h = $state(49);

	// Init boxes
	let trimanBox = $state<Box>({ width: 0, height: 0, x: 0, y: 0 });
	let cartoucheBox = $derived<Box>({ width: w, height: h, x: trimanBox.width + 5, y: 0 });
	let categoryBox = $derived<Box>({
		width: 20,
		height: 20,
		x: cartoucheBox.x + 5,
		y: cartoucheBox.y + 5
	});
	let consigneBox = $derived<Box>({
		width: 20,
		height: 20,
		x: categoryBox.x + categoryBox.width + 5,
		y: categoryBox.y
	});

	// Init variables
	let trimanW = $state(0);
	let trimanH = $state(0);
	let cartoucheW = $state(70);
	let cartoucheH = $state(36);
	let cartoucheX = $state(0);

	let viewBox = $derived(
		`${cartoucheBox.x} ${cartoucheBox.y} ${cartoucheBox.width} ${cartoucheBox.height}`
	);

	// recalc when DOM refs change
	$effect(() => {
		const tbb = trimanEl?.getBBox();
		trimanBox = tbb;
		if (tbb) {
			trimanW = tbb.width;
			trimanH = tbb.height;
		}

		const cbb = cartoucheEl?.getBBox();
		if (cbb) {
			cartoucheW = cbb.width;
			cartoucheH = cbb.height;
		}

		cartoucheX = trimanW + 10;
		w = trimanW + cartoucheW + 20;
		h = Math.max(trimanH, cartoucheH) + 20;
	});
</script>

<div class="grid h-screen w-screen grid-cols-2 gap-4 divide-x">
	<main class="flex flex-col items-start gap-2 p-4">
		<h1
			class="mb-4 text-2xl leading-none font-extrabold tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
		>
			Concevez facilement votre Info-tri
		</h1>

		<p>
			Ce générateur ne permet, pour le moment, que la création d’Info-tri destiné à des produits
			tels que des textiles d’habillement, du linge de maison et/ou des chaussures.
		</p>

		<form class="mr-auto flex h-full flex-col gap-4 pt-6">
			<div>
				<h2 class="pb-4 text-xl font-extrabold">Choisissez une catégorie de produit</h2>
				{#each categories as _category}
					<div class="mb-4 flex items-center">
						<input
							type="radio"
							bind:group={category}
							value={_category}
							name="categories"
							id={_category}
							class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
						/>
						<label for={_category} class="ms-2 text-sm text-gray-900">{_category}</label>
					</div>
				{/each}
			</div>

			{#if category}
				<div>
					<h2 class="pb-4 text-xl font-extrabold">Choisissez la consigne</h2>
					{#each consignes as _consigne}
						<div class="mb-4 flex items-center">
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
				<div>
					<label class="inline-flex cursor-pointer items-center">
						<input type="checkbox" bind:checked={withPhrase} class="peer sr-only" />
						<div
							class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"
						></div>
						<span class="ms-3 text-sm text-gray-900">Avec la phrase</span>
					</label>
				</div>
			{/if}
		</form>
	</main>

	<aside class="flex flex-col items-center justify-center">
		<div class="bg-pink h-24 w-full">
			<svg {viewBox} width="100%" height="100%">
				<!-- Triman always on the left -->
				<NextTriman bind:ref={trimanEl} />

				<!-- Phrase above everything -->
				{#if withPhrase}
					<text x={w / 2} y="0" text-anchor="middle" fill="black" font-size="10">
						Vos textiles et chaussures ont de l'avenir, donnez-les !
					</text>
				{/if}

				<!-- Cartouche rectangle -->
				<rect
					bind:this={cartoucheEl}
					x={cartoucheX}
					y="1"
					width={cartoucheW}
					height={cartoucheH}
					rx="10"
					ry="10"
					stroke="black"
					stroke-width="1"
					fill="transparent"
				/>

				<!-- Everything inside the cartouche -->
				{#if category}
					<rect
						fill="tomato"
						width={categoryBox.width}
						height={categoryBox.height}
						x={categoryBox.x}
						y={categoryBox.y}
					/>
				{/if}

				{#if consigne}
					<rect
						fill="pink"
						width={consigneBox.width}
						height={consigneBox.height}
						x={consigneBox.x}
						y={consigneBox.y}
					/>
				{/if}
			</svg>
		</div>
	</aside>
</div>
