import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonSpinner,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonItemDivider,
  IonAvatar,
  IonChip,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import {
  getOfferPostulations,
  updatePostulationStatus,
} from "../../../shared/services/recruiterService";
import { checkmarkCircleOutline, closeCircleOutline, timeOutline, mailOutline, personOutline } from 'ionicons/icons';

type PostulationStatus = "pending" | "accepted" | "rejected";

interface Candidate {
  name: string;
  email: string;
}

interface Postulation {
  id: number;
  status: PostulationStatus;
  candidate: Candidate;
}

export default function OfferPostulationsPage() {
  const { id: offerId } = useParams<{ id: string }>();
  const history = useHistory();

  const [postulations, setPostulations] = useState<Postulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [offerTitle, setOfferTitle] = useState<string>("Oferta de Trabajo"); // Título por defecto

  // Cargar postulaciones al montar el componente
  useEffect(() => {
    loadPostulations();
  }, [offerId]);

  const loadPostulations = async () => {
    setIsLoading(true);
    try {
      const response = await getOfferPostulations(Number(offerId));
      setPostulations(response.data); // asegúrate de usar la forma correcta según tu API
      
      // Aquí también podrías cargar el título de la oferta si la API lo devuelve
      // setOfferTitle(response.data.offerTitle);
    } catch (err) {
      console.error("Error al obtener postulaciones:", err);
      setToastMessage("No se pudieron cargar las postulaciones.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent) => {
    loadPostulations().then(() => {
      event.detail.complete();
    });
  };

  // Cambiar el estado de una postulación
  const handleStatusChange = async (postulationId: number, newStatus: PostulationStatus) => {
    try {
      await updatePostulationStatus(postulationId, newStatus as "accepted" | "rejected");
      setPostulations((prev) =>
        prev.map((p) =>
          p.id === postulationId ? { ...p, status: newStatus } : p
        )
      );
      setToastMessage(`Postulación ${newStatus === "accepted" ? "aceptada" : "rechazada"}`);
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setToastMessage("No se pudo actualizar la postulación.");
    }
  };

  // Obtener el ícono y color según el estado
  const getStatusDetails = (status: PostulationStatus) => {
    switch (status) {
      case 'accepted':
        return { icon: checkmarkCircleOutline, color: 'success', text: 'Aceptada' };
      case 'rejected':
        return { icon: closeCircleOutline, color: 'danger', text: 'Rechazada' };
      default:
        return { icon: timeOutline, color: 'warning', text: 'Pendiente' };
    }
  };

  const renderPostulation = (p: Postulation) => {
    const { icon, color, text } = getStatusDetails(p.status);
    
    return (
      <IonCard key={p.id} className="candidate-card ion-margin-bottom">
        <IonCardHeader>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="2">
                <IonAvatar className="candidate-avatar">
                  <div style={{ 
                    backgroundColor: '#e0e0e0', 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <IonIcon icon={personOutline} />
                  </div>
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonCardTitle>{p.candidate.name}</IonCardTitle>
                <div className="candidate-email">
                  <IonIcon icon={mailOutline} size="small" /> {p.candidate.email}
                </div>
              </IonCol>
              <IonCol size="3" className="ion-text-end">
                <IonChip color={color as any}>
                  <IonIcon icon={icon} />
                  <IonLabel>{text}</IonLabel>
                </IonChip>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>

        <IonCardContent>
          <div className="ion-padding-top">
            {p.status === "pending" && (
              <div className="ion-text-end">
                <IonButton 
                  color="success" 
                  onClick={() => handleStatusChange(p.id, "accepted")}
                  fill="outline"
                  size="small"
                  className="ion-margin-end">
                  <IonIcon slot="start" icon={checkmarkCircleOutline} />
                  Aceptar
                </IonButton>
                <IonButton 
                  color="danger" 
                  onClick={() => handleStatusChange(p.id, "rejected")}
                  fill="outline"
                  size="small">
                  <IonIcon slot="start" icon={closeCircleOutline} />
                  Rechazar
                </IonButton>
              </div>
            )}
          </div>
        </IonCardContent>
      </IonCard>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/employer/offers" text="Volver" />
          </IonButtons>
          <IonTitle>Postulaciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="ion-padding-bottom ion-text-center">
          <h2>{offerTitle}</h2>
          <p className="ion-padding-horizontal ion-text-muted">
            Gestiona las postulaciones para esta oferta de empleo
          </p>
        </div>

        <IonItemDivider color="light" sticky>
          Postulaciones ({postulations.length})
        </IonItemDivider>

        {isLoading ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="circles" />
            <p>Cargando postulaciones...</p>
          </div>
        ) : postulations.length === 0 ? (
          <div className="ion-padding ion-text-center">
            <IonText color="medium">
              <h5>No hay postulaciones disponibles</h5>
              <p>Cuando los candidatos se postulen a esta oferta, aparecerán aquí.</p>
            </IonText>
          </div>
        ) : (
          <div className="ion-padding-top">
            {postulations.map(renderPostulation)}
          </div>
        )}

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage || ""}
          duration={2000}
          color="success"
          position="bottom"
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
}
