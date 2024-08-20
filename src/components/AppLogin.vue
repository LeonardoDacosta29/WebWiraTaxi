<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px">
      <div class="card-body text-center">
        <img src="@/assets/logowira.png" alt="Wira Taxi Logo" class="mb-4" style="width: 100px" />
        <h2 class="h3 mb-3 font-weight-normal">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" class="form-control" required />
          </div>
          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" maxlength="8" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axiosConfig";

export default {
  name: "AppLogin",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "", // Untuk menyimpan pesan error
    };
  },
  methods: {
  async login() {
    try {
      const response = await axios.post("/users/login", {
        username: this.username,
        password: this.password,
      });

      if (response.data.success) {
        const userId = response.data.user_id; // Pastikan ini sesuai dengan respons dari server
        localStorage.setItem("user_id", userId); // Simpan user_id ke localStorage
        
        const role = response.data.role;
        if (role === "admin") {
          this.$router.push("/admin-dashboard");
        } else if (role === "driver") {
          this.$router.push("/driver-dashboard");
        }
      } else {
        this.errorMessage = response.data.message;
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = error.response?.data.message || "Terjadi kesalahan saat menghubungi server";
    }
  }
}

  //   async login() {
  //     try {
  //       // Kirim permintaan login ke backend
  //       const response = await axios.post("/users/login", {
  //         username: this.username,
  //         password: this.password,
  //       });

  //       // Jika login berhasil
  //       if (response.data.success) {
  //         const role = response.data.role; // Misal, response mengandung peran pengguna
  //         if (role === "admin") {
  //           this.$router.push("/admin-dashboard");
  //         } else if (role === "driver") {
  //           this.$router.push("/driver-dashboard");
  //         }
  //       } else {
  //         this.errorMessage = response.data.message;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       // Jika ada masalah dengan koneksi atau server
  //     this.errorMessage = error.response?.data.message || "Terjadi kesalahan saat menghubungi server";
  //     }
  //   }
  // },
};
</script>

<style scoped>
/* Style tambahan untuk halaman login */
</style>
