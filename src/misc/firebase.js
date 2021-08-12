import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
const config = {
  apiKey: "AIzaSyD-wkLoSd3yJtUs3-Flv2Cx3xUqEtpSQ5U",
  authDomain: "chat-web-app-4e677.firebaseapp.com",
  projectId: "chat-web-app-4e677",
  storageBucket: "chat-web-app-4e677.appspot.com",
  messagingSenderId: "629912869203",
  appId: "1:629912869203:web:5bd47566dd3c1661c5a9a6",
  databaseURL:
    " https://chat-web-app-4e677-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = firebase.initializeApp(config);

//It will give functionality to interact with firebase.
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
