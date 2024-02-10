
let geocoder;
let map;



function initMap() {

    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
    });

}

document.addEventListener("DOMContentLoaded", () => {
    let userBtn = document.getElementById("my-loc");

    userBtn.addEventListener("click", () => {

        navigator.geolocation.getCurrentPosition((position) => {

            let cardRow = document.getElementById("cards");
            cardRow.innerHTML = ""
            let coords = {"lat" : position.coords.latitude, "lng": position.coords.longitude}
            setCenter(coords);
            searchRestaurants(coords)


        })

    })


    new SpainMap({
        id: 'geoMap', //(Requerido) Elemento HTML en el que se renderizará el mapa
        width: 700, //(Requerido) Ancho del mapa
        height: 400, //(Requerido) Alto del mapa
        fillColor: "#eeeeee", // color de relleno del mapa
        strokeColor: "#bbbbbb", // color de las líneas de frontera
        strokeWidth: 1, // ancho de las líneas de frontera
        selectedColor: "#99eeee", // color de relleno de la provincia al pasar el ratón por encima
        animationDuration: 200, // Duración de la animación de salida
        onClick: function (province, mouseevent) {
            let mapDiv = document.getElementById('map');
            if (mapDiv.hidden) {
                initMap()
                mapDiv.removeAttribute("hidden")
                getLangLat(province.name);

            } else {

                getLangLat(province.name)

            }
        },
        onMouseOver: function (province, mouseevent) {

        },
        onMouseOut: function (province, mouseevent) {
            // Método que se ejecutará al salir de una provincia
        }
    });

})

function getLangLat(provinica) {

    var provincia = provinica + ', España';

    // Realizar la solicitud de geocodificación inversa
    geocoder.geocode({ 'address': provincia }, function (results, status) {
        if (status === 'OK') {
            // Obtener la latitud y longitud
            let coords = { "lat": results[0].geometry.location.lat(), "lng": results[0].geometry.location.lng() }

            setCenter(coords);
            searchRestaurants(coords);
        } else {
            console.error('Geocodificación fallida:', status);
        }
    });

}

function setCenter(pos) {

    const ciudadCoords = {
        lat: pos.lat,
        lng: pos.lng,
    };
    map.setCenter(ciudadCoords);

}
function searchRestaurants(location) {
    const request = {
        location: location,
        radius: '5',
        query: "resturant",
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            let cardRow = document.getElementById("cards");
            cardRow.innerHTML = ""
            for (let i = 0; i < results.length; i++) {
                if (results[i].business_status == "OPERATIONAL") {

                    createCard(results[i])
                    createMarker(results[i])
                    console.log(results[i]);

                }
            }
        }
    });
}

// Añadir los marcadores de los restaurantes.
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
}

function createCard(info) {

    let cardRow = document.getElementById("cards");
    cardRow.removeAttribute("hidden")
    // Crear el elemento div con la clase "col-md-3"
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-color-azulMarino", "bg-color-blancoCrema", "m-3");


    const cardHeaderDiv = document.createElement("div");
    cardHeaderDiv.classList.add("card-header", "text-color-azulMarino", "bg-color-blancoCrema");

    cardHeaderDiv.textContent = info.name;

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", "./assets/img/cards/asiatic-food.jpg");
    img.setAttribute("alt", "erasmus");


    // Crear el elemento div con la clase "card-body"
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    // Crear el elemento p con la clase "card-text" y texto "Podras disfrutar del mejor pa amb tumaca"
    const paragraph = document.createElement("p");
    paragraph.classList.add("card-text");
    paragraph.textContent = "Dirección: " + info.formatted_address;

    cardBodyDiv.appendChild(paragraph);
    cardDiv.appendChild(cardHeaderDiv);cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    cardRow.appendChild(colDiv);
}
