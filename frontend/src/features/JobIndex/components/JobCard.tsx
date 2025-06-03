import { IonCard, IonCardSubtitle, IonTitle } from '@ionic/react';
import '../styles/JobCard.css';
import React, { useState } from 'react';
import JobModal from './JobModal';
import JobOffer from '../../../interface/JobOffer';

interface JobCardProps {
  jobOffer: JobOffer;
}



const JobCard = ({ jobOffer }: JobCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      <IonCard key={jobOffer.id} onClick={() => setModalOpen(true)} className="job-card">
        <div className="logo-container">
          <img src={ jobOffer.company.logo} alt="logo" width="30" />
        </div>
        <IonTitle className="job">
          <h2 className="job__title">{jobOffer.title}</h2>
          <p className="job__time">{jobOffer.workingHours}</p>
        </IonTitle>
        <IonCardSubtitle className='salary__text'>~${jobOffer.salary}/m</IonCardSubtitle>
      </IonCard>

      <JobModal isOpen={modalOpen} onClose={() => setModalOpen(false)} jobOffer={jobOffer}/></>

  );
};
export default JobCard;
