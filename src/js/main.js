import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
// Objeto de la base de datos, para poder operar con ella.
const db = indexedDB.open("users", 1);

// Guardar botones en variables para añadirles funcionalidades.
let logOutButton = document.getElementById('logOutBtn');
let profileButton = document.getElementById('profile-button');
let deleteBut = document.getElementById('delete-btn');
let homeButton = document.getElementById('home-btn');
let contactButton = document.getElementById('contact-btn');

// Inserción de funcionalidades a los botones.
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

});


// Variables necesarias para la ejecución del toolTip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Inicializar el formulario para editar la información del usuario.
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

// Guradar usuario en el SessionStorage para futuro uso.
function updateSessionStorage(name, email, password) {

    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    sessionStorage.setItem('usuario', JSON.stringify(usuario))
    // window.location.reload();

}
// Desloguear al usuario y borrar sessionStorage
function logOut() {

    sessionStorage.removeItem("usuario");
    window.location.href = "login.html"

}

// Actualización de la información del  usaurio en indexedDB y en Session Storage.
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

    let request2 = transaccion.objectStore("users").get(email);
    console.log(request2);
    request.onsuccess = function (event) {

        updateSessionStorage(name, email, password);

    }

}

function readUser(email){

    const transaccion = db.result.transaction(["users"], "readwrite");

    let request = transaccion.objectStore("users").get(email);

    request.onsuccess =  function (e) {

        return  e.target.result;

    }
}

// Eliminar  el usuario de indexedDB y ejecutar función de log out
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





