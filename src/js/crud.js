import { updateSessionStorage, logOut } from "./main.js";
// Início de la base de datos en IndexedDB
let db = indexedDB.open("users", 24);

db.onupgradeneeded = function (e) {
    const database = e.target.result;

    const userObjStore = database.createObjectStore("users", {
        keyPath: "email",
    });
    userObjStore.createIndex("email", "email", { unique: true });

};
// Crear usuario en IndexedDB con los valores del form.
export function register() {
    const uname = document.getElementById("uname").value;
    const mail = document.getElementById("email").value;
    const pass = document.getElementById("psw").value;

    const transaccion = db.result.transaction(["users"], "readwrite");
    transaccion.objectStore("users").add({
        name: uname,
        email: mail,
        password: pass,
    });

    transaccion.oncomplete = function () {
        accessMessages("Usuario creado correctamente!", "registrationForm", "/", "success")

    };

    transaccion.onerror = function (event) {
        accessMessages("El correo proporcionado ya está registrado!", "registrationForm", "html/register.html", "danger")
    };

}

// Verificación de las credenciales pasadas por el usario en IndexedDB
export function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;

    const transaccion = db.result.transaction(["users"], "readonly");
    const objectStore = transaccion.objectStore("users");

    const emailIndex = objectStore.index("email");
    const emailRequest = emailIndex.get(email);

    emailRequest.onsuccess = function (e) {
        const user = e.target.result;

        if (user) {

            // Usuario encontrado, ahora verifica la contraseña
            if (user.password === password) {
                sessionStorage.setItem('usuario', JSON.stringify(user));
                accessMessages("Inicio de sesión correcto!", "loginForm", "html/main.html", "success")
            } else {
                accessMessages("Contraseña incorrecta.", "loginForm", "index.html", "danger")
            }
        } else {
            accessMessages("Correo incorrecto.", "loginForm", "index.html", "danger")
        }

    };

    emailRequest.onerror = function (event) {
        console.error("Error al buscar el usuario: ", event.target.error);
    };

}


// Control de mensajes de verificación o de errores al usuario.
function accessMessages(message, formId, redirectPage, type) {

    let formDiv = document.getElementById(formId);
    let h4 = document.createElement('h4');
    h4.innerHTML = message;
    h4.className = "text-" + type + " mt-2";
    formDiv.appendChild(h4);

    setTimeout(() => {

        window.location.href = redirectPage


    }, 2000)

}


// Eliminar  el usuario de indexedDB y ejecutar función de log out
export function deleteUser() {


    const user = JSON.parse(sessionStorage.getItem('usuario'))

    let email = user.email;

    console.log(email);

    const transaccion = db.result.transaction(["users"], "readwrite");

    let request = transaccion.objectStore('users').delete(email);

    request.onsuccess = () => {

        logOut();

    }

}
export function updateUser() {
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

