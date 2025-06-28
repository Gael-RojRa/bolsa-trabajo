/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAWLVLhW3vid7EWjcgMNaPOCCcJmKeyzHw",
  authDomain: "traking-de-series.firebaseapp.com",
  projectId: "traking-de-series",
  storageBucket: "traking-de-series.appspot.com",
  messagingSenderId: "154615730175",
  appId: "1:154615730175:web:507f14ebe9482a667ca1ca"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const { title, body } = payload.notification || {};
  const notificationTitle = title || 'Nueva notificación';
  const notificationOptions = {
    body: body,
    icon: '/icons/icon-192x192.png',
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
