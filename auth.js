import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {

/* YOUR FIREBASE CONFIG */

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

window.registerUser =
async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Registration Successful");

window.location =
"login.html";

}
catch(error){

alert(error.message);

}

};

window.loginUser =
async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Successful");

window.location =
"products.html";

}
catch(error){

alert(error.message);

}

};