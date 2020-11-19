import firebase from 'firebase';
import "firebase/firestore";
import "firebase/storage"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBc3LwbbTzvSy4DZuNYWHr3Kr0GjF38XSM",
    authDomain: "admin-8713f.firebaseapp.com",
    databaseURL: "https://admin-8713f.firebaseio.com",
    projectId: "admin-8713f",
    storageBucket: "admin-8713f.appspot.com",
    messagingSenderId: "929453827510",
    appId: "1:929453827510:web:def119fe669c9a350e4d17",
    measurementId: "G-YC3GFS7KGF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase;