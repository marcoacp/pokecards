<script>
    import { onMount, onDestroy } from 'svelte'
    import { favorites, pokelist } from './stores.js'
    import AutoComplete from "simple-svelte-autocomplete"; 
    
    
    function storageFavorite(){
        let favoritesId=[];

        for(let pos = 0;pos < $favorites.length; pos++){

        favoritesId=[...favoritesId, $favorites[pos].id];
        }
        window.localStorage.setItem('favoritesId', favoritesId)
    }

    function addFavorite(poke) {
        let compare = 0;

        for(let pos = 0; pos < $favorites.length; pos++) {

            if($favorites[pos].id == poke.id){
                compare++;
            }
        }
        
        if(compare == 0) {

            $favorites=[ ...$favorites, poke ]
            storageFavorite()
        }
        else
            alert('Already in favorites')
        
    }
  
    function removeFavorite (poke) {
        let removedPoke;
        for(let pos = 0; pos < $favorites.length; pos++) {

            if($favorites[pos].id == poke.id){
                removedPoke=$favorites.splice($favorites.indexOf(poke), 1);
                favorites.set($favorites); 
                storageFavorite(); 
            }
        }
    }

    let selectedPoke;
    
</script>

<AutoComplete
  items={$pokelist} bind:selectedItem={selectedPoke}
  labelFieldName='name' placeholder='Type/select Pokémon'/>

<button 
    type='button' disabled={selectedPoke == undefined ? true : false}
    on:click={() => addFavorite(selectedPoke)}>

    Add

</button>  

<div class="cards">
    {#each $favorites as poke}

        <div class="card">
            <div class="card-inner">  

                <div class="card-front {poke.fullType}">
                    <p class="poke-id">{poke.id}</p>
                    <img src={poke.img} alt="Avatar" class="avatar">
                    <p class="poke-name">{poke.name.toUpperCase()}</p>
                </div>

                <div class="card-back">
                    <span>{poke.name.toUpperCase()}</span>
                    <span>Pokedéx number: {poke.id}</span>
                    <span>Height: {poke.height} M</span>
                    <span>weight: {poke.weight} KG</span>
                    <span>Types:</span>
                    {#each poke.types as types}
                        <span>{types.type.name.toUpperCase()}</span> 
                    {/each}

                    <button on:click={() => removeFavorite(poke)}>
                        Remove
                    </button>
                </div>
        </div>
      </div>
  {/each}  

</div>

<style>

    button {
        margin-top: 10px;
        font-family: 'Roboto', sans-serif;
        background-color: whitesmoke;
        outline: none;
        border:1px solid black;
        border-radius: 8px; 
        padding: 5px;
        cursor: pointer;
    }

    button:active {
        background-color: #385561;
        color: white;
    }

    img{
        width: 600px;
        height: 400px;
         max-width: 100%;
        display: block;
    }

    /*cerds basics classes*/
    .cards{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        max-width: 1080px;
    }
    
    .card {
        background-color: transparent;
        width: 150px;
        height:200px;
        perspective: 1000px;
        cursor: pointer;
        border-radius: 15%;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        border-radius: 15%;;
    }
    
    .poke-id {
        position: absolute;
        left: 7%;
        top: -1%;
        z-index: 1;
    }
    
    .poke-name {
        position: absolute;
        left: center;
        bottom: -5%;
        z-index: 1;
    }
    
    .card:hover .card-inner {
        transform: rotateY(180deg);
    }
    
    .card-front, .card-back {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; 
        backface-visibility: hidden;
        border-radius: 15%;
    }
    
    .card-front {
        color: black;
        font-family: 'Goldman', cursive;
        font-size: 1em;
        font-weight: 700;
    }
    
    .card-back {
        background-color: #385561;
        color:#e4f9ff;
        transform: rotateY(180deg);
        font-family: 'Roboto', sans-serif;
    }
    
    /* Clesses for pokemon type */
    .fire{
        background-image: linear-gradient(yellow, var(--fire));
    }

    .water{
        background-color: var(--water);
        color:white;
    }

    .bug{
        background-color: var(--bug);
    }  

    .flyying{
        background-color: var(--flying);
    }

    .ice{
        background-color: var(--ice);
    }

    .rock{
        background-color: var(--rock);
    }

    .ground {
        background-color: var(--ground);
        color:white;
    }

    .poison {
        background-color: var(--poison);
        color:white;
    }

    .fighting {
        background-color: var(--fighting);
    }

    .normal {
        background-color: var(--normal);
    }

    .electric {
        background-color: var(--electric);
    }

    .psychic {
        background-color: var(--psychic);
    }

    .fairy {
        background-color: var(--fairy);
    }

    .grass {
        background-color: var(--grass);
    }

    .dragon {
        background-color: var(--dragon);
    }

    .grasspoison, .poisongrass{
        background-image: linear-gradient(var(--poison), var(--grass));
        color:white;
    }

    .bugpoison, .poisonbug{
        background-image: linear-gradient(var(--poison), var(--bug));
        color:white;
    }

    .fireflying, .flyingfire{
        background-image: linear-gradient(var(--flying),yellow, var(--fire));
    }

    .rockground, .groundrock {
        background-image: linear-gradient(var(--rock), var(--ground));
        color:white;
    }

    .waterice, .icewater {
        background-image: linear-gradient(var(--water), var(--ice));
    }

    .normalflying, .flyingnormal {
        background-image: linear-gradient(var(--flying), var(--normal));
    }

    .waterfighting, .fightingwater {
        background-image: linear-gradient(var(--water), var(--fighting));
    }

    .poisonghost, .ghostpoison {
        background-image: linear-gradient(var(--poison), var(--ghost));
        color:white;
    }

    .bugflying, .flyingbug{
        background-image: linear-gradient(var(--flying), var(--bug));
    }

    .electricflying, .flyingelectric{
        background-image: linear-gradient(var(--flying), var(--electric));
    }

    .groundpoison, .poisonground{
        background-image: linear-gradient(var(--poison), var(--ground));
        color:white;
    }

    .fairynormal, .normalfairy{
        background-image: linear-gradient(var(--normal), var(--fairy));
    }

    .waterpoison, .poisonwater{
        color:white;
        background-image: linear-gradient(var(--water), var(--poison));
    }

    .flyingpoison, .poisonflying{
        background-image: linear-gradient(var(--flying), var(--poison));
    }

    .buggrass, .grassbug {
        background-image: linear-gradient(var(--bug), var(--grass));
    }

    .waterpsychic, .psychicwater{
        background-image: linear-gradient(var(--water), var(--psychic));
    }

    .icepsychic, .psychicice{
        background-image: linear-gradient(var(--ice), var(--psychic));
    }

    .fairypsychic, .psychicfairy{
        background-image: linear-gradient(var(--fairy), var(--psychic));
    }

    .grasspsychic, .psychicgrass{
        background-image: linear-gradient(var(--grass), var(--psychic));
    }

    .waterflying, .flyingwater{
        background-image: linear-gradient(var(--flying), var(--water));
    }

    .waterrock, .rockwater{
        background-image: linear-gradient(var(--water), var(--rock));
    }

    .rockflying, .flyingrock{
        background-image: linear-gradient(var(--flying), var(--rock));
    }

    .iceflying, .flyingice{
        background-image: linear-gradient(var(--flying), var(--ice));
    }

    .dragonflying, .flyingdragon{
        background-image: linear-gradient(var(--flying), var(--dragon));
    }

    .steelelectric, .electricsteel{
        background-image: linear-gradient(var(--electric), var(--steel));
    }

    </style>
