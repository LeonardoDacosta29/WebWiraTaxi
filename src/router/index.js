import { createRouter, createWebHistory } from "vue-router";
import AdminDashboardView from "../views/AdminDashboardView.vue";
import DriverDashboardView from "../views/DriverDashboardView.vue";
import LoginView from "../views/LoginView.vue";
import ManagementUser from "../components/ManagementUser.vue";
import ManagementDriver from "../components/ManagementDriver.vue"; // Komponen Manajemen Driver
import AppDashboard from "../components/AppDashboard.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  {
    path: "/admin-dashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true }, // Rute yang membutuhkan autentikasi
    children: [
      { path: "", name: "AppDashboard", component: AppDashboard }, // Rute default
      { path: "manajemen-user", name: "ManagementUser", component: ManagementUser },
      { path: "manajemen-driver", name: "ManagementDriver", component: ManagementDriver }, // Ganti ini
    ],
  },
  { path: "/driver-dashboard", name: "DriverDashboard", component: DriverDashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
