import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyByzn7AP7mu2Zb1sVb-ZVC3DPKKLOg_Pd8",
    authDomain: "codinity-6ab53.firebaseapp.com",
    databaseURL: "https://codinity-6ab53.firebaseio.com",
    projectId: "codinity-6ab53",
    storageBucket: "codinity-6ab53.appspot.com",
    messagingSenderId: "664481511537",
    appId: "1:664481511537:web:1177ea783560e19c0c03d0",
    measurementId: "G-85LJX8D9P9"
  };

var fireDb = firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampInSnapshots: true });
  
export default fireDb.database().ref();