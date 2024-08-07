<template>
  <div class="container mt-4">
    <h2>Manajemen Pengguna</h2>
    <button class="btn btn-primary mb-3" @click="showAddUserModal">Tambah Pengguna</button>

    <!-- Tabel Admin -->
    <h3>Admin</h3>
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

    <!-- Tabel Driver -->
    <h3>Driver</h3>
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

    <!-- Modal Tambah/Edit Pengguna -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" v-model="form.Username" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.Email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">No. HP</label>
                <input type="text" id="phone" v-model="form.No_hp" class="form-control" required>
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
  </div>
</template>

<script>
import axios from '../axiosConfig';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      adminUsers: [],
      driverUsers: [],
      isEditing: false,
      form: {
        User_id: null,
        Username: '',
        Email: '',
        No_hp: '',
        Password: '',
        Role: 'admin'
      }
    };
  },
  methods: {
    fetchUsers() {
      axios.get('/users')
        .then(response => {
          console.log('Fetched users:', response.data);
          this.adminUsers = response.data.filter(user => user.Role === 'admin');
          this.driverUsers = response.data.filter(user => user.Role === 'driver');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    showAddUserModal() {
      this.isEditing = false;
      this.form = {
        User_id: null,
        Username: '',
        Email: '',
        No_hp: '',
        Password: '',
        Role: 'admin'
      };
      const userModal = new Modal(document.getElementById('userModal'));
      userModal.show();
    },
    editUser(user) {
      this.isEditing = true;
      this.form = { ...user };
      const userModal = new Modal(document.getElementById('userModal'));
      userModal.show();
    },
    saveUser() {
      const user = { ...this.form };
      if (this.isEditing) {
        axios.put(`/users/${user.User_id}`, user)
          .then(() => {
            this.fetchUsers();
            const userModal = Modal.getInstance(document.getElementById('userModal'));
            userModal.hide();
          })
          .catch(error => {
            console.error('Error saving user:', error);
          });
      } else {
        axios.post('/users', user)
          .then(() => {
            this.fetchUsers();
            const userModal = Modal.getInstance(document.getElementById('userModal'));
            userModal.hide();
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
      }
    },
    deleteUser(userId) {
      axios.delete(`/users/${userId}`)
        .then(() => {
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
/* Style khusus untuk UserManagement.vue */
</style>
