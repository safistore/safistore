import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAszpqCGgqPq-a90hcpy7lO5VrpNRfMxSQ",
    authDomain: "safistore-c956b.firebaseapp.com",
    projectId: "safistore-c956b",
    storageBucket: "safistore-c956b.firebasestorage.app",
    messagingSenderId: "977849577729",
    appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
  };

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

window.adminLogin =
async function(){

const email =
document.getElementById("safeekestore@gmail.com").value;

const password =
document.getElementById("safeek7879mrs").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

if(
email === "safeekestore@gmail.com"
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