import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {

  if (window.location.pathname == "/dist/login.html") {

    console.log('Login page');

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {

      e.preventDefault();
      getUser();

    });

  } else {


    if (window.location.pathname == "/dist/register.html") {

      console.log('register page');
      const registrationForm = document.getElementById('registrationForm');
      registrationForm.addEventListener('submit', (e) => {

        e.preventDefault();
        createUser()

      });
    }

  }



});

const db = indexedDB.open("users", 1);

db.onupgradeneeded = function (e) {
  const database = e.target.result;

  const user = [{ name: "samu", email: "samup60@gmail.com", password: "1234" }];

  const userObjStore = database.createObjectStore("users", {
    keyPath: "email",
  });
  userObjStore.createIndex("email", "email", { unique: true });

  userObjStore.transaction.oncomplete = function (e) {
    let dataObjectStore = database
      .transaction("users", "readwrite")
      .objectStore("users");

    for (let i in user) {
      dataObjectStore.add(user[i]);
    }
  };
};

function createUser() {
  const uname = document.getElementById("uname").value;
  const mail = document.getElementById("email").value;
  const pass = document.getElementById("psw").value;

  const transaccion = db.result.transaction(["users"], "readwrite");
  transaccion.objectStore("users").add({
    name: uname,
    email: mail,
    password: pass,
  });

  transaccion.oncomplete = function (event) {
    window.location.href = "login.html"
    alert("User registered!");
  };

  transaccion.onerror = function (e) {
    showError()
  };

}

function deleteUser() {
  const email = document.getElementById("delete").value;
  const transaccion = db.result.transaction(["users"], "readwrite");
  transaccion.objectStore("users").delete(email);

  transaccion.oncomplete = function (event) { 
    alert("User deleted!");
  };

  transaccion.error = function (event) {
    alert("Error", event.target.error);
  };

}

function getUser() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("psw").value;

  console.log(email + password);

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
        alert('¡Credenciales válidas!')
        window.location.href="index.html"
      } else {
        console.log("Contraseña incorrecta.");
      }
    } else {
      console.log("Usuario no encontrado.");
    }
    
  };

  emailRequest.onerror = function (event) {
    console.error("Error retrieving user data:", event.target.error);
  };

}

function showError(element) {
  console.log(JSON.str)
  return;
}
