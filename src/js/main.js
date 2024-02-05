import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
const db = indexedDB.open("users", 1);
let map;
let service;
let infowindow;
let body = document.querySelector('body');

let bcnButton = document.querySelector('.barcelona-btn');
let grxButton = document.querySelector('.granada-btn');
let mdrButton = document.querySelector('.madrid-btn');
let mlgButton = document.querySelector('.malaga-btn');
let userButton = document.querySelector('.user-btn');
let logOutButton = document.getElementById('logOutBtn');
let profileButton = document.getElementById('profile-button');
let deleteBut = document.getElementById('delete-btn');
let homeButton = document.getElementById('home-btn');
let contactButton = document.getElementById('contact-btn');

bcnButton.addEventListener('click', function () {
    setMapCoords({ lng: 2.1589900, lat: 41.3887900 });
});

grxButton.addEventListener('click', function () {
    setMapCoords({ lng: -3.6066700, lat: 37.1881700 });
});

mdrButton.addEventListener('click', function () {
    setMapCoords({ lng: -3.7025600, lat: 40.4165000 });
});

mlgButton.addEventListener('click', function () {
    setMapCoords({ lng: -4.4203400, lat: 36.7201600 });
});
userButton.addEventListener('click', function () {

    navigator.geolocation.getCurrentPosition((position) => {

        setMapCoords({ lng: position.coords.longitude, lat: position.coords.latitude });
    })
});
logOutButton.addEventListener('click', function () {
    logOut();
});
profileButton.addEventListener('click', function () {
    setProfile();
});
deleteBut.addEventListener('click', () => {

    let spinner = document.createElement('span');
    spinner.className = "spinner-border spinner-border-sm m-2"
    spinner.role = "status"
    spinner.ariaHidden = "true";
    deleteBut.append(spinner);

    setTimeout(() => {


        deleteUser();


    }, 2000);
});
homeButton.addEventListener('click', () => {

    location.reload();

});
contactButton.addEventListener('click', () => {

    let contactDiv = document.getElementById('contact-div');
    let posDiv = contactDiv.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: posDiv,
                behavior: 'smooth'
            });

})

function searchNearbyRestaurants(location) {
    const request = {
        location: location,
        radius: '5000',
        query: "resturant",
        fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i])
                console.log(results[i].name);
            }
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}



const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function setProfile() {

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    let form = document.getElementById('form-perfil');

    form.innerHTML = "";

    for (var atributos in usuario) {
        if (usuario.hasOwnProperty(atributos)) {
            var input = document.createElement('input');
            input.type = 'text';
            input.name = atributos;
            input.value = usuario[atributos];
            input.id = atributos;
            input.className = 'form-control mb-2';

            var label = document.createElement('label');
            label.innerHTML = atributos.toUpperCase();

            form.appendChild(label);
            form.appendChild(input);
        }
    }
    let editButton = document.createElement('button');
    editButton.type = 'button'
    editButton.innerHTML = "Editar"
    editButton.id = "edit";
    editButton.className = "btn btn-secondary"
    form.appendChild(editButton);

    let but = document.getElementById('edit');
    but.addEventListener('click', () => {

        updateUser();
    })

}


function updateSessionStorage(name, email, password) {

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    sessionStorage.setItem('usuario', JSON.stringify(usuario))
    window.location.reload();

}

function setMapCoords(coords) {

    if (!document.getElementById('map').hidden) {
        setCenter(coords);
        searchNearbyRestaurants(coords);
    } else {
        let divMap = document.getElementById('map');
        divMap.removeAttribute('hidden')
        initMap();
        setTimeout(() => {
            setCenter(coords);
            searchNearbyRestaurants(coords);
            let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: posDiv,
                behavior: 'smooth'
            });
        }, 1000);
    }
}


// function setDivMap() {

//     let div = document.createElement('div');
//     div.id = 'map';

//     body.append(div);

//     initMap();
//     return div


// }

async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        zoom: 13,
    });

}

function setCenter(pos) {

    const ciudadCoords = {
        lat: pos.lat,
        lng: pos.lng,
    };
    map.setCenter(ciudadCoords);

}
function logOut() {

    sessionStorage.removeItem("usuario");
    window.location.href = "login.html"

}

function updateUser() {
    console.log('hola');
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const transaccion = db.result.transaction(["users"], "readwrite");
    let request = transaccion.objectStore("users").put({
        email: email,
        name: name,
        password: password,
    });

    request.onsuccess = function (event) {

        updateSessionStorage(name, email, password);

    }

}

function deleteUser() {


    const user = JSON.parse(sessionStorage.getItem('usuario'))

    let email = user.email;

    console.log(email);

    const transaccion = db.result.transaction(["users"], "readwrite");

    let request = transaccion.objectStore('users').delete(email);

    request.onsuccess = () => {

        logOut();

    }

}





