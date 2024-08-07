<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Tombol untuk toggle sidebar di perangkat kecil -->
      <button @click="$emit('toggle-sidebar')" class="btn btn-primary d-md-none me-3">
        <i class="bi bi-list"></i>
      </button>
      <a class="navbar-brand me-auto" href="#">Dashboard</a>
      <div class="d-flex ms-auto align-items-center">
        <!-- Ikon search, notification, dan user profile untuk layar besar -->
        <div class="d-none d-md-flex align-items-center">
          <a class="nav-link me-3" href="#"><i class="bi bi-search"></i></a>
          <a class="nav-link me-3" href="#"><i class="bi bi-bell"></i></a>
          <div class="dropdown">
            <a class="nav-link dropdown-toggle me-3" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="path-to-profile-image" alt="User" class="rounded-circle" style="width: 40px; height: 40px" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
        <!-- Tombol toggle untuk menu kanan di perangkat kecil -->
        <button @click="toggleRightMenu" class="btn btn-primary d-md-none ms-2">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    <!-- Menu kanan untuk perangkat kecil -->
    <div v-if="rightMenuVisible" class="dropdown-menu dropdown-menu-end show d-md-none" style="right: 10px; top: 56px; position: absolute">
      <a class="dropdown-item" href="#"><i class="bi bi-search"></i> Search</a>
      <a class="dropdown-item" href="#"><i class="bi bi-bell"></i> Notifications</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#"><i class="bi bi-person-circle"></i> Profile</a>
      <a class="dropdown-item" href="#">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      rightMenuVisible: false,
    };
  },

  methods: {
    toggleRightMenu() {
      this.rightMenuVisible = !this.rightMenuVisible;
    },
  },
};
</script>

<style scoped>
/* Gaya untuk memastikan tombol toggle dan ikon memiliki ukuran yang sama */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Pastikan ukuran konsisten */
  height: 40px; /* Pastikan ukuran konsisten */
  padding: 0;
}
.navbar-nav .nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
}
.nav-link {
  margin-right: 1rem; /* Tambahkan jarak antar ikon */
}
</style>
