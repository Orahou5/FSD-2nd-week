import { Cinema } from "./classes/Cinema.js";
import { fetchCoords, geoInit } from "./geo.js";

const adresseP = document.querySelector("#adresse-p");

geoInit();

function showAdress(adresse) {
    const italic = document.createElement("i");
    italic.innerText = `"${adresse}"`;

    adresseP.innerText = `Cinémas autour de`;
    adresseP.append(" ", italic);
}

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const search = formData.get("search");

    if(!search) return alert("Veuillez saisir une adresse");

    const coords = await fetchCoords(search);

    if(!coords) return alert("Adresse introuvable");

    console.log(coords);

    showAdress(search);

    const cinema = new Cinema(coords);
    await cinema.fetchCinema(1);

    event.target.reset();
})