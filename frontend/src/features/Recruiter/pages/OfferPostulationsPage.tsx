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
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import {
  getOfferPostulations,
  updatePostulationStatus,
} from "../../../shared/services/recruiterService";

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

  // Cargar postulaciones al montar el componente
  useEffect(() => {
    const loadPostulations = async () => {
      try {
        const response = await getOfferPostulations(Number(offerId));
        setPostulations(response.data); // asegúrate de usar la forma correcta según tu API
      } catch (err) {
        console.error("Error al obtener postulaciones:", err);
        setToastMessage("No se pudieron cargar las postulaciones.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPostulations();
  }, [offerId]);

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

  const renderPostulation = (p: Postulation) => (
    <IonItem key={p.id}>
      <IonLabel>
        <h2>{p.candidate.name}</h2>
        <p>{p.candidate.email}</p>
        <small>Estado: {p.status}</small>
      </IonLabel>

      {p.status === "pending" && (
        <IonButtons slot="end">
          <IonButton color="success" onClick={() => handleStatusChange(p.id, "accepted")}>
            Aceptar
          </IonButton>
          <IonButton color="danger" onClick={() => handleStatusChange(p.id, "rejected")}>
            Rechazar
          </IonButton>
        </IonButtons>
      )}
    </IonItem>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Postulaciones</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Volver</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {isLoading ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="dots" />
          </div>
        ) : postulations.length === 0 ? (
          <p className="ion-text-center ion-padding">No hay postulaciones disponibles.</p>
        ) : (
          <IonList>{postulations.map(renderPostulation)}</IonList>
        )}

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage || ""}
          duration={2000}
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
}
