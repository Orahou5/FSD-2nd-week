import { Pages } from "./Pages.js";
import { fetchJson } from "./fetchJson.js";

const filmsList = document.querySelector("#films-list");

function createFilm(film) {
    const divFilm = document.createElement("div")
    divFilm.classList.add("info")
    filmsList.append(divFilm);
    
    const img = document.createElement("img")
    img.src = film.img;

    const div = document.createElement("div")
    div.classList.add("film-title")
    const divDetails = document.createElement("div")

    div.innerText = `${film.name}`;
    divDetails.innerText = `${film.description}`;

    divFilm.append(img, div, divDetails);

    return divFilm;
}

function createAllFilms(films, configuration) {
    filmsList.innerHTML = "";

    const posterSize = configuration.apiImage.poster_sizes[2];
    const imgUrl = configuration.apiImage.secure_base_url;

    films.results.forEach(async (film) => {
        const posterPath = film.poster_path !== null ? 
        `${imgUrl}${posterSize}/${film.poster_path}`:
        "./img/placeHolderFilm.png"

        createFilm({
            name: film.original_title,
            img: posterPath,
            description: film.overview,
        })
    })
}

const fetchFilms = (search, configuration) => (pages) =>  async (currentPage) => {
    const films = await fetchJson(configuration.getSearchUrl(search, currentPage));

    pages.refreshNavs(films.total_pages, films.page);

    createAllFilms(films, configuration);
}

export async function sendSearch(search, configuration) {
    const finalFetchFilms = fetchFilms(search, configuration);
    const pages = new Pages(finalFetchFilms, "films");
    finalFetchFilms(pages) (1);
}