const citation = document.querySelector('#citation');

document.querySelector('#fetch').addEventListener('click', (e) => {
    /* Envoi d'une requête avec fetch */
    fetch('https://kaamelott.reiter.tf/quote/random').then(response => response.json()).then(quote => {
        console.log(quote);
        const character = quote.infos?.personnage !== null ? 
            `de ${quote.infos?.personnage}` : 
            `${quote.infos.acteur.includes("et") ? "des acteurs" : "de l'acteur"}  ${quote.infos.acteur}`
        citation.innerText = `Citation ${character} :\n\n${quote.citation}`;
    });
});