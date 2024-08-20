<template>
  <div class="container mt-4">
    <h2>Kelola Profil</h2>

    <form @submit.prevent="saveProfile">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="username" class="form-label">Username</label>
          <input type="text" id="username" v-model="profile.username" class="form-control" readonly />
        </div>
        <div class="col-md-6">
          <label for="nama" class="form-label">Nama</label>
          <input type="text" id="nama" v-model="profile.nama" class="form-control" required />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 position-relative">
          <label for="password" class="form-label">Password</label>
          <input :type="passwordFieldType" id="password" v-model="profile.password" class="form-control" required />
          <i :class="passwordIcon" @click="togglePasswordVisibility" class="eye-icon"></i>
        </div>
        <div class="col-md-6">
          <label for="noHP" class="form-label">Nomor HP</label>
          <input type="text" id="noHP" v-model="profile.noHP" class="form-control" required />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="alamat" class="form-label">Alamat</label>
          <input type="text" id="alamat" v-model="profile.alamat" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label for="statusSIM" class="form-label">Status SIM</label>
          <select id="statusSIM" v-model="profile.statusSIM" class="form-control" required>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
    </form>

    <!-- Notifikasi -->
    <div v-if="showAlert" :class="['alert', alertType]" role="alert" ref="alertBox">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
import axios from "../axiosConfig";
export default {
  data() {
    return {
      profile: {
        username: "",
        nama: "",
        password: "",
        alamat: "",
        noHP: "",
        statusSIM: "",
      },
      passwordFieldType: "password",
      passwordIcon: "bi bi-eye-slash",
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchProfile(); // Memanggil fungsi untuk mengambil data profil dari server
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get("/drivers/profile"); // Ganti endpoint ini dengan yang sesuai
        this.profile = response.data;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        this.showAlertMessage("Gagal mengambil data profil.", "alert-danger");
      }
    },
    togglePasswordVisibility() {
      if (this.passwordFieldType === "password") {
        this.passwordFieldType = "text";
        this.passwordIcon = "bi bi-eye";
      } else {
        this.passwordFieldType = "password";
        this.passwordIcon = "bi bi-eye-slash";
      }
    },
    async saveProfile() {
      try {
        await axios.put("/drivers/profile", this.profile); // Ganti endpoint ini dengan yang sesuai
        this.showAlertMessage("Profil berhasil diperbarui.", "alert-success");
      } catch (error) {
        console.error("Failed to update profile:", error);
        this.showAlertMessage("Gagal memperbarui profil.", "alert-danger");
      }
    },
    showAlertMessage(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  max-width: 300px;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

.form-control {
  background-color: #f8f9fa;
}

.form-control[readonly] {
  background-color: #e9ecef;
}

.eye-icon {
  position: absolute;
  top: 38px;
  right: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #6c757d;
}

button[type="submit"] {
  margin-top: 20px;
  width: 150px;
}
</style>
