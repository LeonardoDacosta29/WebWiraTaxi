<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="container-fluid flex-grow-1 d-flex">
      <DriverSidebar :isSidebarVisible="isSidebarVisible" class="col-md-2" />
      <main :class="['flex-grow-1', 'px-md-4', { 'ml-md-auto': isSidebarVisible }]">
        <router-view />
        <!-- Tambahkan router-view untuk merender komponen anak -->
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import DriverSidebar from "../components/DriverSidebar.vue";
import AppFooter from "../components/AppFooter.vue";
// import DriverDashboard from "../components/DriverDashboard.vue";

export default {
  name: "DriverDashboardView",
  components: {
    AppHeader,
    DriverSidebar,
    AppFooter,
    // DriverDashboard,
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
/* Style khusus untuk DriverDashboardView */
</style>
