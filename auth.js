import { auth, db } from "./enterprise-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// REGISTER
window.register = async function(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    role: "user"
  });

  alert("Registered");
};

// LOGIN
window.login = async function(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  const snap = await getDoc(doc(db, "users", userCred.user.uid));

  const role = snap.data().role;

  if (role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
};