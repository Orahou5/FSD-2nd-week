import { fetchPokemons } from "./pokemon.js";

const [pageTop, pageBottom] = [...document.querySelectorAll(".pagination").values()];
const pageLimit = 5;

function getNumberOfPages(totalPages, current, limit) {
    const middle = Math.ceil(limit/2);

    let arrayOfPages = [];

    if(current < middle) {
        arrayOfPages = [...Array(limit).keys()].map(x => x + 1);
    } else if(totalPages - current < middle) {
        arrayOfPages = [...Array(limit).keys()].map(x => x + totalPages - limit + 1);
    } else {
        arrayOfPages = [...Array(limit).keys()].map(x => x + current - middle + 1);
    }

    return arrayOfPages;
}

function createPage(page, current) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.append(span);
    li.append(div);

    if(current === true) {
        div.ariaCurrent = "page";
    }

    span.classList.add("visuallyhidden")

    span.after(page)

    li.addEventListener("click", () => {
        fetchPokemons(page)
    });

    return li;
}

function createMover(symbol, text, past, fn) {
    const liPrevious = document.createElement("li");
    const symbolSpan = `<span aria-hidden="true">${symbol}</span>`
    const textSpan = `<span class="visuallyhidden">${text}</span>`
    liPrevious.innerHTML = `
        <div>
            ${past ? symbolSpan + textSpan : textSpan + symbolSpan}
        </div>
    `

    liPrevious.addEventListener("click", fn)

    return liPrevious;
}

export function createPages(totalPages, current) {
    const liPrevious = createMover("&laquo;", "previous set of pokemons", true, () => {
        if(current <= 1) return;
        fetchPokemons(current - 1)
    });
  
    const liNext = createMover("&raquo;", "next set of pokemons", false, () => {
        if(current >= totalPages) return;
        fetchPokemons(current + 1)
    });

    const liFirst = createMover(`&laquo;&laquo;`, "first set of pokemons", true, () => {
        if(current <= 1) return;
        fetchPokemons(1)
    });

    const liLast = createMover("&raquo;&raquo;", "last set of pokemons", false, () => {
        if(current >= totalPages) return;
        fetchPokemons(totalPages)
    });

    const pagesElements = getNumberOfPages(totalPages, current, pageLimit).map(page => createPage(page, page === current))

    return [liFirst, liPrevious, ...pagesElements, liNext, liLast];
}

function refreshAndAppendPages(pages, ...elements) {
    pages.innerHTML = "";
    pages.append(...elements);
}

export function refreshNavs(totalPages, current) {
    refreshAndAppendPages(pageTop, ...createPages(totalPages, current));
    refreshAndAppendPages(pageBottom, ...createPages(totalPages, current));
}