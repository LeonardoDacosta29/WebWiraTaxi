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
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <a class="nav-link me-3" href="#"><i class="bi bi-search"></i></a>
          <a class="nav-link me-3" href="#"><i class="bi bi-bell"></i></a>
          <div class="dropdown" @click="toggleDropdown">
            <a class="nav-link me-3" href="javascript:void(0);" role="button">
              <img :src="userProfileImage" alt="User" class="rounded-circle" style="width: 40px; height: 40px" />
            </a>
            <ul v-if="dropdownOpen" class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
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
      <a class="dropdown-item" href="#" @click="logout">Logout</a>
    </div>
    <!-- Modal Konfirmasi Logout -->
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">Konfirmasi Logout</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">Apakah Anda yakin ingin logout?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" @click="confirmLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: "AppHeader",
  data() {
    return {
      rightMenuVisible: false,
      dropdownOpen: false, // Tambahkan state untuk mengontrol dropdown
      profileImage: null, // Ganti ini dengan nilai dari database jika sudah ada
    };
  },
  computed: {
    userProfileImage() {
      // Jika profileImage tidak ada, gunakan gambar default
      return this.profileImage || require("@/assets/logowira.png");
    },
  },
  methods: {
    toggleRightMenu() {
      console.log("toggleRightMenu dipanggil"); // Menambahkan log
      this.rightMenuVisible = !this.rightMenuVisible;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown state
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
    confirmLogout() {
      // Tutup modal (opsional, untuk memastikan modal tertutup)
    let logoutModal = Modal.getInstance(document.getElementById('logoutModal'));
    if (logoutModal) {
        logoutModal.hide();
        // logoutModal.dispose();
    }
    // Logika untuk logout
    localStorage.removeItem("token");
    console.log("Token setelah dihapus:", localStorage.getItem("token")); // Cek apakah token sudah hilang
    this.$router.push("/");

    // Opsional: Refresh halaman setelah logout
    // window.location.reload();
    
},
logout() {
    // Menampilkan modal konfirmasi
    let logoutModal = new Modal(document.getElementById('logoutModal'));
    logoutModal.show();
}
  },
  mounted() {
    // Tambahkan event listener untuk menutup dropdown saat klik di luar
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
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
/* .navbar {
  z-index: 1000;
  width: 100%;
} */

/* Styling untuk dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: auto;
  right: 0; /* Menempatkan dropdown ke sisi kanan */
  z-index: 1000;
  display: block;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

@media (max-width: 768px) {
  /* Penyesuaian untuk tampilan mobile */
  .dropdown-menu {
    min-width: 100px; /* Lebar minimum lebih kecil di mobile */
    right: 0; /* Pastikan dropdown muncul di sebelah kanan */
    left: auto;
    transform: none; /* Hapus center align di mobile */
    width: auto; /* Biarkan dropdown mengambil lebar otomatis */
    top: 56px; /* Posisi dropdown di bawah navbar */
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #16181b;
  text-decoration: none;
  background-color: #f8f9fa;
}
/* Gaya untuk modal konfirmsi logout */
.modal-content {
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

.modal-title {
  font-size: 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
/* css untuk modal */
.modal-footer .btn {
    min-width: 80px; /* Tentukan lebar minimum untuk tombol */
    font-size: 1rem; /* Pastikan font size konsisten */
}

.modal-footer .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.modal-footer .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

@media (max-width: 768px) {
    .modal-content {
        width: 90%; /* Agar modal terlihat lebih kecil di mobile */
        margin: auto;
    }
}




</style>
