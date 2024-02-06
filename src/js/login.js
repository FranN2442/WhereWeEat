import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// Início de la base de datos en IndexedDB
const db = indexedDB.open("users", 1);

db.onupgradeneeded = function (e) {
  const database = e.target.result;

  const userObjStore = database.createObjectStore("users", {
    keyPath: "email",
  });
  userObjStore.createIndex("email", "email", { unique: true });
};


// Añadir botones login o register dependiendo de la página que estamos
document.addEventListener('DOMContentLoaded', () => {

  if (window.location.pathname == "/dist/login.html") {

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {

      event.preventDefault();
      login();

    });

  } else {


    if (window.location.pathname == "/dist/register.html") {

      const registrationForm = document.getElementById('registrationForm');
      registrationForm.addEventListener('submit', (event) => {

        event.preventDefault();
        register();

      });
    }

  }



});

// Crear usuario en IndexedDB con los valores del form.
function register() {
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
    accessMessages("Usuario creado correctamente!","registrationForm","login.html","success")

  };

  transaccion.onerror = function (event) {
    console.error("Error al insertar el usuario: ", event.target.error);
  };

}

// Verificación de las credenciales pasadas por el usario en IndexedDB
function login() {

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
        accessMessages("Inicio de sesión correcto!","loginForm","index.html","success")
      } else {
        accessMessages("Contraseña incorrecta.","loginForm","login.html","danger")
      }
    } else {
      accessMessages("Correo incorrecto.","loginForm","login.html","danger")
    }

  };

  emailRequest.onerror = function (event) {
    console.error("Error al buscar el usuario: ", event.target.error);
  };

}


// Control de mensajes de verificación o de errores al usuario.
function accessMessages(message, formId,redirectPage,type) {

  let formDiv = document.getElementById(formId);
  let h4 = document.createElement('h4');
  h4.innerHTML = message;
  h4.className = "text-" + type + " mt-2";
  formDiv.appendChild(h4);

  setTimeout(() => {

    window.location.href = redirectPage


  }, 2000)

}


