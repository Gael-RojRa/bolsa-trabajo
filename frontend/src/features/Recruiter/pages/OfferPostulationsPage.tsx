import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonLabel, IonButton, IonButtons, IonToast,
    useIonViewWillEnter, IonSpinner
  } from '@ionic/react';
  import { useParams, useHistory } from 'react-router';
  import { useState } from 'react';
  import {
    getOfferPostulations,
    updatePostulationStatus
  } from "../../../shared/services/recruiterService";
  
  interface Postulation {
    id: number;
    status: 'pending' | 'accepted' | 'rejected';
    user: { name: string; email: string };
  }
  
  export default function OfferPostulationsPage() {
    const { id } = useParams<{ id: string }>();        // offerId
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [postulations, setPostulations] = useState<Postulation[]>([]);
    const [toast, setToast] = useState('');
  
    useIonViewWillEnter(async () => {
      try {
        const { data } = await getOfferPostulations(Number(id));
        setPostulations(data);
      } finally {
        setLoading(false);
      }
    });
  
    const decide = async (pid: number, status: 'accepted' | 'rejected') => {
      await updatePostulationStatus(pid, status);
      setPostulations(p =>
        p.map(x => (x.id === pid ? { ...x, status } : x))
      );
      setToast(`Postulación ${status === 'accepted' ? 'aceptada' : 'rechazada'}`);
    };
  
    if (loading) return <IonSpinner className="ion-padding" />;
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}>Volver</IonButton>
            </IonButtons>
            <IonTitle>Postulaciones</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent>
          {postulations.length === 0 && (
            <p className="ion-text-center ion-padding">Sin postulaciones.</p>
          )}
          <IonList>
            {postulations.map(p => (
              <IonItem key={p.id}>
                <IonLabel>
                  <h2>{p.user.name}</h2>
                  <p>{p.user.email}</p>
                  <small>Estado: {p.status}</small>
                </IonLabel>
  
                {p.status === 'pending' && (
                  <IonButtons slot="end">
                    <IonButton
                      color="success"
                      onClick={() => decide(p.id, 'accepted')}
                    >
                      Aceptar
                    </IonButton>
                    <IonButton
                      color="danger"
                      onClick={() => decide(p.id, 'rejected')}
                    >
                      Rechazar
                    </IonButton>
                  </IonButtons>
                )}
              </IonItem>
            ))}
          </IonList>
  
          <IonToast
            isOpen={!!toast}
            message={toast}
            duration={2000}
            onDidDismiss={() => setToast('')}
          />
        </IonContent>
      </IonPage>
    );
  }
  