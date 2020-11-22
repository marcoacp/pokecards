<script>
    import { page } from './stores.js';

    function handleSection(section){

        page.set(section)
    }

</script>

<nav>
    <ul>
        <li>
            <button value="All" class='btn-nav' on:click={ () =>handleSection('All') } >
                All
            </button>
        </li>
        <li>    
            <button value="Favorites" class='btn-nav' on:click={ () =>handleSection('Favorites') } >
                Favorites
            </button>
        </li>
    </ul>
</nav>

<style>

    nav {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    ul {
        display: flex;
    }

    li {
        margin-right: 10px;
    }


    .btn-nav {
        opacity: 1;
        color: yellow;
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline-style: none;
        font-size: 1.5em;
        font-family: 'Roboto', sans-serif;
        padding: 5px;
        display: block;

    }
    

</style>