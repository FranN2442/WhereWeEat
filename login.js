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
    alert("User registered!");
  };

  transaccion.onerror = function (e) {
    alert("error");
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
  let email = document.getElementById("delete").value;

  const mailElement = document.getElementById("correo");
  const unameElement = document.getElementById("nombre");
  const passElement = document.getElementById("pwd");

  const transaccion = db.result.transaction(["users"], "readonly");
  const getUserData = transaccion.objectStore("users");

  const getRequest = getUserData.getAll(IDBKeyRange.only(email));

  getRequest.onsuccess = function (e) {
    const userDataArray = e.target.result;

    if (userDataArray.length > 0) {
      userDataArray.forEach(function (userData) {
        const name = userData.name;
        const email = userData.email;
        const password = userData.password;
        mailElement.innerHTML = email;
        unameElement.innerHTML = name;
        passElement.innerHTML = password;
        console.log(name, email, password);
      });
    }
  };

  getRequest.onerror = function (event) {
    console.error("Error retrieving user data:", event.target.error);
  };

  function updateUser() {
    const mailElement = document.getElementById("correo").value;
    const unameElement = document.getElementById("nombre").value;
    const passElement = document.getElementById("pwd").value;

    const transaccion = db.result.transaction(["users"], "readwrite");
    transaccion.objectStore("users").put({
      email: mailElement,
      name: unameElement,
      password: passElement,
    });
  }
}
  function showError() {
    alert('ddd')
    throw new Error("Mininooo");
  }
