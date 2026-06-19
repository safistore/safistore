import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth,
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

window.adminLogin =
async function(){

const email =
document.getElementById("adminEmail").value;

const password =
document.getElementById("adminPassword").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

if(
email === "admin@safistore.com"
){

window.location =
"dashboard.html";

}
else{

alert(
"Access Denied"
);

}

}
catch(error){

alert(error.message);

}

};