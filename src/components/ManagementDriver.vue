<template>
  <div class="container mt-4">
    <h2>Manajemen Driver</h2>
    <button class="btn btn-primary mb-3" @click="showAddDriverModal">Tambah Driver Baru</button>

    <!-- Tabel Driver -->
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Status SIM</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in drivers" :key="driver.driver_id">
              <td>{{ driver.username }}</td>
              <td>{{ driver.nama_lengkap }}</td>
              <td>{{ driver.jenis_kelamin }}</td>
              <td>{{ driver.alamat }}</td>
              <td>{{ driver.status_sim }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editDriver(driver)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteDriver(driver.driver_id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah/Edit Driver -->
    <div class="modal fade" id="driverModal" tabindex="-1" aria-labelledby="driverModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="driverModalLabel">{{ isEditing ? "Edit Driver" : "Tambah Driver" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveDriver">
              <div class="mb-3">
                <label for="username">Pilih Username</label>
                <select v-model="selectedUserId" class="form-control" required>
                  <option v-for="user in users" :key="user.user_id" :value="user.user_id">
                    {{ user.username }} 
                  </option>
                </select>

              </div>

              <div class="mb-3">
                <label for="namaLengkap" class="form-label">Nama Lengkap</label>
                <input type="text" id="namaLengkap" v-model="form.nama_lengkap" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="jenisKelamin" class="form-label">Jenis Kelamin</label>
                <select id="jenisKelamin" v-model="form.jenis_kelamin" class="form-control" required>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="alamat" class="form-label">Alamat</label>
                <input type="text" id="alamat" v-model="form.alamat" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="statusSim" class="form-label">Status SIM</label>
                <select id="statusSim" v-model="form.status_sim" class="form-control" required>
                  <option value="Aktif">Aktif</option>
                  <option value="Mati">Mati</option>
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
      users: [],
      drivers: [],
      isEditing: false,
      selectedUserId: "",
      form: {
        nama_lengkap: "",
        jenis_kelamin: "",
        alamat: "",
        status_sim: "",
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchDrivers();
    await this.fetchUsers(); // Pastikan fetchUsers dipanggil di sini
  },
  methods: {
    async fetchUsers() {
    try {
      const response = await axios.get("/users");
      console.log(response.data); // Periksa data yang diterima
      this.users = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
    fetchDrivers() {
      axios
        .get("/drivers")
        .then((response) => {
          this.drivers = response.data;
        })
        .catch((error) => {
          console.error("Error fetching drivers:", error);
        });
    },
    showAddDriverModal() {
      this.isEditing = false;
      this.form = {
        nama_lengkap: "",
        jenis_kelamin: "",
        alamat: "",
        status_sim: "",
      };
      this.selectedUserId = "";
      const driverModal = new Modal(document.getElementById("driverModal"));
      driverModal.show();
    },
    saveDriver() {
      const driver = { ...this.form, user_id: this.selectedUserId };
      if (this.isEditing) {
        axios
          .put(`/drivers/${this.editingDriverId}`, driver)
          .then(() => {
            this.fetchDrivers();
            const driverModal = Modal.getInstance(document.getElementById("driverModal"));
            driverModal.hide();
            this.showAlertMessage("Driver berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui driver.", "alert-danger");
          });
      } else {
        axios
          .post("/drivers", driver)
          .then(() => {
            this.fetchDrivers();
            const driverModal = Modal.getInstance(document.getElementById("driverModal"));
            driverModal.hide();
            this.showAlertMessage("Driver berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan driver.", "alert-danger");
          });
      }
    },
    editDriver(driver) {
      this.isEditing = true;
      this.form = {
        nama_lengkap: driver.nama_lengkap,
        jenis_kelamin: driver.jenis_kelamin,
        alamat: driver.alamat,
        status_sim: driver.status_sim,
      };
      this.selectedUserId = driver.user_id;
      this.editingDriverId = driver.driver_id;
      const driverModal = new Modal(document.getElementById("driverModal"));
      driverModal.show();
    },
    deleteDriver(driverId) {
      if (confirm("Apakah Anda yakin ingin menghapus driver ini?")) {
        axios
          .delete(`/drivers/${driverId}`)
          .then(() => {
            this.fetchDrivers();
            this.showAlertMessage("Driver berhasil dihapus.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menghapus driver.", "alert-danger");
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
    color: #000000 !important; /* Mengubah warna teks dalam option menjadi putih */
    background-color: #ffffff !important; /* Mengubah warna latar belakang option menjadi hitam */
}
select.form-control {
    color: #000 !important;
    background-color: #fff !important;
}
select.form-control option {
    color: #000 !important;
    background-color: #fff !important;
}



</style>
