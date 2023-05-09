import firebase from "firebase/app"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyD6l9wdASZIqsJnBdoDhQWDl08Swo-BBYo",
    authDomain: "ecommerce-site-99365.firebaseapp.com",
    projectId: "ecommerce-site-99365",
    storageBucket: "ecommerce-site-99365.appspot.com",
    messagingSenderId: "376984579580",
    appId: "1:376984579580:web:aec8ffd7f984540f0f9679"
  };

const app = !firebase.getApps().length ? firebase.initializeApp(firebaseConfig) : firebase.getApp()

const db = getFirestore(app)

export default db