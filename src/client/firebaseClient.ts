import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const CLIENT_CONFIG: FirebaseOptions = {
    apiKey: "AIzaSyCr1QLnMYAuvUKozXr5lsB-gsa3oRzcabI",
    authDomain: "advanzo-wors-web.firebaseapp.com",
    projectId: "advanzo-wors-web",
    storageBucket: "advanzo-wors-web.appspot.com",
    messagingSenderId: "1074536819970",
    appId: "1:1074536819970:web:bc5067929a3c57c79fe61b",
    measurementId: "G-Y614Q6MQRZ",
    databaseURL: "https://advanzo-wors-web-default-rtdb.europe-west1.firebasedatabase.app",
};

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

export const init = () => initializeApp(CLIENT_CONFIG);
export const auth = () => getAuth();
export const rtDatabase = () => getDatabase();
export const googleAuthProvider = () => provider;
