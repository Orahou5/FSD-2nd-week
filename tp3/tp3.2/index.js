const regionsSelect = document.querySelector("#region-select");
const departementsSelect = document.querySelector("#departement-select");
const listVilles = document.querySelector("#list-villes");

function createNewOption(name, code, temporary = false) {
    const option = document.createElement("option")
    option.value = code;
    option.text = name;

    if(temporary) {
        option.classList.add("temporary")
    }
    
    return option;
}

document.querySelector('#fetch').addEventListener('click', (e) => {
    /* Envoi d'une requête avec fetch */

    const code = departementsSelect.value;

    if(code === "") return;

    fetch(`https://geo.api.gouv.fr/departements/${code}/communes`).then(response => response.json()).then(communes => {
        listVilles.innerHTML = "";

        communes.forEach(({nom}) => {
            const li = document.createElement("li");
            li.innerText = nom;
            listVilles.append(li);
        })

        console.log(communes);
    });
});

fetch('https://geo.api.gouv.fr/regions').then(response => response.json()).then(regions => {
    regions.forEach(({nom, code}) => {
        regionsSelect.append(createNewOption(nom, code))
    });
});

regionsSelect.addEventListener("change", (e) => {
    const code = e.target.value;

    document.querySelectorAll(".temporary").forEach(node => {
        node.remove();
    })

    fetch(`https://geo.api.gouv.fr/regions/${code}/departements`).then(response => response.json()).then(departements => {
        departements.forEach(({nom, code}) => {
            departementsSelect.append(createNewOption(nom, code, true))
        });
    })
})