<template>
  <div class="container mt-4">
    <h2>Manajemen Jadwal</h2>
    <button class="btn btn-primary mb-3" @click="showAddJadwalModal">Tambah Jadwal Baru</button>

    <!-- Tabel Jadwal -->
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Hari Keberangkatan</th>
              <th>Waktu Keberangkatan</th>
              <th>Rute</th>
              <th>Driver</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="jadwal in jadwals" :key="jadwal.jadwal_id">
              <td>{{ jadwal.hari_keberangkatan }}</td>
              <td>{{ jadwal.waktu_keberangkatan }}</td>
              <td>{{ getRouteName(jadwal.rute_id) }}</td>
              <td>{{ jadwal.nama_lengkap }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editJadwal(jadwal)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteJadwal(jadwal.jadwal_id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah/Edit Jadwal -->
    <div class="modal fade" id="jadwalModal" tabindex="-1" aria-labelledby="jadwalModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="jadwalModalLabel">{{ isEditing ? "Edit Jadwal" : "Tambah Jadwal" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveJadwal">
              <div class="mb-3">
                <label for="hariKeberangkatan" class="form-label">Hari Keberangkatan</label>
                <select id="hariKeberangkatan" v-model="form.hari_keberangkatan" class="form-control" required>
                  <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="waktuKeberangkatan" class="form-label">Waktu Keberangkatan</label>
                <select id="waktuKeberangkatan" v-model="form.waktu_keberangkatan" class="form-control" required>
                  <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="rute" class="form-label">Rute</label>
                <select id="rute" v-model="form.rute_id" class="form-control" required>
                  <option v-for="rute in routes" :key="rute.rute_id" :value="rute.rute_id">{{ rute.lokasi_asal }} - {{ rute.lokasi_tujuan }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="driver" class="form-label">Driver</label>
                <select id="driver" v-model="form.driver_id" class="form-control" required>
                  <option v-for="driver in drivers" :key="driver.driver_id" :value="driver.driver_id">
                    {{ driver.nama_lengkap }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Simpan</button>
              </div>
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
      jadwals: [],
      routes: [],
      drivers: [],
      days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      times: ["10:00", "13:00", "16:00", "19:00"],
      isEditing: false,
      form: {
        hari_keberangkatan: "",
        waktu_keberangkatan: "",
        rute_id: null,
        driver_id: null,
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchJadwals();
    await this.fetchRoutes();
    await this.fetchDrivers();
  },
  methods: {
    async fetchJadwals() {
      try {
        const response = await axios.get("/jadwal");
        this.jadwals = response.data;
      } catch (error) {
        console.error("Error fetching jadwals:", error);
      }
    },
    async fetchRoutes() {
      try {
        const response = await axios.get("/ruteTarif");
        this.routes = response.data.filter((route) => [1, 6].includes(route.rute_id));
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
    getRouteName(routeId) {
      const route = this.routes.find((route) => route.rute_id === routeId);
      return route ? `${route.lokasi_asal} - ${route.lokasi_tujuan}` : "Rute Tidak Ditemukan";
    },
    showAddJadwalModal() {
      this.isEditing = false;
      this.form = {
        hari_keberangkatan: "",
        waktu_keberangkatan: "",
        rute_id: null,
        driver_id: null,
      };
      const jadwalModal = new Modal(document.getElementById("jadwalModal"));
      jadwalModal.show();
    },
    saveJadwal() {
      const jadwal = { ...this.form };
      if (this.isEditing) {
        axios
          .put(`/jadwal/${this.editingJadwalId}`, jadwal)
          .then(() => {
            this.fetchJadwals();
            const jadwalModal = Modal.getInstance(document.getElementById("jadwalModal"));
            jadwalModal.hide();
            this.showAlertMessage("Jadwal berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui jadwal.", "alert-danger");
          });
      } else {
        axios
          .post("/jadwal", jadwal)
          .then(() => {
            this.fetchJadwals();
            const jadwalModal = Modal.getInstance(document.getElementById("jadwalModal"));
            jadwalModal.hide();
            this.showAlertMessage("Jadwal berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan jadwal.", "alert-danger");
          });
      }
    },
    editJadwal(jadwal) {
      this.isEditing = true;
      this.form = {
        hari_keberangkatan: jadwal.hari_keberangkatan,
        waktu_keberangkatan: jadwal.waktu_keberangkatan,
        rute_id: jadwal.rute_id,
        driver_id: jadwal.driver_id,
      };
      this.editingJadwalId = jadwal.jadwal_id;
      const jadwalModal = new Modal(document.getElementById("jadwalModal"));
      jadwalModal.show();
    },
    deleteJadwal(jadwalId) {
      if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
        axios
          .delete(`/jadwal/${jadwalId}`)
          .then(() => {
            this.fetchJadwals();
            this.showAlertMessage("Jadwal berhasil dihapus.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menghapus jadwal.", "alert-danger");
          });
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
  max-height: 500px;
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
