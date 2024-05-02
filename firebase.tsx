// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk1lUqrh0yvEGEajchoVIzTcebmr02Bfo",
  authDomain: "se-project-951b4.firebaseapp.com",
  projectId: "se-project-951b4",
  databaseUrl:"https://se-project-951b4-default-rtdb.firebaseio.com/",
  storageBucket: "se-project-951b4.appspot.com",
  messagingSenderId: "889656487535",
  appId: "1:889656487535:web:588b8da57f295dec9c279a",
  measurementId: "G-JEQKZ1QKZX"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app); 
const storage=getStorage(app);
export {auth,db,storage}

// const submit=document.getElementById('submit').value;
// submit.addEventListener("click",function(event){
//     event.preventDefault();
//     const email=document.getElementById('email' ).value;
//     const password=document.getElementById('password').value;
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up 
//       const user = userCredential.user;
//       alert("creating account");
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });

    
//     alert(5);
// })


