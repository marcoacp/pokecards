<script>
	import { onMount } from 'svelte'
	import Header from './components/Header.svelte'
	import Favorites from './components/Favorites.svelte'
	import All from './components/All.svelte'
	import Home from './components/Home.svelte'
	import ThemeSwitch from './components/ThemeSwitch.svelte'
	import { page, pokelist, favorites } from './components/stores.js'
	import { endPoint } from './components/utils'
import { svg_element } from 'svelte/internal'

	let poke={};
	let count=0;
	
	onMount(async () => {

		for(let pos=0; pos < 151; pos++) {

			await endPoint.get((pos+1).toString())
            .then(response => {
				poke={
					id: pos+1,
					img:response.data.sprites.front_default,
					name:response.data.name,
					types: response.data.types,
					fullType:'',
					height: response.data.height,
					weight: response.data.weight,
				}
				pokelist.set($pokelist = [...$pokelist, poke])
				setFullType($pokelist[pos])
			})
			count++
		}	
		retrieveFavorites()				
	});

	
	function retrieveFavorites() {
		let favs = window.localStorage.getItem('favoritesId').split(","); 

		for(let pos = 0; pos < favs.length; pos++){

			for(let aux = 0; aux < $pokelist.length; aux++) {
				if( favs[pos] == $pokelist[aux].id ) {
					$favorites = [...$favorites, $pokelist[aux]]
				}
			}
		}

	}

	function setFullType(currentPoke){
        	for(let aux = 0; aux < currentPoke.types.length; aux++)
        	{
            	if(currentPoke.fullType == undefined)
                	currentPoke.fullType = currentPoke.types[aux].type.name
            	else
                	currentPoke.fullType+=(currentPoke.types[aux].type.name)        
			}
	}
	

</script>

<header>
	<Header></Header>
	<ThemeSwitch></ThemeSwitch>
</header>

<main>
	<p class="page">{$page}</p>
	{#if $page == 'Favorites'}
		<Favorites></Favorites>
	{:else}
		{#if $page == 'All'}
			<All></All>
		{:else}	
			{#if count < 151}
				<span class='loading'>Loading pokémons...</span>
			{:else}
				<Home></Home>		
			{/if}
		{/if}				
	{/if}
	
	

</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap');
	
	:root{
		--bg-color: #e4f9ff;
		--text-color: #385561;
	}
	
	:global(body) {
		background: var(--bg-color);
		color: var(--text-color);
	}
	
	:global(body.dark) {
		--bg-color: #333;
		--text-color: yellow;
	}

	header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		position: fixed;
		top: 0;
		background-color: rgb(154, 112, 202);
		max-width: 1080px;
		z-index: 2;
		border-radius: 20px;
		padding-left: 20px;
		padding-right: 20px;  
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (min-width: 300px) {
		main {
			max-width: 1080px;
		}
	}

	.page {
		color: var(--page-color);
		font-family: 'Stalinist One', cursive;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	.loading {
		color: var(--text-color);
		font-size: 1.2em;
		font-family: 'Goldman', cursive;
		text-transform: uppercase;
	}

	


</style>