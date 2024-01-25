import '../scss/styles.scss'
import '../js/indexedData.js'
import * as bootstrap from 'bootstrap'

let body = document.querySelector('body');


document.addEventListener('DOMContentLoaded', function () {

    function setLocation(pos) {

        var map = L.map('map').setView([pos.lat, pos.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    let botton = document.getElementById('miBoton');
    let searchText = document.getElementById('h1-searchText');

    botton.addEventListener('click', function () {



        searchText.innerHTML = "Buscando restaurantes cerca de ti..."

        botton.style = "display: none;"


        setTimeout(() => {

            let div = document.createElement('div');

            div.className = "container-fluid d-flex align-items-center justify-content-center";
            div.id = "map";
            div.style = "height: 100vh;"

            body.append(div)

            searchText.innerHTML = "Restaurantes cerca de tu zona"

            const location = navigator.geolocation.getCurrentPosition(function (pos) {

                console.log(pos);

                const coords = {
                    'lat': pos.coords.latitude,
                    'lng': pos.coords.longitude
                }

                setLocation(coords);

            });

            let divPosition = div.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({

                top: divPosition,
                behavior: 'smooth'
            })

        }, 2000)

    })
})

