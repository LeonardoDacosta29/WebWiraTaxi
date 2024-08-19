import { createRouter, createWebHistory } from "vue-router";
import AdminDashboardView from "../views/AdminDashboardView.vue";
import DriverDashboardView from "../views/DriverDashboardView.vue";
import LoginView from "../views/LoginView.vue";
import ManagementPesanan from "../components/ManagementPesanan.vue"; // Komponen Manajemen Pesanan
import ManagementUser from "../components/ManagementUser.vue";
import ManagementDriver from "../components/ManagementDriver.vue"; // Komponen Manajemen Driver
import ManagementKendaraan from "../components/ManagementKendaraan.vue"; // Komponen Manajemen Kendaraan
import ManagementRuteTarif from "../components/ManagementRuteTarif.vue"; // Komponen Manajemen Rute dan Tarif
import ManagementJadwal from "../components/ManagementJadwal.vue"; // Komponen Manajemen Jadwal
import AppDashboard from "@/components/AppDashboard.vue";
import ManagementPemantauan from "@/components/ManagementPemantauan.vue";
import ManagementLaporan from "@/components/ManagementLaporan.vue";
import DaftarPesanan from "@/components/DaftarPesanan.vue";
import AppDriverDashboard from "@/components/AppDriverDashboard.vue";
import UpdateStatus from "@/components/UpdateStatus.vue";
import RiwayatPerjalanan from "@/components/RiwayatPerjalanan.vue";
import ManagementProfile from "@/components/ManagementProfile.vue";
// import AdminDashboard from "@/components/AppDashboard.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  {
    path: "/admin-dashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true }, // Rute yang membutuhkan autentikasi
    children: [
      { path: "", name: "AppDashboard", component: AppDashboard }, // Rute default
      { path: "manajemen-pesanan", name: "ManagementPesanan", component: ManagementPesanan },
      { path: "manajemen-user", name: "ManagementUser", component: ManagementUser },
      { path: "manajemen-driver", name: "ManagementDriver", component: ManagementDriver }, // Ganti ini
      { path: "manajemen-kendaraan", name: "ManagementKendaraan", component: ManagementKendaraan },
      { path: "manajemen-rutetarif", name: "ManagementRuteTarif", component: ManagementRuteTarif },
      { path: "manajemen-jadwal", name: "ManagementJadwal", component: ManagementJadwal },
      { path: "manajemen-pemantauan", name: "ManagementPemantauan", component: ManagementPemantauan },
      { path: "manajemen-laporan", name: "ManagementLaporan", component: ManagementLaporan },
    ],
  },
  {
    path: "/driver-dashboard",
    component: DriverDashboardView,
    meta: { requiresAuth: true }, // Rute yang membutuhkan autentikasi
    children: [
      { path: "", name: "AppDriverDashboard", component: AppDriverDashboard }, // Rute default
      { path: "daftar-pesanan", name: "DaftarPesanan", component: DaftarPesanan },
      { path: "update-status", name: "UpdateStatus", component: UpdateStatus},
      { path: "riwayat-perjalanan", name: "RiwayatPerjalanan", component: RiwayatPerjalanan},
      { path: "management-profile", name: "ManagementProfile", component: ManagementProfile},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
