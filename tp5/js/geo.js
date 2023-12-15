const elements = {
    adresseP: document.querySelector("#adresse"),
    villeP: document.querySelector("#ville"),
}

function isGeolocationAvailable() {
    return "geolocation" in navigator;
}

export function displayGeolocationAvailability() {
    document.querySelector("#geo-available").innerText = isGeolocationAvailable() ?
        "Geolocation is available" :
        "Geolocation IS NOT available";
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

// // createEvent() {
// //     if(!this.isGeolocationAvailable()) return;

// //     this

// //     document.querySelector('#fetch').addEventListener('click', (e) => {
// //         this.geo.getCurrentPosition((position) => {
// //             const {latitude: lat, longitude: lon} = position.coords
            
// //         }, (err) => {
// //             console.log(err)
// //         })
// //     })
// // }

// fetchAdresse(lat, lon) {
//     fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lon}`).then(response => response.json()).then(adresse => {
//         const adresseObjs = adresse.features.map((x) => x.properties)

//         this.adresseP.innerText = adresseObjs.map((x) => x.label).join("\nOU\n")
//     })
// }