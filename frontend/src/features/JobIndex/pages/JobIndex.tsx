import React from 'react';
import { IonPage, IonGrid, IonContent } from '@ionic/react';
import { IonHeader, IonToolbar, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonIcon, IonTabBar, IonTabButton, IonCol, IonRow } from '@ionic/react';
import { briefcaseOutline, personOutline } from 'ionicons/icons';
import JobCard from '../components/JobCard';
import PopularCompanyCard from '../components/PopularCompanyCard';
import '../styles/JobIndex.css';

const JobIndex = () => {

  const job = {
    id: 1,
    title: 'Desarrollador Front-end',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    workingHours: 'Tiempo completo',
    salary: 1500
  }

  return (
    <IonPage>
      {/* Header con buscador */}
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonSearchbar placeholder="Buscar..." />
        </IonToolbar>
      </IonHeader>

      {/* Contenido principal */}
      <IonContent fullscreen>
        <div className="padding">

          <div className="popular-companies">
            <h2>Empresas Populares</h2>
            <div className="popular-companies__grid">
              <PopularCompanyCard />
              <PopularCompanyCard />
              <PopularCompanyCard />
            </div>
          </div>

          <div className="offers">
            <h2>Ofertas Recientes</h2>
            <div className="offers__grid">
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
              <JobCard jobOffer={job} />
            </div>
          </div>
        </div>
      </IonContent>

      {/* TabBar de navegación */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="explore" href="/jobs">
          <IonIcon icon={briefcaseOutline} />
          <IonLabel>Explore</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  )
}
export default JobIndex;