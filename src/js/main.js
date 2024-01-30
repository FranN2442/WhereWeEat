import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
let map;
let service;
let infowindow;

let body = document.querySelector('body');

let bcnButton = document.querySelector('.barcelona-btn');
let grxButton = document.querySelector('.granada-btn');
let mdrButton = document.querySelector('.madrid-btn');
let mlgButton = document.querySelector('.malaga-btn');
let logOutButton = document.getElementById('logOutBtn');

function handleButtonClick(coords, cityName) {
    if (document.getElementById('map')) {
        setCenter(coords);
    } else {
        let divCharged = setDivMap();
        setTimeout(() => {
            setCenter(coords);
            let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: posDiv,
                behavior: 'smooth'
            });
        }, 1000);
    }
    console.log(cityName + ' button');
}

bcnButton.addEventListener('click', function () {
    handleButtonClick({ lng: 2.1589900, lat: 41.3887900 }, 'Barcelona');
});

grxButton.addEventListener('click', function () {
    handleButtonClick({ lng: -3.6066700, lat: 37.1881700 }, 'Granada');
});

mdrButton.addEventListener('click', function () {
    handleButtonClick({ lng: -3.7025600, lat: 40.4165000 }, 'Madrid');
});

mlgButton.addEventListener('click', function () {
    handleButtonClick({ lng: -4.4203400, lat: 36.7201600 }, 'Malaga');
});
logOutButton.addEventListener('click', function () {
    logOut();
});

function setDivMap() {

    let div = document.createElement('div');
    div.id = 'map';

    body.append(div);

    initMap();
    return div


}

function initMap() {

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
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
    const mailElement = document.getElementById("email").value;
    const unameElement = document.getElementById("name").value;
    const passElement = document.getElementById("password").value;
  
    const transaccion = db.result.transaction(["users"], "readwrite");
    transaccion.objectStore("users").put({
      email: mailElement,
      name: unameElement,
      password: passElement,
    });
}

let usuario = JSON.parse(sessionStorage.getItem('usuario'));
let form = document.getElementById('form-perfil');

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
editButton.id='editarPerfil'
editButton.className = 'btn btn-primary my-3 col-6 offset-3';
editButton.innerHTML = 'Editar Perfil';
form.appendChild(editButton);

editButton.addEventListener('click', updateUser() );


