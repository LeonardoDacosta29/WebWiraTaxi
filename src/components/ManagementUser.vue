<template>
  <div class="container mt-4">
    <h2>Manajemen Pengguna</h2>
    <button class="btn btn-primary mb-3" @click="showAddUserModal">Tambah Pengguna</button>

    <!-- Tabel Admin -->
    <h3>Admin</h3>
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in adminUsers" :key="user.User_id">
              <td>{{ user.Username }}</td>
              <td>{{ user.Email }}</td>
              <td>{{ user.No_hp }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.User_id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tabel Driver -->
    <h3>Driver</h3>
    <div class="table-container">
      <div class="table-scrollable">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in driverUsers" :key="user.User_id">
              <td>{{ user.Username }}</td>
              <td>{{ user.Email }}</td>
              <td>{{ user.No_hp }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.User_id)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah/Edit Pengguna -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ isEditing ? "Edit Pengguna" : "Tambah Pengguna" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" v-model="form.Username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.Email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">No. HP</label>
                <input type="text" id="phone" v-model="form.No_hp" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" v-model="form.Password" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select id="role" v-model="form.Role" class="form-control" required>
                  <option value="admin">Admin</option>
                  <option value="driver">Driver</option>
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
      adminUsers: [],
      driverUsers: [],
      isEditing: false,
      form: {
        User_id: null,
        Username: "",
        Email: "",
        No_hp: "",
        Password: "",
        Role: "admin",
      },
      confirmPassword: "", // Tambahkan ini
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  methods: {
    fetchUsers() {
      axios
        .get("/users")
        .then((response) => {
          console.log("Fetched users:", response.data);
          this.adminUsers = response.data.filter((user) => user.Role === "admin");
          this.driverUsers = response.data.filter((user) => user.Role === "driver");
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    showAddUserModal() {
      this.isEditing = false;
      this.form = {
        User_id: null,
        Username: "",
        Email: "",
        No_hp: "",
        Password: "",
        Role: "admin",
      };
      this.confirmPassword = ""; // Reset confirmPassword
      const userModal = new Modal(document.getElementById("userModal"));
      userModal.show();
    },
    editUser(user) {
      this.isEditing = true;
      this.form = { ...user };
      this.confirmPassword = user.Password; // Reset confirmPassword
      const userModal = new Modal(document.getElementById("userModal"));
      userModal.show();
    },
    saveUser() {
      if (this.form.Password !== this.confirmPassword) {
        this.showAlertMessage("Password dan konfirmasi password tidak sesuai.", "alert-danger");
        return;
      }

      const user = { ...this.form };
      if (this.isEditing) {
        axios
          .put(`/users/${user.User_id}`, user)
          .then(() => {
            this.fetchUsers();
            const userModal = Modal.getInstance(document.getElementById("userModal"));
            userModal.hide();
            this.showAlertMessage("Pengguna berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui pengguna.", "alert-danger");
          });
      } else {
        axios
          .post("/users", user)
          .then(() => {
            this.fetchUsers();
            const userModal = Modal.getInstance(document.getElementById("userModal"));
            userModal.hide();
            this.showAlertMessage("Pengguna berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan pengguna.", "alert-danger");
          });
      }
    },
    confirmDelete(userId) {
      if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
        this.deleteUser(userId);
      }
    },
    deleteUser(userId) {
      axios
        .delete(`/users/${userId}`)
        .then(() => {
          this.fetchUsers();
          this.showAlertMessage("Pengguna berhasil dihapus.", "alert-success");
        })
        .catch(() => {
          this.showAlertMessage("Gagal menghapus pengguna.", "alert-danger");
        });
    },
    showAlertMessage(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // Notifikasi akan hilang setelah 3 detik
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Style khusus untuk UserManagement.vue */
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050; /* Lebih tinggi dari modal */
  max-width: 300px;
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}

.alert.hidden {
  opacity: 0;
}

/* Pastikan table-container bisa menampung overflow secara horizontal */
.table-container {
  max-height: 175px; /* Maksimal dua baris yang terlihat */
  overflow-y: auto; /* Scroll secara vertikal */
  -webkit-overflow-scrolling: touch; /* untuk scroll yang smooth di perangkat mobile */
  margin-top: 20px;
}

/* Buat tabel dapat digeser secara horizontal */
.table-scrollable {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

/* Atur tabel dan kolom untuk mencegah wrapping */
.table th,
.table td {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background-color: white; /* atau sesuai warna latar belakang tabel */
  z-index: 2; /* Supaya tetap berada di atas */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}


/* Style khusus untuk UserManagement.vue */
.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

@media (max-width: 576px) {
  .modal-dialog {
    max-width: 90%;
  }
}
</style>
