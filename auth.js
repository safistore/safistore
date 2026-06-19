import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

window.register = async function(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  alert("Registered");
};

window.login = async function(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
  window.location.href = "index.html";
};