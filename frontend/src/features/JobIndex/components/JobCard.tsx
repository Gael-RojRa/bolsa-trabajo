import { IonCard, IonCardSubtitle, IonTitle } from "@ionic/react";
import "../styles/JobCard.css";
import React, { useState } from "react";
import JobModal from "./JobModal";
import { OfferSimple } from "../../../../shared/interface/offer";

interface Props {
  offer: OfferSimple;
}

const JobCard = ({ offer }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <IonCard
        onClick={() => setModalOpen(true)}
        className="job-card"
        button={true}
      >
        <div className="logo-container">
          <img 
            src={offer.company_logo} 
            alt="logo" 
            className="company-logo" 
          />
        </div>
        <IonTitle className="job">
          <h2 className="job__title">{offer.title}</h2>
          <p className="job__time">{offer.workingHours}</p>
        </IonTitle>
        <IonCardSubtitle className="company-name">
          {offer.company_name}
        </IonCardSubtitle>
        <IonCardSubtitle className="salary__text">
          ${offer.salary}/mes
        </IonCardSubtitle>
      </IonCard>

      <JobModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        OfferId={offer.id}
      />
    </>
  );
};

export default JobCard;
