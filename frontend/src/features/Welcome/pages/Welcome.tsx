import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import WelcomeImage from '../assets/home-image.png';
import { useHistory } from 'react-router-dom';
import '../styles/Welcome.css';

const Home = () => {


  const history = useHistory();

  function onLogin() {
    history.push('/jobs');
  }



  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeMd="8" sizeXs="12">
              <img className="welcome-img" src={WelcomeImage} alt="welcome" />
              <h1>Encuentra tu trabajo perfecto</h1>
              <p>Encontrar el trabajo de tus sueños más rapido y fácil desde el mismo lugar</p>
              <IonButton onClick={onLogin} className="welcome-button" size='large'>
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