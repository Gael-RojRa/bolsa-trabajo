/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// Inicializa Firebase en el Service Worker exclusivamente con el sender ID
firebase.initializeApp({
  messagingSenderId: '115788184332', // reemplaza con tu sender ID real
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192x192.png',
  });
});
