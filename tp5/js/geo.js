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

function changeToRad(coord) {
    const toRad = (c) => (Math.PI / 180) * c;
    return {
        lat: toRad(coord.lat),
        lon: toRad(coord.lon),
    };
}

export function haversine(coord1, coord2) {
    // Rayon de la Terre en kilomètres (approximatif)
    const earthRadius = 6371;

    // Conversion des degrés en radians
    const coord1Rad = changeToRad(coord1);
    const coord2Rad = changeToRad(coord2);

    // Différence de latitude et de longitude
    const dCoord = {
        lat: coord2Rad.lat - coord1Rad.lat,
        lon: coord2Rad.lon - coord1Rad.lon,
    };

    // Calcul de la distance en utilisant la formule de la haversine
    const a =
        Math.sin(dCoord.lat / 2) ** 2 +
        Math.cos(coord1Rad.lat) * Math.cos(coord2Rad.lat) * Math.sin(dCoord.lon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance en kilomètres
    const distance = earthRadius * c;

    return distance;
}

function createGeoEvent() {
    if(!isGeolocationAvailable()) return;

    document.querySelector("#geolocaliser").addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const coords = await getCoords();

            const adresse = await fetchAdresse(coords);

            if(adresse === null) return alert("Adresse introuvable");

            adresseInput.value = adresse.label;

        } catch (error) {
            alert("Il y a eu une erreur lors de la géolocalisation")
        } 
    })    
}

async function fetchAdresse({lat, lon}) {
    const adresse = await fetchJson(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lon}`)

    if(adresse === null) return null;

    return adresse.features[0].properties;
}

export async function fetchCoords(adresse) {
    const coords = await fetchJson(`https://api-adresse.data.gouv.fr/search/?q=${adresse}`)

    if(coords === null) return null;

    const [lon, lat] = coords.features[0].geometry.coordinates;

    return {lon, lat};
}