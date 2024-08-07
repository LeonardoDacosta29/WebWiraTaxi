import { createRouter, createWebHistory } from "vue-router";
import AdminDashboardView from "../views/AdminDashboardView.vue";
import DriverDashboardView from "../views/DriverDashboardView.vue";
import LoginView from "../views/LoginView.vue";
import ManagementUser from "../components/ManagementUser.vue";
import AppDashboard from "../components/AppDashboard.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  {
    path: "/admin-dashboard",
    component: AdminDashboardView,
    children: [
      { path: "", name: "AppDashboard", component: AppDashboard }, // Route default
      { path: "manajemen-user", name: "ManagementUser", component: ManagementUser },
    ],
  },
  { path: "/driver-dashboard", name: "DriverDashboard", component: DriverDashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
