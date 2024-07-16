<template>
  <div id="app">
    <AdminHeader/>
    <div class="d-flex">
      <AdminSidebar />
      <main class="flex-fill p-3">
        <AdminDashboard />
      </main>
    </div>
    <!-- <HelloWorld /> -->
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
