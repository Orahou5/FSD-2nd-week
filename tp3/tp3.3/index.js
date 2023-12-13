const adresseP = document.querySelector("#adresse")
const villeP = document.querySelector("#ville")

const isGeolocationAvailable = "geolocation" in navigator

document.querySelector("#geo-available").innerText = isGeolocationAvailable ?
    "Geolocation is available" :
    "Geolocation IS NOT available"

if(isGeolocationAvailable) {
    document.querySelector('#fetch').addEventListener('click', (e) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude: lat, longitude: lon} = position.coords
            fetchAdresse(lat, lon);
            fetchVille(lat, lon);
        }, (err) => {
            console.log(err)
        })
    })
}

function fetchAdresse(lat, lon) {
    fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lon}`).then(response => response.json()).then(adresse => {
        const adresseObjs = adresse.features.map((x) => x.properties)

        adresseP.innerText = adresseObjs.map((x) => x.label).join("\nOU\n")
    })
}

function fetchVille(lat, lon) {
    fetch(`https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lon}&fields=nom,codesPostaux,surface,population`).then(response => response.json()).then(villes => {
        const {nom, codesPostaux, population, surface} = villes[0];
        const str = `Nom de la ville : ${nom}
        Code postaux de la ville : ${codesPostaux.join(" ,")}
        Population municipale : ${population} personnes
        Surface de la ville : ${surface} hectares`

        villeP.innerText = str;
    })
}