import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonToast,
  } from '@ionic/react';
  import { useParams } from 'react-router';
  import { useEffect, useState } from 'react';
  import { getOffer, acceptOffer, rejectOffer, Offer } from '../api/offer';
  
  const OfferDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [offer, setOffer] = useState<Offer | null>(null);
    const [toast, setToast] = useState<{ show: boolean; message: string }>({
      show: false,
      message: '',
    });
  
    useEffect(() => {
      getOffer(Number(id)).then(setOffer);
    }, [id]);
  
    const handleAction = async (type: 'accept' | 'reject') => {
      if (!offer) return;
      await (type === 'accept' ? acceptOffer(offer.id) : rejectOffer(offer.id));
      setToast({ show: true, message: `Oferta ${type === 'accept' ? 'aceptada' : 'rechazada'}` });
      setOffer({ ...offer, status: type === 'accept' ? 'accepted' : 'rejected' });
    };
  
    if (!offer) return null;
  
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/offers" />
            </IonButtons>
            <IonTitle>{offer.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{offer.company_name}</IonCardTitle>
              <p>{offer.location}</p>
            </IonCardHeader>
            <IonCardContent>
              <p>{offer.description}</p>
              {offer.salary && <p>Salario aproximado: ₡{offer.salary.toLocaleString()}</p>}
              <p>Estado: {offer.status}</p>
  
              {offer.status === 'open' && (
                <>
                  <IonButton expand="block" color="success" onClick={() => handleAction('accept')}>
                    Aceptar
                  </IonButton>
                  <IonButton expand="block" color="danger" onClick={() => handleAction('reject')}>
                    Rechazar
                  </IonButton>
                </>
              )}
            </IonCardContent>
          </IonCard>
          <IonToast
            isOpen={toast.show}
            message={toast.message}
            duration={2000}
            onDidDismiss={() => setToast({ show: false, message: '' })}
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default OfferDetail;
  