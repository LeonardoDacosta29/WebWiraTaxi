<template>
    <div class="container mt-4">
      <h2>Daftar Pesanan Driver</h2>
  
      <!-- Tabel Daftar Pesanan -->
      <div class="table-container">
        <div class="table-scrollable">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Rute</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Nama</th>
                <th>No. HP</th>
                <th>Tipe</th>
                <th>Kursi/Barang</th>
                <th>Tarif</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pesanan in driverPesanans" :key="pesanan.pesanan_id">
                <td>{{ pesanan.rute }}</td>
                <td>{{ pesanan.tanggal }}</td>
                <td>{{ pesanan.waktu }}</td>
                <td>{{ pesanan.nama }}</td>
                <td>{{ pesanan.noHP }}</td>
                <td>{{ pesanan.tipe }}</td>
                <td>{{ pesanan.jumlah_kursi || 'Barang' }}</td>
                <td>{{ pesanan.tarif }}</td>
                <td>{{ pesanan.status }}</td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="kerjakanPesanan(pesanan.pesanan_id)">Kerjakan</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        driverPesanans: [
          {
            pesanan_id: 1,
            rute: "Pontianak - Kembayan",
            tanggal: "2024-08-20",
            waktu: "10:00",
            nama: "Ali",
            noHP: "081234567890",
            tipe: "Orang",
            jumlah_kursi: 3,
            tarif: "Rp 350.000",
            status: "ACC",
          },
          {
            pesanan_id: 2,
            rute: "Pontianak - Balai Karangan",
            tanggal: "2024-08-20",
            waktu: "10:00",
            nama: "Budi",
            noHP: "081298765432",
            tipe: "Barang",
            jumlah_kursi: 0,
            tarif: "Rp 500.000",
            status: "ACC",
          },
          {
            pesanan_id: 3,
            rute: "Pontianak - Kembayan",
            tanggal: "2024-08-21",
            waktu: "16:00",
            nama: "Cici",
            noHP: "082234567890",
            tipe: "Orang",
            jumlah_kursi: 2,
            tarif: "Rp 300.000",
            status: "ACC",
          },
          {
            pesanan_id: 4,
            rute: "Pontianak - Balai Karangan",
            tanggal: "2024-08-21",
            waktu: "16:00",
            nama: "Doni",
            noHP: "082198765432",
            tipe: "Barang",
            jumlah_kursi: 0,
            tarif: "Rp 550.000",
            status: "ACC",
          },
        ],
        alertMessage: "",
        alertType: "",
        showAlert: false,
      };
    },
    methods: {
      kerjakanPesanan(pesananId) {
        // Logika untuk mengubah status pesanan menjadi "Dikerjakan"
        // dan memperbarui di backend jika sudah terhubung
        this.driverPesanans = this.driverPesanans.map((pesanan) =>
          pesanan.pesanan_id === pesananId
            ? { ...pesanan, status: "Dikerjakan" }
            : pesanan
        );
        this.showAlertMessage("Pesanan sedang dikerjakan.", "alert-success");
      },
      showAlertMessage(message, type) {
        this.alertMessage = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
    },
  };
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
    max-width: 300px;
    opacity: 0.9;
    transition: opacity 0.3s ease-in-out;
  }
  
  .table-container {
    max-height: 450px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 20px;
  }
  
  .table-scrollable {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .table th,
  .table td {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .table-container thead th {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 2;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }
  </style>
  