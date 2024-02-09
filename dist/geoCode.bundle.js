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

new SpainMap({
    id: 'geoMap', //(Requerido) Elemento HTML en el que se renderizará el mapa
    width: 700, //(Requerido) Ancho del mapa
    height: 400, //(Requerido) Alto del mapa
    fillColor: "#eeeeee", // color de relleno del mapa
    strokeColor: "#bbbbbb", // color de las líneas de frontera
    strokeWidth: 0.7, // ancho de las líneas de frontera
    selectedColor: "#99eeee", // color de relleno de la provincia al pasar el ratón por encima
    animationDuration: 200, // Duración de la animación de salida
    onClick: function (province, mouseevent) {
        let mapDiv = document.getElementById('map');
        if (mapDiv.hidden) {

            mapDiv.removeAttribute("hidden")
            initMap();
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
            cardRow.innerHTML=""
            for (let i = 0; i < results.length; i++) {
                if(results[i].business_status =="OPERATIONAL"){

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

    // Crear el elemento div con la clase "card text-color-azulMarino bg-color-blancoCrema m-3"
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "text-color-azulMarino", "bg-color-blancoCrema", "m-3");

    // Crear el elemento div con la clase "card-header text-color-azulMarino bg-color-blancoCrema" y texto "BARCELONA"
    const cardHeaderDiv = document.createElement("div");
    cardHeaderDiv.classList.add("card-header", "text-color-azulMarino", "bg-color-blancoCrema");
    cardHeaderDiv.textContent = info.name;

    // Crear el elemento div con la clase "card-body"
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    // Crear el elemento p con la clase "card-text" y texto "Podras disfrutar del mejor pa amb tumaca"
    const paragraph = document.createElement("p");
    paragraph.classList.add("card-text");
    paragraph.textContent = "Podras disfrutar del mejor pa amb tumaca";

    cardBodyDiv.appendChild(paragraph);
    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    cardRow.appendChild(colDiv);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvQ29kZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aGVyZXdlZWF0Ly4vc3JjL2pzL2dlb0NvZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmxldCBnZW9jb2RlcjtcclxubGV0IG1hcDtcclxuXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcblxyXG4gICAgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcclxuXHJcbiAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbm5ldyBTcGFpbk1hcCh7XHJcbiAgICBpZDogJ2dlb01hcCcsIC8vKFJlcXVlcmlkbykgRWxlbWVudG8gSFRNTCBlbiBlbCBxdWUgc2UgcmVuZGVyaXphcsOhIGVsIG1hcGFcclxuICAgIHdpZHRoOiA3MDAsIC8vKFJlcXVlcmlkbykgQW5jaG8gZGVsIG1hcGFcclxuICAgIGhlaWdodDogNDAwLCAvLyhSZXF1ZXJpZG8pIEFsdG8gZGVsIG1hcGFcclxuICAgIGZpbGxDb2xvcjogXCIjZWVlZWVlXCIsIC8vIGNvbG9yIGRlIHJlbGxlbm8gZGVsIG1hcGFcclxuICAgIHN0cm9rZUNvbG9yOiBcIiNiYmJiYmJcIiwgLy8gY29sb3IgZGUgbGFzIGzDrW5lYXMgZGUgZnJvbnRlcmFcclxuICAgIHN0cm9rZVdpZHRoOiAwLjcsIC8vIGFuY2hvIGRlIGxhcyBsw61uZWFzIGRlIGZyb250ZXJhXHJcbiAgICBzZWxlY3RlZENvbG9yOiBcIiM5OWVlZWVcIiwgLy8gY29sb3IgZGUgcmVsbGVubyBkZSBsYSBwcm92aW5jaWEgYWwgcGFzYXIgZWwgcmF0w7NuIHBvciBlbmNpbWFcclxuICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAyMDAsIC8vIER1cmFjacOzbiBkZSBsYSBhbmltYWNpw7NuIGRlIHNhbGlkYVxyXG4gICAgb25DbGljazogZnVuY3Rpb24gKHByb3ZpbmNlLCBtb3VzZWV2ZW50KSB7XHJcbiAgICAgICAgbGV0IG1hcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuICAgICAgICBpZiAobWFwRGl2LmhpZGRlbikge1xyXG5cclxuICAgICAgICAgICAgbWFwRGl2LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKVxyXG4gICAgICAgICAgICBpbml0TWFwKCk7XHJcbiAgICAgICAgICAgIGdldExhbmdMYXQocHJvdmluY2UubmFtZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBnZXRMYW5nTGF0KHByb3ZpbmNlLm5hbWUpXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbk1vdXNlT3ZlcjogZnVuY3Rpb24gKHByb3ZpbmNlLCBtb3VzZWV2ZW50KSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uTW91c2VPdXQ6IGZ1bmN0aW9uIChwcm92aW5jZSwgbW91c2VldmVudCkge1xyXG4gICAgICAgIC8vIE3DqXRvZG8gcXVlIHNlIGVqZWN1dGFyw6EgYWwgc2FsaXIgZGUgdW5hIHByb3ZpbmNpYVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldExhbmdMYXQocHJvdmluaWNhKSB7XHJcblxyXG5cclxuICAgIHZhciBwcm92aW5jaWEgPSBwcm92aW5pY2EgKyAnLCBFc3Bhw7FhJztcclxuXHJcbiAgICAvLyBSZWFsaXphciBsYSBzb2xpY2l0dWQgZGUgZ2VvY29kaWZpY2FjacOzbiBpbnZlcnNhXHJcbiAgICBnZW9jb2Rlci5nZW9jb2RlKHsgJ2FkZHJlc3MnOiBwcm92aW5jaWEgfSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgLy8gT2J0ZW5lciBsYSBsYXRpdHVkIHkgbG9uZ2l0dWRcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHsgXCJsYXRcIjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSwgXCJsbmdcIjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKSB9XHJcblxyXG4gICAgICAgICAgICBzZXRDZW50ZXIoY29vcmRzKTtcclxuICAgICAgICAgICAgc2VhcmNoUmVzdGF1cmFudHMoY29vcmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHZW9jb2RpZmljYWNpw7NuIGZhbGxpZGE6Jywgc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENlbnRlcihwb3MpIHtcclxuXHJcbiAgICBjb25zdCBjaXVkYWRDb29yZHMgPSB7XHJcbiAgICAgICAgbGF0OiBwb3MubGF0LFxyXG4gICAgICAgIGxuZzogcG9zLmxuZyxcclxuICAgIH07XHJcbiAgICBtYXAuc2V0Q2VudGVyKGNpdWRhZENvb3Jkcyk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIHNlYXJjaFJlc3RhdXJhbnRzKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcclxuICAgICAgICByYWRpdXM6ICc1JyxcclxuICAgICAgICBxdWVyeTogXCJyZXN0dXJhbnRcIixcclxuICAgICAgICBmaWVsZHM6IFtcIm5hbWVcIiwgXCJnZW9tZXRyeVwiXSxcclxuICAgIH07XHJcblxyXG4gICAgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZShtYXApO1xyXG4gICAgc2VydmljZS50ZXh0U2VhcmNoKHJlcXVlc3QsIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSyAmJiByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICAgICAgICAgICAgY2FyZFJvdy5pbm5lckhUTUw9XCJcIlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdHNbaV0uYnVzaW5lc3Nfc3RhdHVzID09XCJPUEVSQVRJT05BTFwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2FyZChyZXN1bHRzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1hcmtlcihyZXN1bHRzW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHNbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBBw7FhZGlyIGxvcyBtYXJjYWRvcmVzIGRlIGxvcyByZXN0YXVyYW50ZXMuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1hcmtlcihwbGFjZSkge1xyXG4gICAgaWYgKCFwbGFjZS5nZW9tZXRyeSB8fCAhcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBtYXAsXHJcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoaW5mbykge1xyXG5cclxuICAgIGxldCBjYXJkUm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICAgIGNhcmRSb3cucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBkaXYgY29uIGxhIGNsYXNlIFwiY29sLW1kLTNcIlxyXG4gICAgY29uc3QgY29sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbERpdi5jbGFzc0xpc3QuYWRkKFwiY29sLW1kLTNcIik7XHJcblxyXG4gICAgLy8gQ3JlYXIgZWwgZWxlbWVudG8gZGl2IGNvbiBsYSBjbGFzZSBcImNhcmQgdGV4dC1jb2xvci1henVsTWFyaW5vIGJnLWNvbG9yLWJsYW5jb0NyZW1hIG0tM1wiXHJcbiAgICBjb25zdCBjYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNhcmREaXYuY2xhc3NMaXN0LmFkZChcImNhcmRcIiwgXCJ0ZXh0LWNvbG9yLWF6dWxNYXJpbm9cIiwgXCJiZy1jb2xvci1ibGFuY29DcmVtYVwiLCBcIm0tM1wiKTtcclxuXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBkaXYgY29uIGxhIGNsYXNlIFwiY2FyZC1oZWFkZXIgdGV4dC1jb2xvci1henVsTWFyaW5vIGJnLWNvbG9yLWJsYW5jb0NyZW1hXCIgeSB0ZXh0byBcIkJBUkNFTE9OQVwiXHJcbiAgICBjb25zdCBjYXJkSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNhcmRIZWFkZXJEaXYuY2xhc3NMaXN0LmFkZChcImNhcmQtaGVhZGVyXCIsIFwidGV4dC1jb2xvci1henVsTWFyaW5vXCIsIFwiYmctY29sb3ItYmxhbmNvQ3JlbWFcIik7XHJcbiAgICBjYXJkSGVhZGVyRGl2LnRleHRDb250ZW50ID0gaW5mby5uYW1lO1xyXG5cclxuICAgIC8vIENyZWFyIGVsIGVsZW1lbnRvIGRpdiBjb24gbGEgY2xhc2UgXCJjYXJkLWJvZHlcIlxyXG4gICAgY29uc3QgY2FyZEJvZHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY2FyZEJvZHlEaXYuY2xhc3NMaXN0LmFkZChcImNhcmQtYm9keVwiKTtcclxuXHJcbiAgICAvLyBDcmVhciBlbCBlbGVtZW50byBwIGNvbiBsYSBjbGFzZSBcImNhcmQtdGV4dFwiIHkgdGV4dG8gXCJQb2RyYXMgZGlzZnJ1dGFyIGRlbCBtZWpvciBwYSBhbWIgdHVtYWNhXCJcclxuICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgcGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoXCJjYXJkLXRleHRcIik7XHJcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSBcIlBvZHJhcyBkaXNmcnV0YXIgZGVsIG1lam9yIHBhIGFtYiB0dW1hY2FcIjtcclxuXHJcbiAgICBjYXJkQm9keURpdi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xyXG4gICAgY2FyZERpdi5hcHBlbmRDaGlsZChjYXJkSGVhZGVyRGl2KTtcclxuICAgIGNhcmREaXYuYXBwZW5kQ2hpbGQoY2FyZEJvZHlEaXYpO1xyXG4gICAgY29sRGl2LmFwcGVuZENoaWxkKGNhcmREaXYpO1xyXG5cclxuICAgIGNhcmRSb3cuYXBwZW5kQ2hpbGQoY29sRGl2KTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=