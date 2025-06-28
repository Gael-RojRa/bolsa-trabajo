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
API → http://localhost:8000   |  App → http://localhost:5173


