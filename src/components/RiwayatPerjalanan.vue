<template>
  <div class="container mt-4">
    <h2>Riwayat Perjalanan</h2>

    <!-- Filter Section -->
    <div class="filter-section mb-4">
      <button class="btn btn-primary" @click="showFilterModal">Filter</button>
    </div>

    <!-- Tabel Riwayat Perjalanan -->
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pesanan in filteredPesanans" :key="pesanan.pesanan_id">
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

    <!-- Filter Modal -->
    <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="filterModalLabel">Filter Riwayat Perjalanan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="applyFilter">
              <div class="mb-3">
                <label for="filterTanggal" class="form-label">Tanggal</label>
                <input type="date" id="filterTanggal" v-model="filter.tanggal" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="filterRute" class="form-label">Rute</label>
                <input type="text" id="filterRute" v-model="filter.rute" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="filterTipe" class="form-label">Tipe Pesanan</label>
                <select id="filterTipe" v-model="filter.tipe" class="form-control">
                  <option value="">Semua</option>
                  <option value="Orang">Orang</option>
                  <option value="Barang">Barang</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Terapkan Filter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "../axiosConfig"; // Pastikan sudah ada konfigurasi axios

export default {
  data() {
    return {
      pesanans: [], // Inisialisasi dengan array kosong
      filter: {
        tanggal: "",
        rute: "",
        tipe: "",
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },

  async mounted() {
    await this.fetchRiwayatPesanans();
  },

  computed: {
    filteredPesanans() {
      return this.pesanans.filter((pesanan) => {
        return (!this.filter.tanggal || pesanan.tanggal === this.filter.tanggal) && (!this.filter.rute || pesanan.rute.includes(this.filter.rute)) && (!this.filter.tipe || pesanan.tipe === this.filter.tipe);
      });
    },
  },

  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchRiwayatPesanans() {
      try {
        const response = await axios.get("/pesanan/riwayat"); // Panggil API untuk riwayat perjalanan
        this.pesanans = response.data; // Isi array pesanans dengan data dari server
      } catch (error) {
        console.error("Error fetching riwayat pesanans:", error);
      }
    },

    showFilterModal() {
      const filterModal = new Modal(document.getElementById("filterModal"));
      filterModal.show();
    },

    applyFilter() {
      const filterModal = Modal.getInstance(document.getElementById("filterModal"));
      filterModal.hide();
      this.showAlertMessage("Filter diterapkan.", "alert-success");
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

.filter-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
