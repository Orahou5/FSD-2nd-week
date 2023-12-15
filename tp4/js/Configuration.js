import { apiKey } from "./config.js";
import { fetchJson } from "./fetchJson.js";

export class Configuration {
    apiImage = {};

    constructor(width = 300) {
        this.apiKey = apiKey;
        this.width = width;
    }

    async fetchConfiguration() {
        const config = await fetchJson(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`)
        this.apiImage = config.images;
        return this;
    }

    getSearchUrl(search, page) {
        const params = new URLSearchParams({
            query: search,
            include_adult: false,
            language: "fr-FR",
            page: page,
            api_key: this.apiKey,
        });

        return `https://api.themoviedb.org/3/search/movie?` + params;
    }
}