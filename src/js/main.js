import '../scss/styles.scss'
import '../js/indexedData.js'
import * as bootstrap from 'bootstrap'
let map;
let service;
let infowindow;

let body = document.querySelector('body');

let bcnButton = document.querySelector('.barcelona-btn');
let grxButton = document.querySelector('.granada-btn');
let mdrButton = document.querySelector('.madrid-btn');
let mlgButton = document.querySelector('.malaga-btn');

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

bcnButton.addEventListener('click',  function () {
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

// bcnButton.addEventListener('click', async function () {

//     let bcnCoords = { lng: 2.1589900, lat: 41.3887900 }

    
//     if(document.getElementById('map')){

//         setCenter(bcnCoords);
        

//     } else {

//         let divCharged = setDivMap()
//         setTimeout(() => {

//             setCenter(bcnCoords);
//             let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
//             window.scrollTo({
//                 top: posDiv,
//                 behavior: 'smooth' // Para un desplazamiento suave
//             });
//         },1000)
//     }

//     console.log('bcn button');

// });

// grxButton.addEventListener('click', function () {
//     let grxCoords = { lng: -3.6066700, lat: 37.1881700 }

//     if(document.getElementById('map')){

//         setCenter(grxCoords);
        

//     } else {

//         let divCharged = setDivMap()
//         setTimeout(() => {

//             setCenter(grxCoords);
//             let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
//             window.scrollTo({
//                 top: posDiv,
//                 behavior: 'smooth' // Para un desplazamiento suave
//             });
//         },1000)
//     }
//     console.log('grx button')

// });
// mdrButton.addEventListener('click', function () {
//     let mdrCoords = { lng:  -3.7025600, lat: 40.4165000}

//     if(document.getElementById('map')){

//         setCenter(mdrCoords);
        

//     } else {

//         let divCharged = setDivMap()
//         setTimeout(() => {

//             setCenter(mdrCoords);
//             let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
//             window.scrollTo({
//                 top: posDiv,
//                 behavior: 'smooth' // Para un desplazamiento suave
//             });
//         },1000)
//     }
//     console.log('mdr button')

// });
// mlgButton.addEventListener('click', function () {
//     let mlgCoords = { lng: -4.4203400, lat: 36.7201600 }

//     if(document.getElementById('map')){

//         setCenter(mlgCoords);
        
//     } else {

//         let divCharged = setDivMap()
//         setTimeout(() => {

//             setCenter(mlgCoords);
//             let posDiv = divCharged.getBoundingClientRect().top + window.scrollY;
//             window.scrollTo({
//                 top: posDiv,
//                 behavior: 'smooth' // Para un desplazamiento suave
//             });
//         },1000)
//     }
//     console.log('mlg button')

// });

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



