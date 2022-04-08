// import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/database";
import "@firebase/storage";
import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDWn6Sgv4QVBUrTHvxc0OdMjDNUldd0nMg",
  authDomain: "zi-house.firebaseapp.com",
  databaseURL: "https://zi-house-default-rtdb.firebaseio.com",
  projectId: "zi-house",
  storageBucket: "zi-house.appspot.com",
  messagingSenderId: "882389107703",
  appId: "1:882389107703:web:1180f20c2e9f7044f3a4f2",
  measurementId: "G-LTXY2LX2F3",
};

const Firebased = firebase.initializeApp(firebaseConfig);
export default Firebased;
