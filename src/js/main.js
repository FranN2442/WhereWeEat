import '../scss/styles.scss'
import '../js/indexedData.js'
import * as bootstrap from 'bootstrap'

let body = document.querySelector('body');

//EVENT LISTENER ON LOAD DOMCONTENT
document.addEventListener('DOMContentLoaded', function () {

    //FUNCTIO TO SET MAP AND MARKER OF USER LOCATION
    function setLocation(pos) {

        let latitud = pos.lat;
        let longitud = pos.lng;

        let customIcon = L.icon({
            iconUrl: '/src/assets/ubicacion.png',  // Especifica la ruta a la teva icona personalitzada
            iconSize: [32, 32],  // Especifica la mida de la icona [amplada, alcada]
            iconAnchor: [16, 32], // Punt d'ancoratge de la icona respecte al seu centre [amplada/2, alcada]
            popupAnchor: [0, -32] // Punt d'ancoratge del popup respecte a la icona [amplada/2, -alcada]
        });
        var map = L.map('map').setView([latitud, longitud], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([latitud, longitud], { icon: customIcon })
            .addTo(map)
            .bindPopup('Tu ubicación');

    }

    //GET H1_SEARCH + LOCATE BOTTON
    let botton = document.getElementById('miBoton');
    let searchText = document.getElementById('h1-searchText');

    botton.addEventListener('click', function () {

        searchText.innerHTML = "Buscando restaurantes cerca de ti..."
        let spin = document.getElementById('spinner');
        spin.removeAttribute("hidden");

        botton.style = "display: none;"

        //FAKE DATA LOADING 
        setTimeout(() => {

            spin.setAttribute('hidden', true)

            //CREATE MAP DIV
            let div = document.createElement('div');

            div.className = "container-fluid d-flex align-items-center justify-content-center";
            div.id = "map";
            div.style = "height: 100vh;"

            body.append(div)

            //CHANGE INNER H1_SEARCH
            searchText.innerHTML = "Restaurantes cerca de tu zona"

            //GET USER LOCATION AND CALL SETLOCATION METHOD
            const location = navigator.geolocation.getCurrentPosition(function (pos) {

                console.log(pos);

                const coords = {
                    'lat': pos.coords.latitude,
                    'lng': pos.coords.longitude
                }

                setLocation(coords);

            });

            //GET DIV POS ADS SCROLL TO IT
            let divPosition = div.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({

                top: divPosition,
                behavior: 'smooth'
            })

        }, 2000)

    })
})

