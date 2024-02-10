import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import {login, register } from "./crud.js";


// Añadir botones login o register dependiendo de la página que estamos
document.addEventListener('DOMContentLoaded', () => {


  console.log(window.location.pathname);
  if (window.location.pathname == "/login.html") {

    console.log("login");
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {

      event.preventDefault();
      login();

    });

  } else {

    if (window.location.pathname == "/register.html") {

      console.log("register");
      const registrationForm = document.getElementById('registrationForm');
      registrationForm.addEventListener('submit', (event) => {
        console.log("registrando");
        event.preventDefault();
        register();

      });
    }

  }



});



