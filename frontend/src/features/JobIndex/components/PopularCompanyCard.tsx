import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/react';
import '../styles/PopularCompanyCard.css';

const PopularCompanyCard = () => {
  return (
    <IonCard className='popular-company-card' button={true}>
      <IonCardHeader className='popular-company-card__header'>
        <div className="logo-container">
          <img 
            className='logo' 
            src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" 
            alt="Google logo" 
          />
        </div>
        <p className='company-name'>Google</p>
      </IonCardHeader>
      <IonCardContent className='popular-company-card__job'>
        <IonCardTitle className='job__title'>Lead Product Manager</IonCardTitle>
        <IonCardSubtitle className="job__info">
          $2500/m <span className='job__info--ubication'>Toronto, Canada</span>
        </IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};

export default PopularCompanyCard;