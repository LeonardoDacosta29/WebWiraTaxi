<template>
    <div class="container-fluid">
      <div class="row">
        <!-- List Pesanan -->
        <div class="col-md-3 mb-4">
          <div class="card bg-primary text-white h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="bi bi-list-check"></i>
              </div>
              <div class="card-text">
                <div class="mr-5">List Pesanan</div>
                <h3>50</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Pesanan Berlangsung -->
        <div class="col-md-3 mb-4">
          <div class="card bg-warning text-white h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="bi bi-car-front-fill"></i>
              </div>
              <div class="card-text">
                <div class="mr-5">Pesanan Berlangsung</div>
                <h3>120</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Jumlah Setoran -->
        <div class="col-md-3 mb-4">
          <div class="card bg-success text-white h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="bi bi-cash"></i>
              </div>
              <div class="card-text">
                <div class="mr-5">Jumlah Setoran Hari Ini</div>
                <h3>Rp 900.000</h3>
              </div>
            </div>
          </div>
        </div>
        <!-- Riwayat -->
        <div class="col-md-3 mb-4">
          <div class="card bg-info text-white h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <div class="card-text">
                <div class="mr-5">Riwayat</div>
                <h3>75</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AppDriverDashboard",
    data() {
      return {
        // Data statistik bisa dimasukkan di sini, ini hanya contoh statis.
        listPesanan: 50,
        pesananBerlangsung: 120,
        jumlahSetoran: "Rp 5.000.000",
        riwayat: 75
      };
    },
  };
  </script>
  
  <style scoped>
  .card-body-icon {
    font-size: 2rem;
    position: absolute;
    top: 20px;
    right: 20px;
    opacity: 0.4;
  }
  
  .card-text {
    position: relative;
    z-index: 2;
  }
  </style>
  