import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./features/Auth/pages/LoginPage";
import RegisterPage from "./features/Auth/pages/RegisterPage";
import Welcome from "./features/Welcome/pages/Welcome";
import JobIndex from "./features/JobIndex/pages/JobIndex";
import OfferDetailsPage from "./features/JobIndex/pages/OfferDetailsPage";
import { briefcaseOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import NotificationsPage from "./features/Notifications/pages/NotificationsPage";
import EmployerOffersPage from "./features/Recruiter/pages/EmployerOffersPage";
import OfferPostulationsPage from "./features/Recruiter/pages/OfferPostulationsPage";

setupIonicReact();

/* css core */
import "@ionic/react/css/core.css";

/* css basico */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* css utilitarios */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* variables de tema */
import "./theme/variables.css";

import usePushRegistration from "./shared/usePushRegistration";

setupIonicReact();

const App: React.FC = () => {
  const applicantTabRegex = /^\/(jobs|notifications|offers|profile)/;
  const recruiterTabRegex = /^\/employer/;
  const showApplicantTabs = applicantTabRegex.test(window.location.pathname);
  const showRecruiterTabs = recruiterTabRegex.test(window.location.pathname);
  const isRecruiter = showRecruiterTabs;
  usePushRegistration();
  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/employer/offers" component={EmployerOffersPage} />
        <Route
          exact
          path="/employer/offers/:id"
          component={OfferPostulationsPage}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/jobs" component={JobIndex} />
        <Route exact path="/notifications" component={NotificationsPage} />
        <Route exact path="/offers/:id" component={OfferDetailsPage} />
      </IonRouterOutlet>
        {(showApplicantTabs || showRecruiterTabs) && (
        <IonTabBar slot="bottom">
          {showApplicantTabs && (
            <IonTabButton tab="jobs" href="/jobs">
              <IonIcon icon={briefcaseOutline} />
              <IonLabel>Explorar</IonLabel>
            </IonTabButton>
          )}

          {showRecruiterTabs && (
            <IonTabButton tab="offers" href="/employer/offers">
              <IonIcon icon={briefcaseOutline} />
              <IonLabel>Ofertas</IonLabel>
            </IonTabButton>
          )}

          {showApplicantTabs && (
            <IonTabButton tab="notifications" href="/notifications">
              <IonIcon icon={notificationsOutline} />
              <IonLabel>Notificaciones</IonLabel>
            </IonTabButton>
          )}

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
        )}
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

};

export default App;

