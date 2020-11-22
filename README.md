# Poke-Cards

Simple cards with pokémons informations. This version have the first 151 pokémons.

### Status
-Under development, details at the end of document

## Usage

### install
Clone or download the repo

```bash
npm install
```
### Development
 Start a local server to modify the app
 The app will run in http://localhost:5000/ 

```bash
npm run dev
```
### build
To build your version of the app
The builds files will be in public/build/

```bash
npm run build
```

## Details

- A little Svelte app with pokemon cards. The cards have a pic in front side and informations on the back side.
- You can storage cards in favorites. The favorites remain stored after the app closes 

## Credits

- Made with: [svelte](https://svelte.dev/) 
- Dark Mode: [Fershad Irani](https://www.fershad.com/blog/posts/svelte-dark-mode-toggle/)
- Autocomplete component: [pstanoev](https://github.com/pstanoev/simple-svelte-autocomplete)
- All pokémons data: [PokéApi](https://pokeapi.co/)

## Demo



## App issues and Next steps

#### Issues
-The loading is little slow, for this reason this version have only the firt 151 pokémons.
- The number css class for the front side of the cards is too high. 
#### To Do 
-Replace loops/ifs for funcions and svelte Await blocs.
- Adapt the pokemon type definition system. 
- Add all Pokémons.
- Add a search bar and options for sorting pokémons by order, type etc. 
- Make the app responsive.
- Add animations and Transitions.

