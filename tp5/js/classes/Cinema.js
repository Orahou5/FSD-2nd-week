import { fetchJson } from "../fetchJson.js";
import { haversine } from "../geo.js";
import { Pages } from "./Pages.js";

export class Cinema {
    pages = null;

    constructor(coords, limit = 20) {
        this.pages = new Pages(this.displayCinemas.bind(this), "cinema");
        this.limit = limit;
        this.coords = coords;
        this.cinemasList = document.querySelector("#cinemas-list");
        this.cinemas = [];
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
    
        cinemas.forEach(async (cinema) => {
            this.createCinema({
                name: cinema.nom,
                adresse: cinema.adresse,
                ville: cinema.commune,
            })
        })
    }

    createLoadingCinema() {
        this.createAllCinemas([{
            nom: "Chargement...", 
            adresse: "", 
            commune: ""
        }]);
    }

    params(page) {
        return new URLSearchParams({
            order_by: "fauteuils",
            limit: this.limit,
            offset: (page - 1) * this.limit,
            where: `within_distance(geolocalisation, geom'POINT(${this.coords.lon} ${this.coords.lat})', 10km)`
        });
    }

    totalPages(count) {
        return Math.ceil(+(count)/this.limit);
    }

    async fetchAndAddCinemas(page) {
        const cinemas = await fetchJson(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?${this.params(page)}`);

        if(cinemas === null) return null;

        this.cinemas.push(...cinemas.results);

        return cinemas;
    }

    async fetchCinema(page) {
        this.createLoadingCinema();

        const cinemas = await this.fetchAndAddCinemas(page);

        console.log(cinemas)

        const promises = [];
        const totalPages = this.totalPages(cinemas.total_count);

        for(let i = 2; i <= totalPages; i++) {
            promises.push(this.fetchAndAddCinemas(i));
        }

        await Promise.all(promises);

        this.sortCinemasByDistance();

        this.displayCinemas(1);
    }

    sortCinemasByDistance() {
        this.cinemas.sort((a,b) => {
            const distA = haversine(this.coords, a.geolocalisation);
            const distB = haversine(this.coords, b.geolocalisation);
            return distA - distB;
        });
    }

    currentPage(page) {
        return this.cinemas.slice((page - 1) * this.limit, page * this.limit);
    }

    displayCinemas(page) {
        this.pages.refreshNavs(this.totalPages(this.cinemas.length), page);

        this.createAllCinemas(this.currentPage(page));
    }

}