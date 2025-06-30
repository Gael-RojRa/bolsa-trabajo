import { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { useParams } from 'react-router';
import {
  briefcaseOutline,
  cashOutline,
  timeOutline,
  listOutline,
  locationOutline,
} from 'ionicons/icons';
import axiosInstance from '../../../shared/api/axiosInstance';

interface Params {
  id: string;
}

interface OfferLocation {
  city: string;
  country: string;
}

interface Offer {
  id: number;
  title: string;
  description?: string;
  salary?: string;
  working_hours?: string;
  requirements?: string;
  location?: OfferLocation;
}

const OfferDetailsPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // obtener detalles de la oferta
    const fetchOffer = async () => {
      try {
        const res = await axiosInstance.get(`/offers/${id}`);
        // el backend devuelve {data: {...}} – me quedo con data interno si existe
        const info = res.data?.data || res.data;
        setOffer(info);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la oferta');
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/notifications" />
          </IonButtons>
          <IonTitle>Detalle de Oferta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <IonSpinner />
          </div>
        ) : error ? (
          <p className="ion-text-center">{error}</p>
        ) : offer ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{offer.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {offer.requirements && (
                <IonItem lines="none">
                  <IonIcon slot="start" icon={listOutline} color="medium" />
                  <IonLabel>Requisitos: {offer.requirements}</IonLabel>
                </IonItem>
              )}

              {offer.description && (
                <IonItem lines="none">
                  <IonIcon slot="start" icon={briefcaseOutline} color="medium" />
                  <IonLabel>{offer.description}</IonLabel>
                </IonItem>
              )}
              {offer.salary && (
                <IonItem lines="none">
                  <IonIcon slot="start" icon={cashOutline} color="medium" />
                  <IonLabel>Salario: {offer.salary}</IonLabel>
                </IonItem>
              )}
              {offer.working_hours && (
                <IonItem lines="none">
                  <IonIcon slot="start" icon={timeOutline} color="medium" />
                  <IonLabel>Jornada: {offer.working_hours}</IonLabel>
                </IonItem>
              )}
              {offer.location && (
                <IonItem lines="none">
                  <IonIcon slot="start" icon={locationOutline} color="medium" />
                  <IonLabel>
                    {offer.location.city}, {offer.location.country}
                  </IonLabel>
                </IonItem>
              )}
            </IonCardContent>
          </IonCard>
        ) : (
          <p className="ion-text-center">Oferta no encontrada</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OfferDetailsPage;
