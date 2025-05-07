import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonInput, IonLabel, IonItem, IonText } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
 
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      
      // Guardar el token en el localStorage
      localStorage.setItem('token', response.data.token);
      history.push('/home'); // Redirigir al dashboard
    } catch (error) {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: '20px' }}>
          <h2>Iniciar sesión</h2>
          {errorMessage && <IonText color="danger">{errorMessage}</IonText>}

          <IonItem>
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput 
              value={email} 
              onIonChange={(e) => setEmail(e.detail.value!)} 
              type="email" 
              required 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput 
              value={password} 
              onIonChange={(e) => setPassword(e.detail.value!)} 
              type="password" 
              required 
            />
          </IonItem>

          <IonButton expand="full" onClick={handleLogin}>Iniciar sesión</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
