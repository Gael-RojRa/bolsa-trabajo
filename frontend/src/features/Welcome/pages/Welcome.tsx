import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import WelcomeImage from '../assets/home-image.png';
import { useHistory } from 'react-router-dom';
import '../styles/Welcome.css';

const Home = () => {
  const history = useHistory();

  function OnStart() {
    history.push('/login');
  }

  return (
    <IonPage>
      <IonContent className="welcome-container">
        <IonGrid className="ion-padding ion-text-center">
          <IonRow className="ion-justify-content-center">
            <IonCol sizeLg="6" sizeMd="8" sizeXs="12" className="welcome-col">
              <img className="welcome-img" src={WelcomeImage} alt="welcome" />
              <h1 className="welcome-title">Encuentra tu trabajo perfecto</h1>
              <p className="welcome-subtitle">Encontrar el trabajo de tus sueños más rapido y fácil desde el mismo lugar</p>
              <IonButton 
                onClick={OnStart} 
                className="welcome-button" 
                size="large"
                expand="block"
              >
                Comienza Ahora →
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;