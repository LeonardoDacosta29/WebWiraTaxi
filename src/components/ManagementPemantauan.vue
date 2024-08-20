<template>
  <div class="container mt-4">
    <h2>Pesanan yang Sedang Berlangsung</h2>

    <!-- Tabel Pesanan yang Sedang Dikerjakan -->
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
              <th>Tarif</th>
              <th>Driver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pesanan in ongoingPesanans" :key="pesanan.pesanan_id">
              <td>{{ pesanan.rute_id }}</td>
              <td>{{ formatDate(pesanan.tanggal_keberangkatan) }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.tarif }}</td>
              <td>{{ pesanan.status }}</td>
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
      ongoingPesanans: [], // Inisialisasi dengan array kosong
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },

  async mounted() {
    await this.fetchOngoingPesanans(); // Panggil method untuk fetch data ketika komponen dipasang
  },

  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchOngoingPesanans() {
      try {
        const response = await axios.get("/pesanan/ongoing"); // Pastikan endpoint ini sesuai dengan backend kamu
        this.ongoingPesanans = response.data;
      } catch (error) {
        console.error("Error fetching ongoing pesanans:", error);
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
/* Style sama seperti di ManagementPesanan.vue */
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

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

@media (max-width: 576px) {
  .modal-dialog {
    max-width: 90%;
  }
}

.modal-content .form-control {
  color: #000000 !important;
  background-color: #ffffff !important;
}

select.form-control option {
  color: #000000 !important;
  background-color: #ffffff !important;
}
</style>
