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
    meta: { requiresAuth: true }, // Tambahkan ini
    children: [
      { path: "", name: "AppDashboard", component: AppDashboard }, // Route default
      { path: "manajemen-user", name: "ManagementUser", component: ManagementUser },
      { path: "manajemen-driver", name: "ManagementDriver", component: ManagementUser },
    ],
  },
  { path: "/driver-dashboard", name: "DriverDashboard", component: DriverDashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // Tambahkan Guard untuk melindungi rute
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   console.log("Token saat ini:", token); // Cek nilai token

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!token) {
//       console.log("Token tidak ada, arahkan ke login");
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
