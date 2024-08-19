<template>
  <div class="container mt-4">
    <h2>Manajemen Pesanan</h2>
    <button class="btn btn-primary mb-3" @click="showAddPesananModal">Buat Pesanan</button>

    <!-- Tabel Pesanan Pending -->
    <div class="table-container">
      <h4>Pesanan Pending</h4>
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
            <tr v-for="pesanan in pendingPesanans" :key="pesanan.pending_pesanan_id">
              <td>{{ getRouteName(pesanan.rute_id) }}</td>
              <td>{{ formatDate(pesanan.tanggal_keberangkatan) }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.status }}</td>
              <td>
                <button class="btn btn-success btn-sm me-2" @click="accPesanan(pesanan)">Acc</button>
                <button class="btn btn-danger btn-sm" @click="batalPesanan(pesanan.pending_pesanan_id)">Batal</button>
                <button class="btn btn-warning btn-sm" @click="editPesanan(pesanan)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tabel Pesanan yang Sudah di-ACC -->
    <div class="table-container mt-5">
      <h4>Pesanan yang Sudah di-ACC</h4>
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
            <tr v-for="pesanan in accPesanans" :key="pesanan.pesanan_id">
              <td>{{ getRouteName(pesanan.rute_id) }}</td>
              <td>{{ pesanan.tanggal_keberangkatan }}</td>
              <td>{{ formatDate(pesanan.tanggal_keberangkatan) }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.tarif }}</td>
              <td>{{ pesanan.driver_name }}</td>
              <td>{{ pesanan.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Buat/Edit Pesanan -->
    <div class="modal fade" id="pesananModal" tabindex="-1" aria-labelledby="pesananModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pesananModalLabel">{{ isEditing ? "Edit Pesanan" : "Buat Pesanan" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePesanan">
              <div class="mb-3">
                <label for="rute_id" class="form-label">Rute</label>
                <select v-model="form.rute_id" class="form-select" required>
                  <option v-for="route in routes" :key="route.rute_id" :value="route.rute_id">{{ route.lokasi_asal }} - {{ route.lokasi_tujuan }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="tanggal_keberangkatan" class="form-label">Tanggal Keberangkatan</label>
                <input type="date" v-model="form.tanggal_keberangkatan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="waktu_keberangkatan" class="form-label">Waktu Keberangkatan</label>
                <select v-model="form.waktu_keberangkatan" class="form-control">
                  <option value="10.00">10:00</option>
                  <option value="13.00">13:00</option>
                  <option value="16.00">16:00</option>
                  <option value="19.00">19:00</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="nama_pemesan" class="form-label">Nama Pemesan</label>
                <input type="text" v-model="form.nama_pemesan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="contact_pemesan" class="form-label">No. HP Pemesan</label>
                <input type="text" v-model="form.contact_pemesan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="tipe_pesanan" class="form-label">Tipe Pesanan</label>
                <select v-model="form.tipe_pesanan" class="form-select" required>
                  <option value="Orang">Orang</option>
                  <option value="Barang">Barang</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="jumlah_kursi" class="form-label">Jumlah Kursi</label>
                <input type="number" v-model="form.jumlah_kursi" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="driver_id" class="form-label">Driver</label>
                <select v-model="form.driver_id" class="form-select" required>
                  <option v-for="driver in drivers" :key="driver.driver_id" :value="driver.driver_id">
                    {{ driver.nama_lengkap }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">{{ isEditing ? "Simpan Perubahan" : "Tambah Pesanan" }}</button>
            </form>
          </div>
        </div>
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
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      pendingPesanans: [],
      accPesanans: [],
      routes: [],
      drivers: [],
      isEditing: false,
      editingPesananId: null,
      form: {
        rute_id: null,
        tanggal_keberangkatan: "",
        waktu_keberangkatan: "10:00",
        nama_pemesan: "",
        contact_pemesan: "",
        tipe_pesanan: "Orang",
        jumlah_kursi: 1,
        deskripsi_barang: "",
        driver_id: null,
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchPendingPesanans();
    await this.fetchAccPesanans();
    await this.fetchRoutes();
    await this.fetchDrivers();
  },
  methods: {
    formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  },
    async fetchPendingPesanans() {
      try {
        const response = await axios.get("/pesanan/pending");
        this.pendingPesanans = response.data.filter((pesanan) => pesanan.status !== "Dibatalkan");
      } catch (error) {
        console.error("Error fetching pending pesanans:", error);
      }
    },
    async fetchAccPesanans() {
      try {
        const response = await axios.get("/pesanan");
        this.accPesanans = response.data;
      } catch (error) {
        console.error("Error fetching acc pesanans:", error);
      }
    },
    async fetchRoutes() {
      try {
        const response = await axios.get("/ruteTarif");
        this.routes = response.data;
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    },
    async fetchDrivers() {
      try {
        const response = await axios.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },
    showAddPesananModal() {
      this.isEditing = false;
      this.form = {
        rute_id: null,
        tanggal_keberangkatan: "",
        waktu_keberangkatan: "10:00",
        nama_pemesan: "",
        contact_pemesan: "",
        tipe_pesanan: "Orang",
        jumlah_kursi: 1,
        deskripsi_barang: "",
        driver_id: null,
      };
      const pesananModal = new Modal(document.getElementById("pesananModal"));
      pesananModal.show();
    },
    editPesanan(pesanan) {
      this.isEditing = true;
      this.editingPesananId = pesanan.pending_pesanan_id;
      this.form = {
        rute_id: pesanan.rute_id,
        tanggal_keberangkatan: pesanan.tanggal_keberangkatan,
        waktu_keberangkatan: pesanan.waktu_keberangkatan,
        nama_pemesan: pesanan.nama_pemesan,
        contact_pemesan: pesanan.contact_pemesan,
        tipe_pesanan: pesanan.tipe_pesanan,
        jumlah_kursi: pesanan.jumlah_kursi,
        deskripsi_barang: pesanan.deskripsi_barang || "",
        driver_id: pesanan.driver_id,
      };
      const pesananModal = new Modal(document.getElementById("pesananModal"));
      pesananModal.show();
    },
    calculateTarif(rute_id, tipe_pesanan) {
      const selectedRoute = this.routes.find((route) => route.rute_id === rute_id);
      return selectedRoute ? (tipe_pesanan === "Orang" ? selectedRoute.tarif_orang : selectedRoute.tarif_barang) : 0;
    },
    savePesanan() {
      const pesanan = { ...this.form };
      pesanan.tarif = this.calculateTarif(pesanan.rute_id, pesanan.tipe_pesanan);
      if (this.isEditing) {
        axios
          .put(`/pesanan/pending/${this.editingPesananId}`, pesanan)
          .then(() => {
            this.fetchPendingPesanans();
            const pesananModal = Modal.getInstance(document.getElementById("pesananModal"));
            pesananModal.hide();
            this.showAlertMessage("Pesanan berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui pesanan.", "alert-danger");
          });
      } else {
        axios
          .post("/pesanan/pending", pesanan)
          .then(() => {
            this.fetchPendingPesanans();
            const pesananModal = Modal.getInstance(document.getElementById("pesananModal"));
            pesananModal.hide();
            this.showAlertMessage("Pesanan berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan pesanan.", "alert-danger");
          });
      }
    },
    getRouteName(routeId) {
      const route = this.routes.find((route) => route.rute_id === routeId);
      return route ? `${route.lokasi_asal} - ${route.lokasi_tujuan}` : "Rute Tidak Ditemukan";
    },
    accPesanan(pesanan) {
      const pesananAcc = {
        ...pesanan,
        status: "ACC",
        tarif: this.calculateTarif(pesanan.rute_id, pesanan.tipe_pesanan),
        driver_id: pesanan.driver_id,
      };
      axios
        .post(`/pesanan/acc/${pesanan.pending_pesanan_id}`, pesananAcc)
        .then(() => {
          this.fetchPendingPesanans();
          this.fetchAccPesanans();
          this.showAlertMessage("Pesanan berhasil di-ACC.", "alert-success");
        })
        .catch(() => {
          this.showAlertMessage("Gagal meng-ACC pesanan.", "alert-danger");
        });
    },
    batalPesanan(pesananId) {
      axios
        .put(`/pesanan/cancel/${pesananId}`, { status: "Dibatalkan" })
        .then(() => {
          this.fetchPendingPesanans();
          this.showAlertMessage("Pesanan berhasil dibatalkan.", "alert-success");
        })
        .catch(() => {
          this.showAlertMessage("Gagal membatalkan pesanan.", "alert-danger");
        });
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
  margin-top: 10px;
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
