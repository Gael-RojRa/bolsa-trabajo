import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { IonHeader, IonToolbar, IonSearchbar, IonLabel, IonIcon, IonTabBar, IonTabButton } from '@ionic/react';
import { briefcaseOutline, personOutline } from 'ionicons/icons';
import JobCard from '../components/JobCard';
import PopularCompanyCard from '../components/PopularCompanyCard';
import '../styles/JobIndex.css';

const JobIndex = () => {

  const job = {
    id: 1,
    title: 'Desarrollador Front-end',
    workingHours: 'Tiempo completo',
    salary: 1500,
    description: 'Buscamos un desarrollador front-end con experiencia en React para unirse a nuestro equipo.',
    location: 'Madrid, España',
    skills: ['React', 'JavaScript', 'CSS'],
    company: {
      id: 1,
      name: 'Google',
      logo: 'https://www.svgrepo.com/show/303108/google-icon-logo.svg'
    }
  }

  const job2 = {
    id: 2,
    title: 'Desarrollador Back-end',
    workingHours: 'Medio tiempo',
    salary: 1200,
    description: 'Buscamos un desarrollador back-end con experiencia en Node.js para unirse a nuestro equipo.',
    location: 'Barcelona, España',
    skills: ['Node.js', 'Express', 'MongoDB'],
    company: {
      id: 2,
      name: 'Facebook',
      logo: 'https://www.facebook.com/images/fb_icon_325x325.png'
    }
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
              <JobCard jobOffer={job2} />
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