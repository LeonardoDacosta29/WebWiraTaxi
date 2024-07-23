<template>
  <div id="app">
    <div class="container-fluid">
      <AdminHeader/>
      <div class="row">
        <AdminSidebar class="col-2"/>
        <AdminDashboard class="col-10"/>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import AdminHeader from './components/AdminHeader.vue';
import AdminSidebar from './components/AdminSidebar.vue';
import AdminDashboard from './components/AdminDashboard.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    AdminHeader,
    AdminSidebar,
    AdminDashboard
  },
};
</script>
<!-- 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style> -->
