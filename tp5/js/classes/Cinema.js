import { fetchJson } from "../fetchJson.js";
import { Pages } from "./Pages.js";

export class Cinema {
    pages = null;

    constructor(limit = 20) {
        this.pages = new Pages(this.fetchCinema.bind(this), "cinema");
        this.limit = limit;
        this.cinemasList = document.querySelector("#cinemas-list");
    }

    createCinema(cinema) {
        const divSecond = document.createElement("div")
        divSecond.classList.add("info")
        this.cinemasList.append(divSecond);
    
        const div = document.createElement("div")
        div.classList.add("cinema-title")
        const divDetails = document.createElement("div")
        divDetails.classList.add("cinema-details")
    
        div.innerText = `${cinema.name}`;
        divDetails.innerText = `${cinema.adresse}\n${cinema.ville}`;
    
        divSecond.append(div, divDetails);
    
        return divSecond;
    }
    
    createAllCinemas(cinemas) {
        this.cinemasList.innerHTML = "";
    
        cinemas.results.forEach(async (cinema) => {
            this.createCinema({
                name: cinema.nom,
                adresse: cinema.adresse,
                ville: cinema.commune,
            })
        })
    }

    params(page) {
        return new URLSearchParams({
            order_by: "fauteuils",
            limit: this.limit,
            offset: (page - 1) * this.limit
        });
    }

    totalPages(count) {
        return Math.ceil(+(count)/this.limit);
    }

    async fetchCinema(page) {
        console.log(this)
        const cinemas = await fetchJson(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?${this.params(page)}`);

        this.pages.refreshNavs(this.totalPages(cinemas.total_count), page);

        this.createAllCinemas(cinemas);
    }
}