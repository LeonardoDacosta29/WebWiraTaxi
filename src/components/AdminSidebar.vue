<template>
  <div>
    <div :class="['sidebar shadow-lg', { 'sidebar-hidden': !isSidebarVisible, 'd-md-block': true }]" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <a v-for="item in menuItems" :key="item.name" href="#" :class="['list-group-item', 'list-group-item-action', { active: activeItem === item.name }]" @click="setActive(item.name)">
          {{ item.name }}
        </a>
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
        { name: "Dashboard Utama", icon: "bi bi-house-door" }, 
        { name: "Pemesanan" }, 
        { name: "Manajemen Driver" }, 
        { name: "Manajemen Kendaraan" }, 
        { name: "Manajemen Tarif" }, 
        { name: "Pemantauan" }, 
        { name: "Manajemen Pengguna" }, 
        { name: "Laporan" }
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
