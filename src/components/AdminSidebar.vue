i
<template>
  <div>
    <div :class="['sidebar shadow-lg', { 'sidebar-hidden': !isSidebarVisible, 'd-md-block': true }]" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <!-- <a v-for="item in menuItems" :key="item.name" href="#" :class="['list-group-item', 'list-group-item-action', { active: activeItem === item.name }]" @click="setActive(item.name)"> -->
        <router-link v-for="item in menuItems" :key="item.name" :to="item.route" class="list-group-item list-group-item-action" :class="{ active: $route.path === item.route }" @click="setActive(item.name)">
          <i :class="item.icon" class="me-2"></i>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSidebar",
  props: {
    isSidebarVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      menuItems: [
        { name: "Dashboard Utama", icon: "bi bi-house-door", route: "/admin-dashboard" },
        { name: "Pemesanan", icon: "bi bi-journal", route: "#" },
        { name: "Manajemen Driver", icon: "bi bi-people", route: "/admin-dashboard/manajemen-driver" },
        { name: "Manajemen Kendaraan", icon: "bi bi-truck", route: "#" },
        { name: "Manajemen Tarif", icon: "bi bi-cash-stack", route: "#" },
        { name: "Pemantauan", icon: "bi bi-eye", route: "#" },
        { name: "Manajemen User", icon: "bi bi-person-circle", route: "/admin-dashboard/manajemen-user" },
        { name: "Laporan", icon: "bi bi-graph-up" },
      ],
      activeItem: "Dashboard Utama",
    };
  },
  methods: {
    setActive(itemName) {
      this.activeItem = itemName;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px; /* Lebar sidebar */
}
.sidebar-hidden {
  display: none; /* Sembunyikan sidebar */
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
    z-index: 1000;
  }
}
</style>
