import { IonCard, IonCardSubtitle, IonTitle } from '@ionic/react';
import '../styles/JobCard.css';

interface JobCardProps {
  jobOffer: JobOffer;
}

const JobCard = ({ jobOffer }: JobCardProps) => {


  return (
    <IonCard key={jobOffer.id} className="job-card">
      <div className="logo-container">
        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="logo" width="30" />
      </div>
        <IonTitle className="job">
          <h2 className="job__title">{jobOffer.title}</h2>
          <p className="job__time">{jobOffer.workingHours}</p>
        </IonTitle>
        <IonCardSubtitle className='salary__text'>~${jobOffer.salary}/m</IonCardSubtitle>
    </IonCard>
  );
};
export default JobCard;
