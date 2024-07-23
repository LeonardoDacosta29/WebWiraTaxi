<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Statistik Driver Aktif -->
      <div class="col-md-3 mb-4">
        <div class="card bg-primary text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Jumlah Driver Taksi Aktif</div>
              <h3>50</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Perjalanan Hari Ini -->
      <div class="col-md-3 mb-4">
        <div class="card bg-warning text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-car-front-fill"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Perjalanan Sedang Berlangsung</div>
              <h3>120</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Total Pendapatan -->
      <div class="col-md-3 mb-4">
        <div class="card bg-success text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-currency-dollar"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Total Pendapatan Hari Ini</div>
              <h3>$5,000</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- Statistik Lainnya -->
      <div class="col-md-3 mb-4">
        <div class="card bg-info text-white h-100">
          <div class="card-body">
            <div class="card-body-icon">
              <i class="bi bi-graph-up"></i>
            </div>
            <div class="card-text">
              <div class="mr-5">Statistik Lainnya</div>
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
  name: "AdminDashboard",
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
