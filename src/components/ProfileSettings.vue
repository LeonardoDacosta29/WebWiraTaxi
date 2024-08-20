<template>
  <div class="container mt-4">
    <h1>Kelola Profil</h1>
    <form @submit.prevent="saveProfile">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="profile.username" class="form-control" readonly />
      </div>
      <div class="mb-3">
        <label for="nama" class="form-label">Nama</label>
        <input type="text" id="nama" v-model="profile.nama" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="profile.password" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="nomor_hp" class="form-label">Nomor HP</label>
        <input type="text" id="nomor_hp" v-model="profile.nomor_hp" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="alamat" class="form-label">Alamat</label>
        <input type="text" id="alamat" v-model="profile.alamat" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="status_sim" class="form-label">Status SIM</label>
        <input type="text" id="status_sim" v-model="profile.status_sim" class="form-control" readonly />
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>

    <div v-if="showAlert" :class="['alert', alertType]" role="alert">
      {{ alertMessage }}
    </div>
  </div>
</template>

<script>
import axios from "../axiosConfig"; // Import axios untuk melakukan request

export default {
  data() {
    return {
      profile: {
        username: "",
        nama: "",
        password: "",
        nomor_hp: "",
        alamat: "",
        status_sim: "",
      },
      showAlert: false,
      alertMessage: "",
      alertType: "",
    };
  },
  async created() {
    await this.fetchProfileData(); // Fetch profile data saat komponen dibuat
  },
  methods: {
    async fetchProfileData() {
      try {
        const response = await axios.get("/driver/profile"); // Ganti dengan endpoint yang benar
        this.profile = response.data;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        this.showAlertMessage("Gagal mengambil data profil.", "alert-danger");
      }
    },
    async saveProfile() {
      try {
        await axios.put("/driver/profile", this.profile); // Ganti dengan endpoint yang benar
        this.showAlertMessage("Profil berhasil disimpan.", "alert-success");
      } catch (error) {
        console.error("Error saving profile:", error);
        this.showAlertMessage("Gagal menyimpan profil.", "alert-danger");
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
/* Tambahkan style khusus untuk profile settings jika diperlukan */
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  max-width: 300px;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}
</style>
