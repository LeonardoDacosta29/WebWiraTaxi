<template>
  <div id="app">
    <AdminHeader />
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <AdminSidebar class="col-md-2" />
        <!-- Konten utama -->
        <main class="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <router-view />
        </main>
      </div>
    </div>
    <AdminFooter />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import AdminHeader from './components/AdminHeader.vue';
import AdminSidebar from './components/AdminSidebar.vue';
import AdminFooter from './components/AdminFooter.vue';
// import AdminDashboard from './components/AdminDashboard.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    AdminHeader,
    AdminSidebar,
    AdminFooter
  }
};
</script>

<style>
/* Tambah style global kalau perlu */
/* Style untuk menyembunyikan sidebar pada layar kecil */
.sidebar-hidden {
  display: none !important;
}
@media (min-width: 768px) {
  .sidebar-hidden {
    display: block !important;
  }
}
</style>
