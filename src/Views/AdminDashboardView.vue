<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader @toggle-sidebar="toggleSidebar"/> <!-- Tambah event untuk toggle sidebar -->
    <div class="container-fluid flex-grow-1 d-flex">
        <AdminSidebar :isSidebarVisible="isSidebarVisible" class="col-md-2"/> <!-- Pass prop isSidebarVisible -->
        <main :class="['flex-grow-1', 'px-md-4', { 'ml-md-auto': isSidebarVisible }]"> <!-- Tambah margin-left jika sidebar visible -->
            <AppDashboard />
         </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import AdminSidebar from "../components/AdminSidebar.vue";
import AppFooter from "../components/AppFooter.vue";
import AppDashboard from "../components/AppDashboard.vue";

export default {
  name: "AdminDashboardView",
  components: {
    AppHeader,
    AdminSidebar,
    AppFooter,
    AppDashboard,
  },
  data() {
    return {
      isSidebarVisible: false, // Menyimpan status visibilitas sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Toggle status visibilitas sidebar
    },
  },
};
</script>

<style scoped>
/* Style khusus untuk AdminDashboardView */
</style>
