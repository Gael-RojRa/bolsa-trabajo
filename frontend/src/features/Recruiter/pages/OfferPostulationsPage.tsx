import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonSpinner,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonAvatar,
  IonChip,
  IonRefresher,
  IonRefresherContent,
  IonItemDivider,
  IonText,
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
      <IonItem key={p.id} lines="full" className="postulation-item">
        {/* Avatar */}
        <IonAvatar slot="start">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: '#e0e0e0', borderRadius: '50%' }}>
            <IonIcon icon={personOutline} />
          </div>
        </IonAvatar>

        {/* Nombre y correo */}
        <IonLabel className="ion-text-wrap">
          <h2 style={{ margin: 0, fontSize: '1rem' }}>{p.candidate.name}</h2>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>
            <IonIcon icon={mailOutline} /> {p.candidate.email}
          </p>
        </IonLabel>

        {/* Estado */}
        <IonChip slot="end" color={color as any} style={{ marginInlineEnd: '8px' }}>
          <IonIcon icon={icon} />
          <IonLabel>{text}</IonLabel>
        </IonChip>

        {/* Acciones */}
        {p.status === 'pending' && (
          <div slot="end" style={{ display: 'flex', gap: 4 }}>
            <IonButton size="small" color="success" fill="outline" onClick={() => handleStatusChange(p.id, 'accepted')}>
              <IonIcon slot="start" icon={checkmarkCircleOutline} />
              Aceptar
            </IonButton>
            <IonButton size="small" color="danger" fill="outline" onClick={() => handleStatusChange(p.id, 'rejected')}>
              <IonIcon slot="start" icon={closeCircleOutline} />
              Rechazar
            </IonButton>
          </div>
        )}
      </IonItem>
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
