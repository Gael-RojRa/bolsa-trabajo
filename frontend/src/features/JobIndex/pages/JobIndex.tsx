import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { IonHeader, IonToolbar, IonSearchbar, IonLabel, IonIcon, IonTabBar, IonTabButton } from '@ionic/react';
import { briefcaseOutline, personOutline } from 'ionicons/icons';
import JobCard from '../components/JobCard';
import PopularCompanyCard from '../components/PopularCompanyCard';
import '../styles/JobIndex.css';
import { OfferSimple } from '../../../../shared/interface/offer';
import { getOffers } from '../services/offerService';


const JobIndex = () => {

  const [offers, setOffers] = useState<OfferSimple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getOffers();
        setOffers(offersData);
        console.log("Offers fetched successfully EFFECT:", offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

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
              {offers.map((offer, index) => (
                <JobCard key={index} offer={offer} />
              ))}
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
        <IonTabButton tab="employerOffers" href="/employer/offers">
+          <IonIcon icon={briefcaseOutline} />
+          <IonLabel>Mis ofertas</IonLabel>
+        </IonTabButton>
      </IonTabBar>
    </IonPage>
  )
}
export default JobIndex;