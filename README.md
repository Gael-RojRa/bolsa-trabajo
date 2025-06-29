# Bolsa de Trabajo
Aplicación Laravel + React/Ionic para publicar ofertas y gestionar postulaciones con notificaciones push (FCM).

## Guía Rápida
Backend:
```bash
cp .env.example .env  # configurar la BD y la variable FIREBASE_CREDENTIALS (ruta local al JSON de Service Account)
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Frontend:
```bash
cd frontend
cp .env.example .env  # pegar aquí las claves públicas (apiKey, authDomain, messagingSenderId, etc.) del proyecto Firebase
npm install
npm run dev
```

### Configurar Firebase
1. Crear un proyecto en la consola de Firebase.
2. **Backend**: descargar un "Service Account JSON" y poner su ruta absoluta en `.env` como `FIREBASE_CREDENTIALS=/ruta/al/archivo.json`.
3. **Frontend**: en `frontend/.env` pegar los campos públicos `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.
4. En Cloud Messaging generar las claves VAPID y agregar `VITE_FIREBASE_VAPID_KEY=` en el mismo `.env`.

```

API → http://localhost:8000   |  App → http://localhost:5173


