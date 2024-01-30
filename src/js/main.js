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
let logOutButton = document.getElementById('logOutBtn');
let profileButton = document.getElementById('profile-button');

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

profileButton.addEventListener('click', function () {
    setProfile();
});



function setProfile() {

    

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    let form = document.getElementById('form-perfil');

    form.innerHTML="";

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
    editButton.type='button'
    editButton.innerHTML = "Editar"
    editButton.id = "edit";
    form.appendChild(editButton);

    let but = document.getElementById('edit');
    but.addEventListener('click', () => {

        updateUser();
    })

}

function updateSessionStorage(name,email,password){

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    sessionStorage.setItem('usuario',JSON.stringify(usuario))
    window.location.reload();



}

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


function setDivMap() {

    let div = document.createElement('div');
    div.id = 'map';

    body.append(div);

    initMap();
    return div


}

async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
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
    console.log('hola');
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const transaccion = db.result.transaction(["users"], "readwrite");
    transaccion.objectStore("users").put({
        email: email,
        name: name,
        password: password,
    });

    updateSessionStorage(name,email,password);
}





