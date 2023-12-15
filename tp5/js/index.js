import { Cinema } from "./classes/Cinema.js";

(async () => {
    const cinema = new Cinema();
    await cinema.fetchCinema(1);
}) ()