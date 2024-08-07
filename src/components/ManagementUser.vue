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
        <tr v-for="user in adminUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Hapus</button>
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
        <tr v-for="user in driverUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Hapus</button>
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
                <input type="text" id="username" v-model="form.username" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">No. HP</label>
                <input type="text" id="phone" v-model="form.phone" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select id="role" v-model="form.role" class="form-control" required>
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
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      adminUsers: [],
      driverUsers: [],
      isEditing: false,
      form: {
        id: null,
        username: '',
        email: '',
        phone: '',
        role: 'admin'
      }
    };
  },
  methods: {
    showAddUserModal() {
      this.isEditing = false;
      this.form = {
        id: null,
        username: '',
        email: '',
        phone: '',
        role: 'admin'
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
      if (this.isEditing) {
        const userIndex = this[this.form.role + 'Users'].findIndex(user => user.id === this.form.id);
        this[this.form.role + 'Users'].splice(userIndex, 1, this.form);
      } else {
        this.form.id = Date.now();
        this[this.form.role + 'Users'].push(this.form);
      }
      const userModal = Modal.getInstance(document.getElementById('userModal'));
      userModal.hide();
    },
    deleteUser(userId) {
      this.adminUsers = this.adminUsers.filter(user => user.id !== userId);
      this.driverUsers = this.driverUsers.filter(user => user.id !== userId);
    }
  }
};
</script>

<style scoped>
/* Style khusus untuk UserManagement.vue */
</style>
