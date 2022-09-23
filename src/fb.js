import firebase from "firebase/compat/app"
import "firebase/compat/auth";
/*DataBase Testing */

export const appfb = firebase.initializeApp({
  apiKey: "AIzaSyCinFyOP4zuf4DjlRxOGP6nwYbs7dAar1k",
  authDomain: "test-solucion-informatica.firebaseapp.com",
  projectId: "test-solucion-informatica",
  storageBucket: "test-solucion-informatica.appspot.com",
  messagingSenderId: "805370552803",
  appId: "1:805370552803:web:5e10b448bff329d6ddc0d6"
});

/*
Database real.
export const appfb = firebase.initializeApp({
    "projectId": "solucion-informatica-29a07",
    "appId": "1:748210242412:web:5f9905718255d112afe949",
    "storageBucket": "solucion-informatica-29a07.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyCvqsfHzK_neo_QMR63FvzAqIohI2rqTYE",
    "authDomain": "solucion-informatica-29a07.firebaseapp.com",
    "messagingSenderId": "748210242412"
  });
  */