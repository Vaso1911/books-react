import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAqS3I5D0i9F60i13K3B9-A7POWmvwL-vI",
//   authDomain: "firestore-books-b7268.firebaseapp.com",
//   projectId: "firestore-books-b7268",
//   storageBucket: "firestore-books-b7268.appspot.com",
//   messagingSenderId: "67949089034",
//   appId: "1:67949089034:web:b322b925124a2574caeaf3"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDnQOPtkjqfOSZd74DA5dhnfPpbRzZD354",
  authDomain: "books-test-32101.firebaseapp.com",
  projectId: "books-test-32101",
  storageBucket: "books-test-32101.appspot.com",
  messagingSenderId: "500519882098",
  appId: "1:500519882098:web:e1717c7822cd1c827de1eb"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
