import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS
import 'bootstrap-icons/font/bootstrap-icons.css';


import AdminDashboard from './components/Dashboard.vue';
import ProfileSettings from './components/ProfileSettings.vue';

const routes = [
  { path: '/', component: AdminDashboard },
  { path: '/profile', component: ProfileSettings }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
createApp(App).use(router).mount("#app");
