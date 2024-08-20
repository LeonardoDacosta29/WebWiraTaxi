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

    <!-- Chart Rute Terbanyak dan Pendapatan Bulanan -->
    <div class="row mb-4">
      <!-- Chart Rute Terbanyak -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Rute Terbanyak Bulan Ini</h5>
            <canvas id="ruteChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Chart Pendapatan Bulanan -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Pendapatan Bulanan</h5>
            <canvas id="pendapatanChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  name: "AppDashboard",
  data() {
    return {
      ruteLabels: ["Pontianak", "Entikong", "Kembayan", "Balai Karangan"], // Contoh data rute
      ruteData: [50, 30, 20, 10], // Contoh data jumlah pesanan per rute

      pendapatanLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Bulan dalam satu tahun
      pendapatanData: [1000000, 2000000, 1500000, 3000000, 2500000, 2000000], // Contoh data pendapatan per bulan
    };
  },
  mounted() {
    Chart.register(...registerables);

    // Chart Rute Terbanyak
    const ctxRute = document.getElementById("ruteChart").getContext("2d");
    new Chart(ctxRute, {
      type: "bar",
      data: {
        labels: this.ruteLabels,
        datasets: [
          {
            label: "Jumlah Pesanan",
            data: this.ruteData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Chart Pendapatan Bulanan
    const ctxPendapatan = document.getElementById("pendapatanChart").getContext("2d");
    new Chart(ctxPendapatan, {
      type: "line",
      data: {
        labels: this.pendapatanLabels,
        datasets: [
          {
            label: "Pendapatan",
            data: this.pendapatanData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
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
.card-title {
  text-align: center;
}

canvas {
  max-height: 400px;
}
</style>
