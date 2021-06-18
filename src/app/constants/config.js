import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAyF1_wJ8cuwbaXWcW761W8f08UrYuAmRE",
    authDomain: "bluewom-nbp.firebaseapp.com",
    databaseURL: "https://bluewom-nbp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bluewom-nbp",
    storageBucket: "bluewom-nbp.appspot.com",
    messagingSenderId: "584134123577",
    appId: "1:584134123577:web:2f11d9dc1032daedc7ade8"
}

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export default db;