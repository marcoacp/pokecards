
<script>
	let darkMode = false;
	function toggle() {
        darkMode = !darkMode;
        window.document.body.classList.toggle('dark');
    }
</script>

<button on:click={toggle}>
	{#if darkMode }
       Dark Mode: On
	{:else}
        Dark Mode: Off
	{/if}
</button>

<style>
    
    button {
        background-color: transparent;
        color: yellow;
        font-family: 'Roboto', sans-serif;
        font-size: 1.4em;
        outline: none;
        border: none;
        cursor: pointer;
    }

</style>