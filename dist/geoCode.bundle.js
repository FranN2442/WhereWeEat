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
    console.log("ContentLoaded");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvQ29kZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hlcmV3ZWVhdC8uL3NyYy9qcy9nZW9Db2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgZ2VvY29kZXI7XHJcbmxldCBtYXA7XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG5cclxuICAgIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XHJcblxyXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSwge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvbnRlbnRMb2FkZWRcIik7XHJcblxyXG4gICAgbmV3IFNwYWluTWFwKHtcclxuICAgICAgICBpZDogJ2dlb01hcCcsIC8vKFJlcXVlcmlkbykgRWxlbWVudG8gSFRNTCBlbiBlbCBxdWUgc2UgcmVuZGVyaXphcsOhIGVsIG1hcGFcclxuICAgICAgICB3aWR0aDogNzAwLCAvLyhSZXF1ZXJpZG8pIEFuY2hvIGRlbCBtYXBhXHJcbiAgICAgICAgaGVpZ2h0OiA0MDAsIC8vKFJlcXVlcmlkbykgQWx0byBkZWwgbWFwYVxyXG4gICAgICAgIGZpbGxDb2xvcjogXCIjZWVlZWVlXCIsIC8vIGNvbG9yIGRlIHJlbGxlbm8gZGVsIG1hcGFcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjYmJiYmJiXCIsIC8vIGNvbG9yIGRlIGxhcyBsw61uZWFzIGRlIGZyb250ZXJhXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsIC8vIGFuY2hvIGRlIGxhcyBsw61uZWFzIGRlIGZyb250ZXJhXHJcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogXCIjOTllZWVlXCIsIC8vIGNvbG9yIGRlIHJlbGxlbm8gZGUgbGEgcHJvdmluY2lhIGFsIHBhc2FyIGVsIHJhdMOzbiBwb3IgZW5jaW1hXHJcbiAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDIwMCwgLy8gRHVyYWNpw7NuIGRlIGxhIGFuaW1hY2nDs24gZGUgc2FsaWRhXHJcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKHByb3ZpbmNlLCBtb3VzZWV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBtYXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcbiAgICAgICAgICAgIGlmIChtYXBEaXYuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0TWFwKClcclxuICAgICAgICAgICAgICAgIG1hcERpdi5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIilcclxuICAgICAgICAgICAgICAgIGdldExhbmdMYXQocHJvdmluY2UubmFtZSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldExhbmdMYXQocHJvdmluY2UubmFtZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uTW91c2VPdmVyOiBmdW5jdGlvbiAocHJvdmluY2UsIG1vdXNlZXZlbnQpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk1vdXNlT3V0OiBmdW5jdGlvbiAocHJvdmluY2UsIG1vdXNlZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gTcOpdG9kbyBxdWUgc2UgZWplY3V0YXLDoSBhbCBzYWxpciBkZSB1bmEgcHJvdmluY2lhXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KVxyXG5cclxuZnVuY3Rpb24gZ2V0TGFuZ0xhdChwcm92aW5pY2EpIHtcclxuXHJcbiAgICB2YXIgcHJvdmluY2lhID0gcHJvdmluaWNhICsgJywgRXNwYcOxYSc7XHJcblxyXG4gICAgLy8gUmVhbGl6YXIgbGEgc29saWNpdHVkIGRlIGdlb2NvZGlmaWNhY2nDs24gaW52ZXJzYVxyXG4gICAgZ2VvY29kZXIuZ2VvY29kZSh7ICdhZGRyZXNzJzogcHJvdmluY2lhIH0sIGZ1bmN0aW9uIChyZXN1bHRzLCBzdGF0dXMpIHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XHJcbiAgICAgICAgICAgIC8vIE9idGVuZXIgbGEgbGF0aXR1ZCB5IGxvbmdpdHVkXHJcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSB7IFwibGF0XCI6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksIFwibG5nXCI6IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nKCkgfVxyXG5cclxuICAgICAgICAgICAgc2V0Q2VudGVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIHNlYXJjaFJlc3RhdXJhbnRzKGNvb3Jkcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignR2VvY29kaWZpY2FjacOzbiBmYWxsaWRhOicsIHN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDZW50ZXIocG9zKSB7XHJcblxyXG4gICAgY29uc3QgY2l1ZGFkQ29vcmRzID0ge1xyXG4gICAgICAgIGxhdDogcG9zLmxhdCxcclxuICAgICAgICBsbmc6IHBvcy5sbmcsXHJcbiAgICB9O1xyXG4gICAgbWFwLnNldENlbnRlcihjaXVkYWRDb29yZHMpO1xyXG5cclxufVxyXG5mdW5jdGlvbiBzZWFyY2hSZXN0YXVyYW50cyhsb2NhdGlvbikge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXHJcbiAgICAgICAgcmFkaXVzOiAnNScsXHJcbiAgICAgICAgcXVlcnk6IFwicmVzdHVyYW50XCIsXHJcbiAgICAgICAgZmllbGRzOiBbXCJuYW1lXCIsIFwiZ2VvbWV0cnlcIl0sXHJcbiAgICB9O1xyXG5cclxuICAgIHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UobWFwKTtcclxuICAgIHNlcnZpY2UudGV4dFNlYXJjaChyZXF1ZXN0LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0sgJiYgcmVzdWx0cykge1xyXG4gICAgICAgICAgICBsZXQgY2FyZFJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FyZHNcIik7XHJcbiAgICAgICAgICAgIGNhcmRSb3cuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzW2ldLmJ1c2luZXNzX3N0YXR1cyA9PSBcIk9QRVJBVElPTkFMXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2FyZChyZXN1bHRzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1hcmtlcihyZXN1bHRzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHNbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBBw7FhZGlyIGxvcyBtYXJjYWRvcmVzIGRlIGxvcyByZXN0YXVyYW50ZXMuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1hcmtlcihwbGFjZSkge1xyXG4gICAgaWYgKCFwbGFjZS5nZW9tZXRyeSB8fCAhcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoaW5mbykge1xyXG5cclxuICAgIGxldCBjYXJkUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICAgIGNhcmRSb3cucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBkaXYgY29uIGxhIGNsYXNlIFwiY29sLW1kLTNcIlxyXG4gICAgY29uc3QgY29sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbERpdi5jbGFzc0xpc3QuYWRkKFwiY29sLW1kLTNcIik7XHJcblxyXG4gICAgY29uc3QgY2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIsIFwidGV4dC1jb2xvci1henVsTWFyaW5vXCIsIFwiYmctY29sb3ItYmxhbmNvQ3JlbWFcIiwgXCJtLTNcIik7XHJcblxyXG5cclxuICAgIGNvbnN0IGNhcmRIZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY2FyZEhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKFwiY2FyZC1oZWFkZXJcIiwgXCJ0ZXh0LWNvbG9yLWF6dWxNYXJpbm9cIiwgXCJiZy1jb2xvci1ibGFuY29DcmVtYVwiKTtcclxuXHJcbiAgICBjYXJkSGVhZGVyRGl2LnRleHRDb250ZW50ID0gaW5mby5uYW1lO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcImNhcmQtaW1nLXRvcFwiKTtcclxuICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIvc3JjL2Fzc2V0cy9pbWcvY2FyZHMvYXNpYXRpYy1mb29kLmpwZ1wiKTtcclxuICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJlcmFzbXVzXCIpO1xyXG5cclxuXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBkaXYgY29uIGxhIGNsYXNlIFwiY2FyZC1ib2R5XCJcclxuICAgIGNvbnN0IGNhcmRCb2R5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNhcmRCb2R5RGl2LmNsYXNzTGlzdC5hZGQoXCJjYXJkLWJvZHlcIik7XHJcblxyXG4gICAgLy8gQ3JlYXIgZWwgZWxlbWVudG8gcCBjb24gbGEgY2xhc2UgXCJjYXJkLXRleHRcIiB5IHRleHRvIFwiUG9kcmFzIGRpc2ZydXRhciBkZWwgbWVqb3IgcGEgYW1iIHR1bWFjYVwiXHJcbiAgICBjb25zdCBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIHBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKFwiY2FyZC10ZXh0XCIpO1xyXG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gXCJEaXJlY2Npw7NuOiBcIiArIGluZm8uZm9ybWF0dGVkX2FkZHJlc3M7XHJcblxyXG4gICAgY2FyZEJvZHlEaXYuYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcclxuICAgIGNhcmREaXYuYXBwZW5kQ2hpbGQoY2FyZEhlYWRlckRpdik7Y2FyZERpdi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgY2FyZERpdi5hcHBlbmRDaGlsZChjYXJkQm9keURpdik7XHJcbiAgICBjb2xEaXYuYXBwZW5kQ2hpbGQoY2FyZERpdik7XHJcblxyXG4gICAgY2FyZFJvdy5hcHBlbmRDaGlsZChjb2xEaXYpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==