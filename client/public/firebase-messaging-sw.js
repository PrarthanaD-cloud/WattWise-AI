importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({

  apiKey:
    "AIzaSyAND34JpxB7R9KlG343jNBM6JwXD2YQnes",

  authDomain:
    "wattwise-c6ebf.firebaseapp.com",

  projectId:
    "wattwise-c6ebf",

  storageBucket:
    "wattwise-c6ebf.firebasestorage.app",

  messagingSenderId:
    "404446714715",

  appId:
    "1:404446714715:web:f67b39d4c8b370500f987e",

});

const messaging =
  firebase.messaging();