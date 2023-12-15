import { Cinema } from "./classes/Cinema.js";
import { displayGeolocationAvailability, getCoords } from "./geo.js";

(async () => {
    displayGeolocationAvailability();
    const coords = await getCoords();
    console.log(coords);
    const cinema = new Cinema(coords);
    await cinema.fetchCinema(1);
}) ()