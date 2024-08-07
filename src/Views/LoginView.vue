<template>
    <div>
      <AppLogin />
    </div>
  </template>
  
  <script>
  import AppLogin from '../components/AppLogin.vue';
  
  export default {
    name: 'LoginView',
    components: {
        AppLogin
    }
  };
  </script>
  
  <style scoped>
  /* Style khusus untuk LoginView */
  </style>
  