import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getMyOffers } from '../../../shared/services/recruiterService';

interface Offer {
  id: number;
  title: string;
  postulations_count: number;
}

const EmployerOffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const history = useHistory();

  useEffect(() => {
    getMyOffers().then(res => setOffers(res.data.data));
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Mis ofertas</h2>

        <IonList>
          {offers.map(o => (
            <IonItem
              key={o.id}
              button
              onClick={() => history.push(`/employer/offers/${o.id}`)}
            >
              <IonLabel>
                <h3>{o.title}</h3>
                <p>{o.postulations_count} postulaciones</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EmployerOffersPage;
