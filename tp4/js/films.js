import { Pages } from "./Pages.js";
import { apiKey } from "./config.js";

const filmsList = document.querySelector("#films-list");

function createFilm(film) {
    const divFilm = findFilm(film.id);
    
    // const img = document.createElement("img")
    // img.src = film.img;

    const div = document.createElement("div")
    div.classList.add("film-title")
    const divDetails = document.createElement("div")

    div.innerText = `${film.name}`;
    divDetails.innerText = `${film.description}`;

    divFilm.append(div, divDetails);

    divFilm.classList.remove("loading")

    return divFilm;
}

function createEmplacement(film) {
    const div = document.createElement("div")
    div.dataset.film = film.id;
    div.classList.add("info")
    div.classList.add("loading")
    return div;
}

function findFilm(id) {
    return document.querySelector(`[data-film="${id}"]`);
}

async function fetchJson(url) {
    const response = await fetch(url);
    return await response.json();
}

const fetchFilms = (search) => (pages) =>  async (currentPage) => {
    const films = await fetchJson(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&page=${currentPage}&api_key=${apiKey}`)

    console.log(films);

    pages.refreshNavs(films.total_pages, films.page);

    filmsList.innerHTML = "";

    films.results.forEach(async (film) => {
        filmsList.append(createEmplacement(film));
        console.log(film);
        createFilm({
            name: film.original_title,
            img: `${film.poster_path}`,
            description: film.overview,
            id: film.id
        })
    })

}

export async function sendSearch(search) {
    const finalFetchFilms = fetchFilms(search);
    const pages = new Pages(finalFetchFilms);
    finalFetchFilms(pages) (1);
}