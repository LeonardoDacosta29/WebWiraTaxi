import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import DriverDashboardView from '../views/DriverDashboardView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboardView },
  { path: '/driver-dashboard', name: 'DriverDashboard', component: DriverDashboardView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
