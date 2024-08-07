import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS
import 'bootstrap-icons/font/bootstrap-icons.css';


createApp(App).use(router).mount("#app");
