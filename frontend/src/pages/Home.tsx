import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import HomeImage from '../../public/assets/home-image.png'
import './Home.css';

const Home = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeMd="8" sizeXs="12">
              <img className="home-img" src={HomeImage} alt="home" />
              <h1>Encuentra tu trabajo perfecto</h1>
              <p>Encontrar el trabajo de tus sueños más rapido y fácil desde el mismo lugar</p>
              <IonButton className="home-button" size='large'>
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