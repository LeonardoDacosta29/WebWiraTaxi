import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS


createApp(App).use(router).mount("#app");
