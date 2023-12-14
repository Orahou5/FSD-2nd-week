import { sendSearch } from "./films.js";

const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    sendSearch(formData.get("search-bar"));
})

//fetchPokemons(1)

//fetchFilms(1)

