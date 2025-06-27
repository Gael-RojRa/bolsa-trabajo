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
  IonToast,
  IonButton as IonicButton,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getMyOffers, getFinishedOffers, finishOffer } from '../../../shared/services/recruiterService';
import { briefcaseOutline, peopleOutline, addOutline, createOutline } from 'ionicons/icons';
import CreateOfferForm from '../components/CreateOfferForm';
import EditOfferForm from '../components/EditOfferForm';

interface Offer {
  id: number;
  title: string;
  postulations_count: number;
}

const EmployerOffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [segment, setSegment] = useState<'published'|'finished'>('published');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async (type: 'published' | 'finished' = 'published') => {
    setLoading(true);
    try {
      const res = type==='published' ? await getMyOffers() : await getFinishedOffers();
      setOffers(res.data.data);
    } catch (error) {
      console.error('Error cargando ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent) => {
    loadOffers(segment).then(() => {
      event.detail.complete();
    });
  };

  const handleSegmentChange = (value: 'published'|'finished') => {
    setSegment(value);
    loadOffers(value);
  };

  const handleCreateSuccess = () => {
    loadOffers();
    setToastMessage('¡Oferta creada exitosamente!');
    setShowToast(true);
  };

  const handleEditSuccess = () => {
    loadOffers();
    setToastMessage('¡Oferta actualizada exitosamente!');
    setShowToast(true);
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  const finalizeOffer = async (id:number, e:React.MouseEvent) => {
    e.stopPropagation();
    await finishOffer(id);
    loadOffers(segment);
    setToastMessage('Oferta marcada como finalizada');
    setShowToast(true);
  };

  const openEditForm = (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Detener la propagación para evitar ir a la vista de postulaciones
    setSelectedOfferId(id);
    setShowEditForm(true);
  };
  
  const handleCardClick = (id: number) => {
    history.push(`/employer/offers/${id}`);
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

          <IonSegment value={segment} onIonChange={e=>handleSegmentChange(e.detail.value as any)}>
            <IonSegmentButton value="published">Publicadas</IonSegmentButton>
            <IonSegmentButton value="finished">Finalizadas</IonSegmentButton>
          </IonSegment>

          <IonItemDivider color="light">{segment==='published'? 'Ofertas Publicadas' : 'Ofertas Finalizadas'} ({offers.length})</IonItemDivider>
          
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
              <style>{
                `.offer-card { 
                  margin-bottom: 8px !important; 
                  max-width: 650px !important; 
                  margin-left: auto !important; 
                  margin-right: auto !important; 
                  box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
                }`
              }</style>
              
              {offers.map(offer => (
                <div className="offer-card" key={offer.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 15px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderLeft: '4px solid #3880ff',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  width: '100%',
                  maxWidth: '650px'
                }}>
                  <div 
                    onClick={() => handleCardClick(offer.id)}
                    style={{
                      flex: '1',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{offer.title}</span>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#3880ff', fontSize: '13px', fontWeight: 500 }}>
                      <IonIcon icon={peopleOutline} style={{ marginRight: '4px', fontSize: '16px' }} /> 
                      <span>{offer.postulations_count}</span>
                    </div>
                  </div>
                  {segment==='published' && (
                    <button 
                      onClick={(e) => finalizeOffer(offer.id, e)}
                      style={{
                        background: 'green',
                        border: 'none',
                        color: 'white',
                        padding: '8px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}>Finalizar</button>
                  )}
                  {segment==='published' && (
                    <button
                      onClick={(e) => openEditForm(offer.id, e)}
                      style={{
                        background: '#3880ff',
                        border: 'none',
                        color: 'white',
                        padding: '8px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        minWidth: '32px',
                        minHeight: '32px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      <IonIcon icon={createOutline} style={{ fontSize: '16px' }} />
                    </button>
                  )}
                </div>
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
        
        {/* Formulario de edición de ofertas */}
        <EditOfferForm 
          isOpen={showEditForm} 
          offerId={selectedOfferId}
          onClose={() => setShowEditForm(false)}
          onSuccess={handleEditSuccess}
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
