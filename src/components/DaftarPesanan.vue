<template>
  <div class="container mt-4">
    <h2>Daftar Pesanan Driver</h2>

    <!-- Tabel Daftar Pesanan -->
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Rute</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Nama</th>
              <th>No. HP</th>
              <th>Tipe</th>
              <th>Kursi/Barang</th>
              <th>Tarif</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pesanan in driverPesanans" :key="pesanan.pesanan_id">
              <td>{{ pesanan.rute_id }}</td>
              <td>{{ formatDate(pesanan.tanggal_keberangkatan) }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi || "Barang" }}</td>
              <td>{{ pesanan.tarif }}</td>
              <td>{{ pesanan.status }}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="kerjakanPesanan(pesanan.pesanan_id)">Kerjakan</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axiosConfig";
export default {
  data() {
    return {
      driverPesanans: [],
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },

  async mounted() {
    await this.fetchDriverPesanans();
  },

  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async kerjakanPesanan(pesananId) {
      try {
        const response = await axios.put(`/pesanan/${pesananId}/kerjakan`);
        if (response.data) {
          this.driverPesanans = this.driverPesanans.filter((p) => p.pesanan_id !== pesananId);
          this.showAlertMessage("Pesanan berhasil diperbarui.", "alert-success");
        }
      } catch (error) {
        console.error("Error updating pesanan status:", error);
        this.showAlertMessage("Gagal memperbarui pesanan.", "alert-danger");
      }
    },
    async fetchDriverPesanans() {
      try {
        const userId = this.getUserId(); // Ambil userId dari local storage atau state management
        if (!userId) {
          this.showAlertMessage("User ID tidak ditemukan. Silakan login kembali.", "alert-danger");
          return;
        }
        const response = await axios.get(`/pesanan/driver-dashboard?user_id=${userId}`);
        this.driverPesanans = response.data;
      } catch (error) {
        console.error("Error fetching driver pesanan:", error);
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
    getUserId() {
      const userId = localStorage.getItem("user_id");
      console.log("User ID dari localStorage:", userId); // Debugging
      return userId;
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

.table-container {
  max-height: 450px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 20px;
}

.table-scrollable {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.table th,
.table td {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>
