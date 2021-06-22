import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5v04pBSSBGYjOacg8Q9XnPuVlU_FnVCE",
  authDomain: "chatbox-ed312.firebaseapp.com",
  projectId: "chatbox-ed312",
  storageBucket: "chatbox-ed312.appspot.com",
  messagingSenderId: "573366891127",
  appId: "1:573366891127:web:e4f97c93b84c33d2fb0c72",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
