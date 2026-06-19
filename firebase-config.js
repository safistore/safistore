import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "safistore-c956b.firebaseapp.com",
  projectId: "safistore-c956b",
  storageBucket: "safistore-c956b.firebasestorage.app",
  messagingSenderId: "977849577729",
  appId: "1:977849577729:web:4dd4ce0f93b31ee6e2eb00"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);