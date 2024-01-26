import '../scss/styles.scss'
import '../js/indexedData.js'
import * as bootstrap from 'bootstrap'

//EVENT LISTENER ON LOAD DOMCONTENT
document.addEventListener('DOMContentLoaded', function () {

    let body = document.querySelector('body');

    let buttons = document.querySelector('.ciudades-btn');

    let divMap = document.createElement('div');
    divMap.id = "map";

    let map;

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            body.appendChild(divMap);
        });
    });


})


