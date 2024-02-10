/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/js/geoCode.js ***!
  \***************************/

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
    img.setAttribute("src", "/src/assets/img/cards/asiatic-food.jpg");
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvQ29kZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hlcmV3ZWVhdC8uL3NyYy9qcy9nZW9Db2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgZ2VvY29kZXI7XHJcbmxldCBtYXA7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcblxyXG4gICAgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcclxuXHJcbiAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGxldCB1c2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteS1sb2NcIik7XHJcblxyXG4gICAgdXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhcmRSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcmRzXCIpO1xyXG4gICAgICAgICAgICBjYXJkUm93LmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHtcImxhdFwiIDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBcImxuZ1wiOiBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfVxyXG4gICAgICAgICAgICBzZXRDZW50ZXIoY29vcmRzKTtcclxuICAgICAgICAgICAgc2VhcmNoUmVzdGF1cmFudHMoY29vcmRzKVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBuZXcgU3BhaW5NYXAoe1xyXG4gICAgICAgIGlkOiAnZ2VvTWFwJywgLy8oUmVxdWVyaWRvKSBFbGVtZW50byBIVE1MIGVuIGVsIHF1ZSBzZSByZW5kZXJpemFyw6EgZWwgbWFwYVxyXG4gICAgICAgIHdpZHRoOiA3MDAsIC8vKFJlcXVlcmlkbykgQW5jaG8gZGVsIG1hcGFcclxuICAgICAgICBoZWlnaHQ6IDQwMCwgLy8oUmVxdWVyaWRvKSBBbHRvIGRlbCBtYXBhXHJcbiAgICAgICAgZmlsbENvbG9yOiBcIiNlZWVlZWVcIiwgLy8gY29sb3IgZGUgcmVsbGVubyBkZWwgbWFwYVxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNiYmJiYmJcIiwgLy8gY29sb3IgZGUgbGFzIGzDrW5lYXMgZGUgZnJvbnRlcmFcclxuICAgICAgICBzdHJva2VXaWR0aDogMSwgLy8gYW5jaG8gZGUgbGFzIGzDrW5lYXMgZGUgZnJvbnRlcmFcclxuICAgICAgICBzZWxlY3RlZENvbG9yOiBcIiM5OWVlZWVcIiwgLy8gY29sb3IgZGUgcmVsbGVubyBkZSBsYSBwcm92aW5jaWEgYWwgcGFzYXIgZWwgcmF0w7NuIHBvciBlbmNpbWFcclxuICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMjAwLCAvLyBEdXJhY2nDs24gZGUgbGEgYW5pbWFjacOzbiBkZSBzYWxpZGFcclxuICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAocHJvdmluY2UsIG1vdXNlZXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IG1hcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICAgICAgaWYgKG1hcERpdi5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIGluaXRNYXAoKVxyXG4gICAgICAgICAgICAgICAgbWFwRGl2LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKVxyXG4gICAgICAgICAgICAgICAgZ2V0TGFuZ0xhdChwcm92aW5jZS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0TGFuZ0xhdChwcm92aW5jZS5uYW1lKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Nb3VzZU92ZXI6IGZ1bmN0aW9uIChwcm92aW5jZSwgbW91c2VldmVudCkge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uTW91c2VPdXQ6IGZ1bmN0aW9uIChwcm92aW5jZSwgbW91c2VldmVudCkge1xyXG4gICAgICAgICAgICAvLyBNw6l0b2RvIHF1ZSBzZSBlamVjdXRhcsOhIGFsIHNhbGlyIGRlIHVuYSBwcm92aW5jaWFcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBnZXRMYW5nTGF0KHByb3ZpbmljYSkge1xyXG5cclxuICAgIHZhciBwcm92aW5jaWEgPSBwcm92aW5pY2EgKyAnLCBFc3Bhw7FhJztcclxuXHJcbiAgICAvLyBSZWFsaXphciBsYSBzb2xpY2l0dWQgZGUgZ2VvY29kaWZpY2FjacOzbiBpbnZlcnNhXHJcbiAgICBnZW9jb2Rlci5nZW9jb2RlKHsgJ2FkZHJlc3MnOiBwcm92aW5jaWEgfSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBsYXRpdHVkIHkgbG9uZ2l0dWRcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHsgXCJsYXRcIjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSwgXCJsbmdcIjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKSB9XHJcblxyXG4gICAgICAgICAgICBzZXRDZW50ZXIoY29vcmRzKTtcclxuICAgICAgICAgICAgc2VhcmNoUmVzdGF1cmFudHMoY29vcmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHZW9jb2RpZmljYWNpw7NuIGZhbGxpZGE6Jywgc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENlbnRlcihwb3MpIHtcclxuXHJcbiAgICBjb25zdCBjaXVkYWRDb29yZHMgPSB7XHJcbiAgICAgICAgbGF0OiBwb3MubGF0LFxyXG4gICAgICAgIGxuZzogcG9zLmxuZyxcclxuICAgIH07XHJcbiAgICBtYXAuc2V0Q2VudGVyKGNpdWRhZENvb3Jkcyk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIHNlYXJjaFJlc3RhdXJhbnRzKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcclxuICAgICAgICByYWRpdXM6ICc1JyxcclxuICAgICAgICBxdWVyeTogXCJyZXN0dXJhbnRcIixcclxuICAgICAgICBmaWVsZHM6IFtcIm5hbWVcIiwgXCJnZW9tZXRyeVwiXSxcclxuICAgIH07XHJcblxyXG4gICAgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xyXG4gICAgc2VydmljZS50ZXh0U2VhcmNoKHJlcXVlc3QsIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSyAmJiByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICAgICAgICAgICAgY2FyZFJvdy5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbaV0uYnVzaW5lc3Nfc3RhdHVzID09IFwiT1BFUkFUSU9OQUxcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDYXJkKHJlc3VsdHNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTWFya2VyKHJlc3VsdHNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0c1tpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIEHDsWFkaXIgbG9zIG1hcmNhZG9yZXMgZGUgbG9zIHJlc3RhdXJhbnRlcy5cclxuZnVuY3Rpb24gY3JlYXRlTWFya2VyKHBsYWNlKSB7XHJcbiAgICBpZiAoIXBsYWNlLmdlb21ldHJ5IHx8ICFwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIG1hcCxcclxuICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24sXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2FyZChpbmZvKSB7XHJcblxyXG4gICAgbGV0IGNhcmRSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcmRzXCIpO1xyXG4gICAgY2FyZFJvdy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIilcclxuICAgIC8vIENyZWFyIGVsIGVsZW1lbnRvIGRpdiBjb24gbGEgY2xhc2UgXCJjb2wtbWQtM1wiXHJcbiAgICBjb25zdCBjb2xEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29sRGl2LmNsYXNzTGlzdC5hZGQoXCJjb2wtbWQtM1wiKTtcclxuXHJcbiAgICBjb25zdCBjYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNhcmREaXYuY2xhc3NMaXN0LmFkZChcImNhcmRcIiwgXCJ0ZXh0LWNvbG9yLWF6dWxNYXJpbm9cIiwgXCJiZy1jb2xvci1ibGFuY29DcmVtYVwiLCBcIm0tM1wiKTtcclxuXHJcblxyXG4gICAgY29uc3QgY2FyZEhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjYXJkSGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJjYXJkLWhlYWRlclwiLCBcInRleHQtY29sb3ItYXp1bE1hcmlub1wiLCBcImJnLWNvbG9yLWJsYW5jb0NyZW1hXCIpO1xyXG5cclxuICAgIGNhcmRIZWFkZXJEaXYudGV4dENvbnRlbnQgPSBpbmZvLm5hbWU7XHJcblxyXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiY2FyZC1pbWctdG9wXCIpO1xyXG4gICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi9zcmMvYXNzZXRzL2ltZy9jYXJkcy9hc2lhdGljLWZvb2QuanBnXCIpO1xyXG4gICAgaW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcImVyYXNtdXNcIik7XHJcblxyXG5cclxuICAgIC8vIENyZWFyIGVsIGVsZW1lbnRvIGRpdiBjb24gbGEgY2xhc2UgXCJjYXJkLWJvZHlcIlxyXG4gICAgY29uc3QgY2FyZEJvZHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY2FyZEJvZHlEaXYuY2xhc3NMaXN0LmFkZChcImNhcmQtYm9keVwiKTtcclxuXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBwIGNvbiBsYSBjbGFzZSBcImNhcmQtdGV4dFwiIHkgdGV4dG8gXCJQb2RyYXMgZGlzZnJ1dGFyIGRlbCBtZWpvciBwYSBhbWIgdHVtYWNhXCJcclxuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgcGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoXCJjYXJkLXRleHRcIik7XHJcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSBcIkRpcmVjY2nDs246IFwiICsgaW5mby5mb3JtYXR0ZWRfYWRkcmVzcztcclxuXHJcbiAgICBjYXJkQm9keURpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xyXG4gICAgY2FyZERpdi5hcHBlbmRDaGlsZChjYXJkSGVhZGVyRGl2KTtjYXJkRGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBjYXJkRGl2LmFwcGVuZENoaWxkKGNhcmRCb2R5RGl2KTtcclxuICAgIGNvbERpdi5hcHBlbmRDaGlsZChjYXJkRGl2KTtcclxuXHJcbiAgICBjYXJkUm93LmFwcGVuZENoaWxkKGNvbERpdik7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9