import { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonSpinner,
} from '@ionic/react';
import { notificationsOutline, briefcaseOutline } from 'ionicons/icons';

import axiosInstance from '../../../shared/api/axiosInstance';
import './NotificationsPage.css';

interface OfferLocation {
  city: string | null;
  country: string | null;
}

interface Offer {
  id: number;
  title: string;
  salary?: string;
  working_hours?: string;
  location?: OfferLocation;
}

interface Postulation {
  id: number;
  applied_at: string;
  offer: Offer;
}

const NotificationsPage: React.FC = () => {
  const [data, setData] = useState<Postulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/postulations/accepted');
        const arr = Array.isArray(res.data) ? res.data : res.data?.data;
        setData(arr || []);
      } catch (err) {
        console.error(err);
        setError('Error al cargar notificaciones');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {error ? (
          <p className="ion-text-center ion-padding">{error}</p>
        ) : loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <IonSpinner />
          </div>
        ) : data.length === 0 ? (
          <p className="ion-text-center ion-padding">Sin notificaciones</p>
        ) : (
          <IonList className="notifications-list">
            {data.map((p) => (
              p.offer ? (
              <IonItem className="notification-item" key={p.id} routerLink={`/offers/${p.offer?.id}`}>
                <IonIcon slot="start" icon={briefcaseOutline} color="medium" />
                <IonLabel className="ion-text-wrap">
                  <h2>{p.offer?.title}</h2>
                  {p.offer?.location && (
                    <p className="location">
                      {p.offer?.location?.city}, {p.offer?.location?.country}
                    </p>
                  )}
                </IonLabel>
                <IonNote slot="end" color="success">
                  Aceptado
                </IonNote>
              </IonItem>
              ) : null
            ))}
          </IonList>
        )}
      </IonContent>

    </IonPage>
  );
};

export default NotificationsPage;
