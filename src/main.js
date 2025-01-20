import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import FontAwesomeIcon from './font-awesome'; // Importa sua configuração
import '@fortawesome/fontawesome-svg-core/styles.css';

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
appInstance.component('font-awesome-icon', FontAwesomeIcon); 
