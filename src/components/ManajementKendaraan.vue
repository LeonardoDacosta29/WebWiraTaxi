<template>
    <div class="container mt-4">
      <h2>Manajemen Kendaraan</h2>
      <button class="btn btn-primary mb-3" @click="showAddVehicleModal">Tambah Kendaraan Baru</button>
  
      <!-- Tabel Kendaraan -->
      <div class="table-container">
        <div class="table-scrollable">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Merk</th>
                <th>Kapasitas Penumpang</th>
                <th>Bahan Bakar</th>
                <th>Plat Nomor</th>
                <th>Tahun Pembuatan</th>
                <th>Driver</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" :key="vehicle.kendaraan_id">
                <td>{{ vehicle.merk }}</td>
                <td>{{ vehicle.kapasitas }}</td>
                <td>{{ vehicle.bahan_bakar }}</td>
                <td>{{ vehicle.plat_nomor }}</td>
                <td>{{ vehicle.tahun_pembuatan }}</td>
                <td>{{ vehicle.driver_name }}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" @click="editVehicle(vehicle)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteVehicle(vehicle.kendaraan_id)">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Modal Tambah/Edit Kendaraan -->
      <div class="modal fade" id="vehicleModal" tabindex="-1" aria-labelledby="vehicleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="vehicleModalLabel">{{ isEditing ? "Edit Kendaraan" : "Tambah Kendaraan" }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveVehicle">
                <div class="mb-3">
                  <label for="merk">Merk</label>
                  <input type="text" id="merk" v-model="form.merk" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="kapasitas">Kapasitas Penumpang</label>
                  <input type="number" id="kapasitas" v-model="form.kapasitas" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="bahanBakar">Bahan Bakar</label>
                  <input type="text" id="bahanBakar" v-model="form.bahan_bakar" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="platNomor">Plat Nomor</label>
                  <input type="text" id="platNomor" v-model="form.plat_nomor" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="tahunPembuatan">Tahun Pembuatan</label>
                  <input type="number" id="tahunPembuatan" v-model="form.tahun_pembuatan" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="driver">Pilih Driver</label>
                  <select v-model="form.driver_id" class="form-control" required>
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
        vehicles: [],
        drivers: [],
        isEditing: false,
        form: {
          merk: "",
          kapasitas: "",
          bahan_bakar: "",
          plat_nomor: "",
          tahun_pembuatan: "",
          driver_id: "",
        },
        alertMessage: "",
        alertType: "",
        showAlert: false,
      };
    },
    async mounted() {
      await this.fetchVehicles();
      await this.fetchDrivers(); // Pastikan fetchDrivers dipanggil di sini
    },
    methods: {
      async fetchVehicles() {
        try {
          const response = await axios.get("/vehicles");
          this.vehicles = response.data;
        } catch (error) {
          console.error("Error fetching vehicles:", error);
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
      showAddVehicleModal() {
        this.isEditing = false;
        this.form = {
          merk: "",
          kapasitas: "",
          bahan_bakar: "",
          plat_nomor: "",
          tahun_pembuatan: "",
          driver_id: "",
        };
        const vehicleModal = new Modal(document.getElementById("vehicleModal"));
        vehicleModal.show();
      },
      saveVehicle() {
        const vehicle = { ...this.form };
        if (this.isEditing) {
          axios
            .put(`/vehicles/${this.editingVehicleId}`, vehicle)
            .then(() => {
              this.fetchVehicles();
              const vehicleModal = Modal.getInstance(document.getElementById("vehicleModal"));
              vehicleModal.hide();
              this.showAlertMessage("Kendaraan berhasil diperbarui.", "alert-success");
            })
            .catch(() => {
              this.showAlertMessage("Gagal memperbarui kendaraan.", "alert-danger");
            });
        } else {
          axios
            .post("/vehicles", vehicle)
            .then(() => {
              this.fetchVehicles();
              const vehicleModal = Modal.getInstance(document.getElementById("vehicleModal"));
              vehicleModal.hide();
              this.showAlertMessage("Kendaraan berhasil ditambahkan.", "alert-success");
            })
            .catch(() => {
              this.showAlertMessage("Gagal menambahkan kendaraan.", "alert-danger");
            });
        }
      },
      editVehicle(vehicle) {
        this.isEditing = true;
        this.form = {
          merk: vehicle.merk,
          kapasitas: vehicle.kapasitas,
          bahan_bakar: vehicle.bahan_bakar,
          plat_nomor: vehicle.plat_nomor,
          tahun_pembuatan: vehicle.tahun_pembuatan,
          driver_id: vehicle.driver_id,
        };
        this.editingVehicleId = vehicle.kendaraan_id;
        const vehicleModal = new Modal(document.getElementById("vehicleModal"));
        vehicleModal.show();
      },
      deleteVehicle(vehicleId) {
        if (confirm("Apakah Anda yakin ingin menghapus kendaraan ini?")) {
          axios
            .delete(`/vehicles/${vehicleId}`)
            .then(() => {
              this.fetchVehicles();
              this.showAlertMessage("Kendaraan berhasil dihapus.", "alert-success");
            })
            .catch(() => {
              this.showAlertMessage("Gagal menghapus kendaraan.", "alert-danger");
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
  
  .alert.hidden {
    opacity: 0;
  }
  
  .table-container {
    max-height: 175px;
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
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4
  