<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px;">
      <div class="card-body text-center">
        <img src="@/assets/logowira.png" alt="Wira Taxi Logo" class="mb-4" style="width: 100px;">
        <h2 class="h3 mb-3 font-weight-normal">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" class="form-control" required>
          </div>
          <div class="form-group mt-3">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Implement login logic here
      // After login, redirect based on role
      const role = 'admin'; // Example role, replace with actual role checking logic
      if (role === 'admin') {
        this.$router.push('/admin-dashboard');
      } else if (role === 'driver') {
        this.$router.push('/driver-dashboard');
      }
    }
  }
};
</script>

<style scoped>
/* Style tambahan untuk halaman login */
</style>
