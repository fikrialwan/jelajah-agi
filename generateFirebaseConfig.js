const fs = require('fs');
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "jelajahagi.firebaseapp.com",
  projectId: "jelajahagi",
  storageBucket: "jelajahagi.appspot.com",
  messagingSenderId: "693805997549",
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const content = `
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = ${JSON.stringify(firebaseConfig)};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: './logo.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});`;

fs.writeFileSync('public/firebase-messaging-sw.js', content);