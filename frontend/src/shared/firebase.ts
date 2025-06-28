import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Credenciales provenientes de variables de entorno (definidas en .env.local o .env)
// Intenta primero tomar las credenciales de variables de entorno.
import fallbackJson from './firebaseConfig.json';

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Mezcla: toma de envConfig si existe, de lo contrario del JSON de respaldo
const firebaseConfig = {
  apiKey: envConfig.apiKey || (fallbackJson as any).apiKey,
  authDomain: envConfig.authDomain || (fallbackJson as any).authDomain,
  projectId: envConfig.projectId || (fallbackJson as any).projectId,
  storageBucket: envConfig.storageBucket || (fallbackJson as any).storageBucket,
  messagingSenderId: envConfig.messagingSenderId || (fallbackJson as any).messagingSenderId,
  appId: envConfig.appId || (fallbackJson as any).appId,
};

// Si alguna clave esencial falta, usa el fallback JSON generado en el repositorio
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - webpack/tsc permitirá la importación de json


console.debug('Firebase config used:', firebaseConfig);
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
