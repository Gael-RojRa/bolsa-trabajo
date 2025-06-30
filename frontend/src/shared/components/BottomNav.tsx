import { IonFooter, IonToolbar, IonButton, IonIcon, IonLabel } from '@ionic/react';
import './BottomNav.css';
import { briefcaseOutline, notificationsOutline, personOutline } from 'ionicons/icons';

/**
 * Reusable bottom navigation bar for postulante views.
 */
const BottomNav: React.FC = () => (
  <IonFooter className="bottom-nav">
    <IonToolbar className="bottom-nav__toolbar">
      <IonButton className="bottom-nav__button" fill="clear" routerLink="/jobs" routerDirection="root">
        <IonIcon icon={briefcaseOutline} />
        <IonLabel>Explorar</IonLabel>
      </IonButton>
      <IonButton className="bottom-nav__button" fill="clear" routerLink="/notifications" routerDirection="root">
        <IonIcon icon={notificationsOutline} />
        <IonLabel>Notificaciones</IonLabel>
      </IonButton>
      <IonButton className="bottom-nav__button" fill="clear" routerLink="/profile" routerDirection="root">
        <IonIcon icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonButton>
    </IonToolbar>
  </IonFooter>
);

export default BottomNav;
