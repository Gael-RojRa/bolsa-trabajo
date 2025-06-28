import { useEffect, useState } from 'react';
import { getToken, onMessage, deleteToken } from 'firebase/messaging';
import { messaging } from './firebase';
import api from './api/axiosInstance';

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

export default function usePushRegistration() {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const handleTokenChange = () => {
      setAuthToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  useEffect(() => {
    if (!('Notification' in window)) return;

    const registerToken = async () => {
      if (!authToken) return; // esperar a login
      if (Notification.permission !== 'granted') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return;
      }
      try {
        // Elimina SW obsoletos que apunten a otra ruta
        const allRegs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(allRegs.map(r => r.unregister()));

        const registration = await navigator.serviceWorker.register('/firebase-sw.js');

        // Elimina cualquier token existente para evitar inconsistencia de proyecto
        try {
          const existingToken = await getToken(messaging, { serviceWorkerRegistration: registration, vapidKey: VAPID_KEY });
          if (existingToken) {
            await deleteToken(messaging);
          }
        } catch (e) {
          console.debug('No existing FCM token to delete');
          /* no pasa nada si no existía */
        }

        const fcmToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration,
        });
        if (fcmToken) {
          await api.post('/device-tokens', { fcm_token: fcmToken, platform: 'web' });
        }
      } catch (err) {
        console.error('Error getting FCM token', err);
      }
    };

    registerToken();

    // Cuando la app está en primer plano
    const unsubscribe = onMessage(messaging, (payload) => {
      window.alert(payload.notification?.title + '\n' + payload.notification?.body);
    });

    return () => unsubscribe();
  }, []);
}
