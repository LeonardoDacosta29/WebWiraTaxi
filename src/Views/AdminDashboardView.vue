<template>
    <div>
      <Header />
      <AdminSidebar />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import AdminSidebar from '../components/AdminSidebar.vue';
  import Footer from '../components/Footer.vue';
  import Dashboard from '../components/Dashboard.vue';
  
  export default {
    name: 'AdminDashboardView',
    components: {
      Header,
      AdminSidebar,
      Footer,
      Dashboard
    }
  };
  </script>
  
  <style scoped>
  /* Style khusus untuk AdminDashboardView */
  </style>
  