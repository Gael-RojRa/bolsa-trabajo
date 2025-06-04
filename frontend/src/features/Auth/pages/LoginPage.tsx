import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import HandFiveImg from '../assets/hand-five.png';
import '../styles/LoginPage.css';
import api from '../../../../shared/utils/axios'


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user.role_id === 1) {
        history.push('/jobs');
      } else {
        history.push('/employer/offers');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');  
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeMd="8" sizeXs="12">
              <h2>¡Bienvenido de Vuelta!</h2>
              {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
              <img className='login-image' src={HandFiveImg} alt="Welcome" />
              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
              <IonInput
                label="Password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
              <IonText onClick={() => history.push('/register')}>
                ¿Nuevo usuario? <strong>Crear Cuenta</strong>
              </IonText>
              <IonButton expand="full" onClick={handleLogin}>
                Iniciar sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
