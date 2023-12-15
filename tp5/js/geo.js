import { fetchJson } from "./fetchJson.js";

const adresseInput = document.querySelector("#geo-search");

function isGeolocationAvailable() {
    return "geolocation" in navigator;
}

export function geoInit() {
    displayGeolocationAvailability();
    createGeoEvent();
}

function displayGeolocationAvailability() {
    document.querySelector("#geo-available").innerText = isGeolocationAvailable() ?
        "La géolocalisation est disponible" :
        "La géolocalisation n'est pas disponible";
}

export function getCoords() {
    return new Promise((resolve, reject) => {
        if(!isGeolocationAvailable()) reject("Geolocation is not available")

        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude: lat, longitude: lon} = position.coords
            resolve({lat, lon})
        }, (err) => {
            reject(err)
        })
    })
}

function createGeoEvent() {
    if(!isGeolocationAvailable()) return;

    document.querySelector("#geolocaliser").addEventListener("click", async (event) => {
        event.preventDefault();
        const coords = await getCoords();
        const adresse = await fetchAdresse(coords);
        adresseInput.value = adresse.label;
    })    
}

async function fetchAdresse({lat, lon}) {
    const adresse = await fetchJson(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lon}`)

    return adresse.features[0].properties;
}

export async function fetchCoords(adresse) {
    try {
        const coords = await fetchJson(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)

        const [lon, lat] = coords.features[0].geometry.coordinates;

        return {lon, lat};
    } catch (error) {
        console.error(error)
        return undefined;
    }
    
}