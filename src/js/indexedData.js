
let dataArray = [{ id: 1, name: 'Restaurant1' },{ id: 2, name: 'Restaurant2' },{ id: 3, name: 'Restaurant3' }]
   
let db;
function initializeIndexedDB() {

    let request = window.indexedDB.open("WhereWeEat", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('Restaurantes', { keyPath: 'id' });
        objectStore.createIndex('nameIndex', 'name', { unique: false });
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        dataArray.forEach(data => {
            addDataToDB(data);
        });
    };

    request.onerror = function (event) {
        console.error('Error opening database:', event.target.errorCode);
    };
}

function addDataToDB(data) {
    const transaction = db.transaction(['Restaurantes'], 'readwrite');
    const objectStore = transaction.objectStore('Restaurantes');

    // Use the 'add' method to add data to the object store
    const addRequest = objectStore.add(data);

    // Handle the success or error events for the transaction
    addRequest.onsuccess = function (event) {
        console.log('Data added successfully:', event.target.result);
    };

    addRequest.onerror = function (event) {
        console.error('Error adding data:', event.target.error);
    };
}

initializeIndexedDB();