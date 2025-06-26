import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  IonItemDivider,
  IonFab,
  IonFabButton,
  IonToast
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getMyOffers } from '../../../shared/services/recruiterService';
import { briefcaseOutline, peopleOutline, addOutline } from 'ionicons/icons';
import CreateOfferForm from '../components/CreateOfferForm';

interface Offer {
  id: number;
  title: string;
  postulations_count: number;
}

const EmployerOffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const res = await getMyOffers();
      setOffers(res.data.data);
    } catch (error) {
      console.error('Error cargando ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent) => {
    loadOffers().then(() => {
      event.detail.complete();
    });
  };

  const handleCreateSuccess = () => {
    loadOffers();
    setToastMessage('¡Oferta creada exitosamente!');
    setShowToast(true);
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Ofertas de Empleo</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <div className="ion-padding-vertical">
          <div className="ion-text-center ion-padding-bottom">
            <h2 className="ion-no-margin">
              <IonIcon 
                icon={briefcaseOutline} 
                style={{ fontSize: '1.2rem', verticalAlign: 'middle', marginRight: '8px' }} 
              />
              Panel de Reclutamiento
            </h2>
            <p className="ion-padding-horizontal ion-text-center ion-text-muted">
              Gestiona tus ofertas de empleo y revisa las postulaciones de candidatos.
            </p>
          </div>

          <IonItemDivider color="light">Ofertas Publicadas ({offers.length})</IonItemDivider>
          
          {loading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner name="circles" />
              <p>Cargando tus ofertas...</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="ion-text-center ion-padding">
              <p>No tienes ofertas publicadas actualmente.</p>
              <IonButton onClick={openCreateForm}>
                Crear tu primera oferta
              </IonButton>
            </div>
          ) : (
            <div className="offer-cards ion-padding-top">
              {offers.map(offer => (
                <IonCard key={offer.id} onClick={() => history.push(`/employer/offers/${offer.id}`)} button className="offer-card">
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonBadge color="medium">{offer.postulations_count} postulaciones</IonBadge>
                    </IonCardSubtitle>
                    <div className="ion-padding-top">
                      <h2>{offer.title}</h2>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="ion-text-end">
                      <IonIcon icon={peopleOutline} /> {offer.postulations_count} candidatos
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        {/* Botón flotante para crear nueva oferta */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={openCreateForm}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        
        {/* Formulario de creación de ofertas */}
        <CreateOfferForm 
          isOpen={showCreateForm} 
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleCreateSuccess}
        />
        
        {/* Toast para mostrar mensajes */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

// Definición del botón fuera del componente
const IonButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button 
    onClick={onClick}
    style={{
      background: '#3880ff',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '10px 0'
    }}
  >
    {children}
  </button>
);

export default EmployerOffersPage;
