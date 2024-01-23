import axios from 'axios';
export function run() {
    var data = JSON.stringify({
        "collection": "Restaurantes",
        "database": "Whereweeat",
        "dataSource": "WhereWeEat",
        "projection": {
            "name": 1
        }
    });

    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-ilwhh/endpoint/data/v1/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': '1NdZIUnLMODa8DOD3KXa0sjNPKLgthkwd1TkUeEhuMJgoEfR0s6fyVurdPy3Wx7y',
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data['document'].name;
        })
        .catch(function (error) {
            console.log(error);
            throw error; // Rechaza la promesa en caso de error
        });
}


let db = indexedDB.open('WhereWeEat');
run().then(function (name) {
    
    db.onupgradeneeded = function (ev) {
        
        const eat = ev.target.result;
        const eatStore = eat.createObjectStore('Restaurantes',{
            
            keyPath : 'name' 
        });
        const transaction = db.result.transaction(['Restaurantes','readwrite']);
        
        transaction.objectStore.add({

            'name' : name
            
        });
        
    }
})
.catch(function (error) {
    console.error('Error en la ejecución:', error);
});
