const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    piKey: `${process.env.FIRESTORE_KEY}`,
    authDomain: "propertyalpha-1428b.firebaseapp.com",
    databaseURL: "https://propertyalpha-1428b.firebaseio.com",
    projectId: "propertyalpha-1428b",
    storageBucket: "propertyalpha-1428b.appspot.com",
    messagingSenderId: "126200006947",
    appId: "1:126200006947:web:d42ad7dedcf40a06cde496",
    measurementId: "G-7YC9GWXYJ4"
});

var db = firebase.firestore();

export default db