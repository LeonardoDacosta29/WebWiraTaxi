<template>
  <div>
    <AppHeader />
    <DriverSidebar />
    <main>
      <AppDashboard />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import DriverSidebar from "../components/DriverSidebar.vue";
import AppFooter from "../components/AppFooter.vue";
import AppDashboard from "../components/AppDashboard.vue";

export default {
  name: "DriverDashboardView",
  components: {
    AppHeader,
    DriverSidebar,
    AppFooter,
    AppDashboard,
  },
};
</script>

<style scoped>
/* Style khusus untuk DriverDashboardView */
</style>
