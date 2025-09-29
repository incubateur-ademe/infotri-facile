<script lang="ts">
  import Triman from "../parts/triman.svelte"
  import Website from "../parts/website.svelte"
  import Chaussures from "../parts/chaussures.svelte"
  import Consigne1 from "../parts/consigne-1.svelte"
  import Consigne2 from "../parts/consigne-2.svelte"
  import Consigne3 from "../parts/consigne-3.svelte"
  import Phrase1 from "../parts/phrase-1.svelte"
  import Phrase2 from "../parts/phrase-2.svelte"
  import Phrase3 from "../parts/phrase-3.svelte"
  import Tissu from "../parts/tissu.svelte"
  import Tous from "../parts/tous.svelte"
  import Vetement from "../parts/vetement.svelte"

  let category = $state("")
  let categories = ["tous", "chaussures", "vetement", "tissu"]

  let consigne = $state("")
  let consignes = [
    ["1", "À déposer dans un conteneur"],
    ["2",  "À déposer dans un conteneur ou dans une association"],
    ["3", "À déposer dans un conteneur, dans une association ou dans un magasin volontaire"]  
  ]
  
  let withPhrase = $state(false)

</script>

<div class="w-screen h-screen grid grid-cols-2 divide-x gap-4">
  <main class="flex flex-col gap-2 items-start p-4">
    <h1
      class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
    >
      Concevez facilement votre Info-tri
    </h1>

    <p>
      Ce générateur ne permet, pour le moment, que la création d’Info-tri destiné à des produits tels que des textiles d’habillement, du linge de maison et/ou des chaussures.
    </p>

    <form class="mr-auto flex flex-col gap-4 h-full pt-6">
      <div>
        <h2
          class="pb-4 text-xl font-extrabold dark:text-white"
        >
          Choisissez une catégorie de produit
        </h2>
        {#each categories as _category}
    			<div class="flex items-center mb-4">
            <input
              type="radio"
              bind:group={category}
              value={_category}
              name="categories"
              id={_category}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for={_category} class="ms-2 text-sm text-gray-900 dark:text-gray-300">{_category}</label>
        </div>
    		{/each}
      </div>

      {#if category}
      <div>
        <h2
          class="pb-4 text-xl font-extrabold dark:text-white"
        >
          Choisissez la consigne
        </h2>
        {#each consignes as _consigne}
  			<div class="flex items-center mb-4">
          <input
            type="radio"
            bind:group={consigne}
            value={_consigne[0]}
            id={_consigne[0]}
            name="categories"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for={_consigne[0]} class="ms-2 text-sm text-gray-900 dark:text-gray-300">{_consigne[1]}</label>
        </div>
    		{/each}
      </div>
      {/if}

      {#if consigne}
      <div>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            bind:checked={withPhrase}
            class="sr-only peer"
          >
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm text-gray-900 dark:text-gray-300">Avec la phrase</span>
        </label>
      </div>
      {/if}
    </form>
  </main>

  <aside class="flex flex-col justify-center items-center">
    <div class="scale-200">
      {#if withPhrase}
        <div class="flex justify-center pb-2">
          <Phrase1 />
        </div>
      {/if}

      <div class="flex gap-2">
        <Triman />
        {#if category}
          <div class="items-center px-2 flex gap-2 rounded-lg ring">
            {#if category === "chaussures"}
              <Chaussures />
            {/if}
            {#if category === "tous"}
              <Tous />
            {/if}
            {#if category === "vetement"}
              <Vetement />
            {/if}
            {#if category === "tissu"}
              <Tissu />
            {/if}

            {#if consigne === "1"}
              <Consigne1 />
            {/if}

            {#if consigne === "2"}
              <Consigne2 />
            {/if}

            {#if consigne === "3"}
              <Consigne3 />
            {/if}
          </div>
        {/if}
      </div>

      <div class="pt-2 flex items-center justify-center">
        <Website />
      </div>
    </div>
  </aside>
</div>
