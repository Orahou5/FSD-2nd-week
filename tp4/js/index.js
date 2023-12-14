import { Configuration } from "./Configuration.js";
import { sendSearch } from "./films.js";

const main = async () => {
    const configuration =  await new Configuration().fetchConfiguration();

    const form = document.querySelector("#search-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        sendSearch(formData.get("search-bar"), configuration);
    })
}

main();
