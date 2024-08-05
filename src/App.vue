<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AdminHeader @toggle-sidebar="toggleSidebar" />
    <div class="container-fluid flex-grow-1">
      <div class="row">
        <AdminSidebar :isSidebarVisible="isSidebarVisible" class="col-md-2" />

        <main class="col-md-10 ms-md-auto col-lg-10 px-md-4 ml-3">
          <router-view />
        </main>
      </div>
    </div>
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from "./components/AdminHeader.vue";
import AdminSidebar from "./components/AdminSidebar.vue";
import AdminFooter from "./components/AdminFooter.vue";

export default {
  name: "App",
  components: {
    AdminHeader,
    AdminSidebar,
    AdminFooter,
  },
  data() {
    return {
      isSidebarVisible: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  },
};
</script>

<style>
/* Tambahkan style global jika diperlukan */
</style>
