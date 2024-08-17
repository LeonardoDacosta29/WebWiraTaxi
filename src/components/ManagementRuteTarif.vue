<template>
  <div class="container mt-4">
    <h2>Manajemen Rute</h2>
    <button class="btn btn-primary mb-3" @click="showAddRouteModal">Tambah Rute Baru</button>

    <!-- Tabel Rute -->
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Lokasi Asal</th>
              <th>Lokasi Tujuan</th>
              <th>Induk Rute</th>
              <th>Tarif Orang</th>
              <th>Tarif Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="route in routes" :key="route.rute_id">
              <td>{{ route.lokasi_asal }}</td>
              <td>{{ route.lokasi_tujuan }}</td>
              <td>{{ getRouteName(route.induk_rute_id) }}</td>
              <td>{{ route.tarif_orang }}</td>
              <td>{{ route.tarif_barang }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editRoute(route)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteRoute(route.rute_id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah/Edit Rute -->
    <div class="modal fade" id="routeModal" tabindex="-1" aria-labelledby="routeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="routeModalLabel">{{ isEditing ? "Edit Rute" : "Tambah Rute" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveRoute">
              <div class="mb-3">
                <label for="lokasiAsal" class="form-label">Lokasi Asal</label>
                <input type="text" id="lokasiAsal" v-model="form.lokasi_asal" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="lokasiTujuan" class="form-label">Lokasi Tujuan</label>
                <input type="text" id="lokasiTujuan" v-model="form.lokasi_tujuan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="indukRute" class="form-label">Induk Rute</label>
                <select id="indukRute" v-model="form.induk_rute_id" class="form-control">
                  <option :value="null">Tidak Ada</option>
                  <option v-for="route in routes" :key="route.rute_id" :value="route.rute_id">{{ route.lokasi_asal }} - {{ route.lokasi_tujuan }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="tarifOrang" class="form-label">Tarif Orang</label>
                <input type="number" id="tarifOrang" v-model="form.tarif_orang" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="tarifBarang" class="form-label">Tarif Barang</label>
                <input type="number" id="tarifBarang" v-model="form.tarif_barang" class="form-control" required />
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
      routes: [],
      isEditing: false,
      form: {
        lokasi_asal: "",
        lokasi_tujuan: "",
        induk_rute_id: null,
        tarif_orang: 0,
        tarif_barang: 0,
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchRoutes();
  },
  methods: {
    async fetchRoutes() {
      try {
        const response = await axios.get("/ruteTarif");
        this.routes = response.data;
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    },
    getRouteName(routeId) {
      const route = this.routes.find((route) => route.rute_id === routeId);
      return route ? `${route.lokasi_asal} - ${route.lokasi_tujuan}` : "Induk Tidak Ditemukan";
    },
    showAddRouteModal() {
      this.isEditing = false;
      this.form = {
        lokasi_asal: "",
        lokasi_tujuan: "",
        induk_rute_id: null,
        tarif_orang: 0,
        tarif_barang: 0,
      };
      const routeModal = new Modal(document.getElementById("routeModal"));
      routeModal.show();
    },
    saveRoute() {
      const route = { ...this.form };
      if (this.isEditing) {
        axios
          .put(`/ruteTarif/${this.editingRouteId}`, route)
          .then(() => {
            this.fetchRoutes();
            const routeModal = Modal.getInstance(document.getElementById("routeModal"));
            routeModal.hide();
            this.showAlertMessage("Rute berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui rute.", "alert-danger");
          });
      } else {
        console.log(route);
        axios
          .post("/ruteTarif", route)
          .then(() => {
            this.fetchRoutes();
            const routeModal = Modal.getInstance(document.getElementById("routeModal"));
            routeModal.hide();
            this.showAlertMessage("Rute berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan rute.", "alert-danger");
          });
      }
    },
    editRoute(route) {
      this.isEditing = true;
      this.form = {
        lokasi_asal: route.lokasi_asal,
        lokasi_tujuan: route.lokasi_tujuan,
        induk_rute_id: route.induk_rute_id,
        tarif_orang: route.tarif_orang,
        tarif_barang: route.tarif_barang,
      };
      this.editingRouteId = route.rute_id;
      const routeModal = new Modal(document.getElementById("routeModal"));
      routeModal.show();
    },
    deleteRoute(routeId) {
      if (confirm("Apakah Anda yakin ingin menghapus rute ini?")) {
        axios
          .delete(`/ruteTarif/${routeId}`)
          .then(() => {
            this.fetchRoutes();
            this.showAlertMessage("Rute berhasil dihapus.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menghapus rute.", "alert-danger");
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
