import {
  IonModal,
  IonButton,
  IonContent,
  IonTitle,
  IonSegment,
  IonSegmentView,
  IonSegmentContent,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "../styles/JobModal.css";
import { OfferDetail } from "../../../../shared/interface/offer";
import { getOfferDetail, applyToOffer } from "../services/offerService";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  OfferId: number;
}

const fetchOfferDetail = async (id: number) => {
  try {
    const offerDetail = await getOfferDetail(id);
    console.log("Offer detail fetched:", offerDetail);
    return offerDetail;
  } catch (error) {
    console.error("Error fetching offer detail:", error);
    throw error;
  }
};

const JobModal = ({ isOpen, onClose, OfferId }: JobModalProps) => {
  const [loading, setLoading] = useState(true);
  const [offerDetail, setOfferDetail] = useState<OfferDetail | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Resetear estados cuando el modal se abre
    if (isOpen) {
      setLoading(true);
      setOfferDetail(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return; // No cargar si el modal está cerrado

    const loadOfferDetail = async () => {
      try {
        const detail = await fetchOfferDetail(OfferId);
        setHasApplied(detail.has_applied);
        setOfferDetail(detail.data);
      } catch (error) {
        console.error(error);
        setOfferDetail(null);
      } finally {
        setLoading(false);
      }
    };

    loadOfferDetail();
  }, [OfferId, isOpen]); // Agregar isOpen como dependencia

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.64, 1]}
      initialBreakpoint={0.64}
      handleBehavior="cycle"
    >
      <IonContent className="content ion-padding">
        {loading ? (
          <p>Cargando detalles de la oferta...</p>
        ) : offerDetail ? (
          <>
            <div className="general-info">
              <div className="logo-container--modal">
                <img src={offerDetail.company.logo} alt="logo" />
              </div>
              <IonTitle className="job-title">{offerDetail.title}</IonTitle>
              <IonTitle className="company-info">
                {offerDetail.company.name} -{" "}
                <span className="job-location">
                  {offerDetail.location.country} {offerDetail.location.city}
                </span>
              </IonTitle>
            </div>

            <IonSegment
              value="default"
              className="job-segment"
              mode="ios"
              color={"light"}
            >
              <IonSegmentButton value="default" contentId="default">
                <IonLabel> Descripción </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="company" contentId="company">
                <IonLabel> Compañía </IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <IonSegmentView className="segment-view">
              <IonSegmentContent id="default">
                <p> {offerDetail.description} </p>

                <div style={{ marginTop: "1rem" }}>
                  <h4>Aptitudes Esperadas</h4>
                  {offerDetail.skills.map((skill, index) => (
                    <IonButton
                      className="button--skill"
                      key={index}
                      size="small"
                      color="medium"
                    >
                      {skill}
                    </IonButton>
                  ))}
                </div>
              </IonSegmentContent>
              <IonSegmentContent id="company">
                <p>
                  {" "}
                  {offerDetail.company.name} es una empresa líder en su sector,
                  dedicada a ofrecer soluciones innovadoras y de alta calidad.{" "}
                </p>
                <p>
                  Ubicación: {offerDetail.location.city}{" "}
                  {offerDetail.location.country}
                </p>
                <p>Visita su sitio web para más información.</p>
              </IonSegmentContent>
            </IonSegmentView>
          </>
        ) : (
          <p>Error al cargar los detalles de la oferta.</p>
        )}

        {!loading && offerDetail && (
          <IonButton
            className="button__apply"
            expand="block"
            disabled={hasApplied}
            color={hasApplied ? "medium" : "primary"}
            onClick={async () => {
              try {
                await applyToOffer(offerDetail.id);
                setHasApplied(true);
              } catch (error) {
                console.error("Error al aplicar:", error);
              }
            }}
          >
            {hasApplied ? "YA APLICASTE" : "Aplicar"}
          </IonButton>
        )}
      </IonContent>
    </IonModal>
  );
};

export default JobModal;