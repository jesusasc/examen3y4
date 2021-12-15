//Este es el import de la libreria 
import app from "firebase/app";
//importar el servicio de la base de taos de firestore
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  /*apiKey: "AIzaSyAyNfi9vakYe_hFS2VyAQFmJOao9B4W8ro",
  authDomain: "proyectocrud-34597.firebaseapp.com",
  projectId: "proyectocrud-34597",
  storageBucket: "proyectocrud-34597.appspot.com",
  messagingSenderId: "124645518394",
  appId: "1:124645518394:web:3915ff6e27c99124085903"
*/

apiKey: "AIzaSyBxUAN3eGLiIGUuqmKGhXKZbTxyGTlUUYs",
  authDomain: "iniciarsesion-5dc8f.firebaseapp.com",
  projectId: "iniciarsesion-5dc8f",
  storageBucket: "iniciarsesion-5dc8f.appspot.com",
  messagingSenderId: "624755007044",
  appId: "1:624755007044:web:15bccceae303f7582d2611"};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export{db, auth}