<template>
    <div>
      <div :class="['sidebar shadow-lg', { 'sidebar-hidden': !isSidebarVisible, 'd-md-block': true }]" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
          <a v-for="item in menuItems" :key="item.name" href="#" 
             :class="['list-group-item', 'list-group-item-action', { 'active': activeItem === item.name }]"
             @click="setActive(item.name)">
             <i :class="item.icon" class="me-2"></i>
             {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DriverSidebar',
    props: {
      isSidebarVisible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        menuItems: [
        { name: 'Dashboard Utama', icon: "bi bi-house-door" },
        { name: 'Riwayat Perjalanan', icon: "bi bi-clock-history" },
        { name: 'Pengaturan Profil', icon: "bi bi-gear" }
        ],
        activeItem: 'Dashboard Utama'
      };
    },
    methods: {
      setActive(itemName) {
        this.activeItem = itemName;
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
  }
  .sidebar-hidden {
    display: none;
  }
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      height: 100%;
      z-index: 1000;
    }
  }
  </style>
  