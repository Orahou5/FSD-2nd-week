import { refreshNavs } from "./pages.js";

const pokemonsList = document.querySelector("#pokemons")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createPokemon(pokemon) {
    //const li = document.createElement("li")
    const divPokemon = findPokemon(pokemon.name);
    const img = document.createElement("img")
    img.src = pokemon.img;

    const div = document.createElement("div")

    div.innerText = `Nom : ${capitalizeFirstLetter(pokemon.name)}\nType : ${pokemon.types.map(x => capitalizeFirstLetter(x)).join(", ")}`;

    divPokemon.append(div, img);

    divPokemon.classList.remove("loading")

    return divPokemon;
}

function createPokemonEmplacement(pokemon) {
    const div = document.createElement("div")
    div.dataset.pokemon = pokemon.name;
    div.classList.add("pokemon-info")
    div.classList.add("loading")
    return div;
}

function findPokemon(pokemonName) {
    return document.querySelector(`[data-pokemon="${pokemonName}"]`);
}

export function fetchPokemons(page) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`).then(response => response.json()).then(async pokemonsTruncated => {
        const totalPages = Math.ceil(+(pokemonsTruncated.count)/20);

        refreshNavs(totalPages, page);

        pokemonsList.innerHTML = "";

        pokemonsTruncated.results.forEach((pokemonCut) => {
            pokemonsList.append(createPokemonEmplacement(pokemonCut))

            fetch(pokemonCut.url).then(response => response.json()).then(pokemonFull => {
                createPokemon({
                    name: pokemonFull.name,
                    img: pokemonFull.sprites.front_default,
                    types: [...pokemonFull.types.map(x => x.type.name)]
                })
            })
        })
    })
}