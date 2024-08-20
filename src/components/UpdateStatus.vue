<template>
  <div class="container mt-4">
    <h2>Update Status Pesanan</h2>

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
              <th>Kursi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pesanan in ongoingPesanans" :key="pesanan.pesanan_id">
              <td>{{ pesanan.rute }}</td>
              <td>{{ pesanan.tanggal_keberangkatan }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.status }}</td>
              <td>
                <button class="btn btn-success btn-sm me-2" @click="markAsComplete(pesanan.pesanan_id)">Selesai</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
      ongoingPesanans: [],
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },

  async mounted() {
    await this.fetchOngoingPesanans();
  },

  methods: {
    async fetchOngoingPesanans() {
      try {
        const response = await axios.get(`/pesanan/ongoing`);
        this.ongoingPesanans = response.data;
      } catch (error) {
        console.error("Error fetching ongoing pesanan:", error);
      }
    },

    async markAsComplete(pesananId) {
      try {
        await axios.put(`/pesanan/${pesananId}/selesai`);
        this.ongoingPesanans = this.ongoingPesanans.filter((pesanan) => pesanan.pesanan_id !== pesananId);
        this.showAlertMessage("Pesanan berhasil diselesaikan.", "alert-success");
      } catch (error) {
        console.error("Error marking pesanan as complete:", error);
        this.showAlertMessage("Gagal menyelesaikan pesanan.", "alert-danger");
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
