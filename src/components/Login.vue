<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
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
  /* Add your styles here */
  </style>
  