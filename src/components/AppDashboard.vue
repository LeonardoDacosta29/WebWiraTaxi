<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Statistik Pesanan Pending -->
      <div class="col-md-3 mb-4">
        <div class="card bg-danger text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-hourglass-split"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Pesanan Pending</div>
              <h3>30</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Pesanan Berlangsung -->
      <div class="col-md-3 mb-4">
        <div class="card bg-warning text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-clock"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Pesanan Berlangsung</div>
              <h3>15</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Driver Aktif -->
      <div class="col-md-3 mb-4">
        <div class="card bg-primary text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Driver Aktif</div>
              <h3>50</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Jumlah Setoran Hari Ini -->
      <div class="col-md-3 mb-4">
        <div class="card bg-success text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-currency-dollar"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Jumlah Setoran Hari Ini</div>
              <h3>Rp 1.800.000</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDashboard",
  data() {
    return {
      // Data statistik bisa dimasukkan di sini
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
