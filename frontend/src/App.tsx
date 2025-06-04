import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./features/Auth/pages/LoginPage";
import RegisterPage from "./features/Auth/pages/RegisterPage";
import Welcome from "./features/Welcome/pages/Welcome";
import JobIndex from "./features/JobIndex/pages/JobIndex";
import EmployerOffersPage from "./features/Recruiter/pages/EmployerOffersPage";
import OfferPostulationsPage from "./features/Recruiter/pages/OfferPostulationsPage";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { briefcaseOutline, personOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
