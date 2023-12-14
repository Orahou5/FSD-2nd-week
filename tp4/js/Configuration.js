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

    get posterSize() {
        const filtered = this.apiImage.poster_sizes.filter((wSize) => {
            return (wSize.match(/w(\d+)/i)?.[1] ?? 0) <= this.width;
        });

        Math
    }
}