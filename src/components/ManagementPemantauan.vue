<template>
    <div class="container mt-4">
      <h2>Pesanan yang Sedang Berlangsung</h2>
  
      <!-- Tabel Pesanan yang Sedang Dikerjakan -->
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
                <th>Kursi</th>
                <th>Tarif</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pesanan in ongoingPesanans" :key="pesanan.pesanan_id">
                <td>{{ pesanan.rute }}</td>
                <td>{{ pesanan.tanggal }}</td>
                <td>{{ pesanan.waktu }}</td>
                <td>{{ pesanan.nama }}</td>
                <td>{{ pesanan.noHP }}</td>
                <td>{{ pesanan.tipe }}</td>
                <td>{{ pesanan.kursi }}</td>
                <td>{{ pesanan.tarif }}</td>
                <td>{{ pesanan.driver }}</td>
                <td>{{ pesanan.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Notifikasi -->
      <div v-if="showAlert" :class="['alert', alertType]" role="alert" ref="alertBox">
        {{ alertMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "../axiosConfig";
//   import { Modal } from "bootstrap";
  
  export default {
    data() {
      return {
        ongoingPesanans: [
          {
            pesanan_id: 1,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-19",
            waktu: "13:00",
            nama: "Andi",
            noHP: "081234567890",
            tipe: "Orang",
            kursi: 2,
            tarif: "Rp 300.000",
            driver: "Budi",
            status: "Dikerjakan",
          },
          {
            pesanan_id: 2,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-19",
            waktu: "16:00",
            nama: "Rina",
            noHP: "081298765432",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 500.000",
            driver: "Slamet",
            status: "Dikerjakan",
          },
          {
            pesanan_id: 3,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-19",
            waktu: "13:00",
            nama: "Siti",
            noHP: "081345678901",
            tipe: "Orang",
            kursi: 1,
            tarif: "Rp 250.000",
            driver: "Budi",
            status: "Dikerjakan",
          },
          {
            pesanan_id: 4,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-19",
            waktu: "16:00",
            nama: "Agus",
            noHP: "081456789012",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 450.000",
            driver: "Slamet",
            status: "Dikerjakan",
          },
          {
            pesanan_id: 5,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-19",
            waktu: "13:00",
            nama: "Dewi",
            noHP: "081567890123",
            tipe: "Orang",
            kursi: 3,
            tarif: "Rp 350.000",
            driver: "Budi",
            status: "Dikerjakan",
          },
          {
            pesanan_id: 6,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-19",
            waktu: "16:00",
            nama: "Joko",
            noHP: "081678901234",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 400.000",
            driver: "Slamet",
            status: "Dikerjakan",
          },
        ], // Array data statis untuk pesanan yang sedang dikerjakan
        alertMessage: "",
        alertType: "",
        showAlert: false,
      };
    },
    async mounted() {
      //await this.fetchOngoingPesanans(); // Uncomment ini jika nanti ingin mengambil data dari API
    },
    methods: {
      async fetchOngoingPesanans() {
        try {
          const response = await axios.get("/pesanan/ongoing"); // Pastikan endpoint ini sesuai dengan backend kamu
          this.ongoingPesanans = response.data;
        } catch (error) {
          console.error("Error fetching ongoing pesanans:", error);
        }
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
  /* Style sama seperti di ManagementPesanan.vue */
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
  
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  
  @media (max-width: 576px) {
    .modal-dialog {
      max-width: 90%;
    }
  }
  
  .modal-content .form-control {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
  
  select.form-control option {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
  </style>
  