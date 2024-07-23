<template>
  <!-- Tombol untuk toggle sidebar di perangkat kecil -->
  <button @click="toggleSidebar" class="btn btn-primary d-md-none">
      <i class="bi bi-list"></i>
    </button>
    <!-- Sidebar menggunakan Bootstrap list group -->
    <div :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible, 'd-md-block': true }]" id="sidebar-wrapper">
    <div class="list-group list-group-flush">
      <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
      <a href="#" class="list-group-item list-group-item-action bg-light">Settings</a>
      <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar',
  data(){
    return {
      isSiderbarVisible: false // Sidebar tersembunyi secara default
    };
  },
  methods: {
    // fungsi untuk tiggle sidebar
    toggleSidebar() {
      this.isSiderbarVisible = !this.isSiderbarVisible;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px; /* Lebar sidebar */
}
.sidebar-hidden {
  display: none; /* Sembunyikan sidebar */
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
    z-index: 1000;
  }
  .toggle-btn {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1001;
  }
}
</style>