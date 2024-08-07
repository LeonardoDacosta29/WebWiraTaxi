<template>
    <div>
      <Header />
      <DriverSidebar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import DriverSidebar from '../components/DriverSidebar.vue';
  import Footer from '../components/Footer.vue';
  import Dashboard from '../components/Dashboard.vue';
  
  export default {
    name: 'DriverDashboardView',
    components: {
      Header,
      DriverSidebar,
      Footer,
      Dashboard
    }
  };
  </script>
  
  <style scoped>
  /* Style khusus untuk DriverDashboardView */
  </style>
  