import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonInput, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from 'axios';
import HandShakeImg from '../assets/hand-shake.png';
import '../styles/RegisterPage.css';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_confirmation, setPasswordConfirmation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation
      });

      localStorage.setItem('token', response.data.token);
      history.push('/login');
    } catch (error) {
      setErrorMessage('Error al registrar el usuario. Por favor, verifica los datos ingresados.');
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeMd="8" sizeXs="12">
              <h2>¡Registrate Ahora!</h2>
              {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
              <img className='register-image' src={HandShakeImg} alt="Welcome" />
              <IonInput
                label="Nombre"
                labelPlacement="floating"
                fill="outline"
                type="text"
                placeholder="Nombre"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              ></IonInput>
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
                label="Contraseña"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Contraseña"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
              <IonInput
                label="Confirmar Contraseña"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Contraseña"
                value={password_confirmation}
                onIonChange={(e) => setPasswordConfirmation(e.detail.value!)}
              ></IonInput>
              <IonText onClick={() => history.push('/login')}>
                ¿Ya tienes una cuenta? <strong>Iniciar Sesión</strong>
              </IonText>
              <IonButton expand="full" onClick={handleRegister}>
                Registrarse
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
