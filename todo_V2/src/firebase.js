import firebase from "firebase";
import config from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

export default db;
