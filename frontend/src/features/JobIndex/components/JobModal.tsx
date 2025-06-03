import {
  IonModal,
  IonButton,
  IonContent,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentContent,
  IonSegmentView,
} from '@ionic/react';
import React from 'react';
import JobOffer from '../../../interface/JobOffer';
import '../styles/JobModal.css';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobOffer: JobOffer;
}


const JobModal = ({ isOpen, onClose, jobOffer }: JobModalProps) => {


  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.8, 1]}
      initialBreakpoint={0.8}
      handleBehavior="cycle"
    >

      <IonContent className="content ion-padding">

        <div className="general-info">
          <div className="logo-container--modal">
            <img src={jobOffer.company.logo} alt="logo" />
          </div>
          <IonTitle className='job-title'>{jobOffer.title}</IonTitle>
          <IonTitle className='company-info'> {jobOffer.company.name} - <span className='job-location'> {jobOffer.location} </span></IonTitle>
        </div>

        <IonSegment value='default' className='job-segment' mode='ios' color={'light'}>
          <IonSegmentButton value='default' contentId='default'>
            <IonLabel> Descripción </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='company' contentId='company'>
            <IonLabel> Compañía </IonLabel>
          </IonSegmentButton>

        </IonSegment>

        <IonSegmentView className='segment-view'>
          <IonSegmentContent id='default'>
            <p> {jobOffer.description} </p>

            <div style={{ marginTop: '1rem' }}>
              <h4>Aptitudes Esperadas</h4>
              {jobOffer.skills.map((skill, index) => (
                <IonButton key={index} size="small" color="medium">{skill}</IonButton>
              ))}
            </div>
          </IonSegmentContent>
          <IonSegmentContent id='company'>
            <p> {jobOffer.company.name} es una empresa líder en su sector, dedicada a ofrecer soluciones innovadoras y de alta calidad. </p>
            <p>Ubicación: {jobOffer.location}</p>
            <p>Visita su sitio web para más información.</p>
          </IonSegmentContent>
        </IonSegmentView>
        <IonButton expand="block" onClick={onClose} className="apply-button">
          Aplicar Ahora
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default JobModal;
