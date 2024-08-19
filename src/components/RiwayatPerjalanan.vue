<template>
    <div class="container mt-4">
      <h2>Riwayat Perjalanan</h2>
  
      <!-- Filter Section -->
      <div class="filter-section mb-4">
        <button class="btn btn-primary" @click="showFilterModal">Filter</button>
      </div>
  
      <!-- Tabel Riwayat Perjalanan -->
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pesanan in filteredPesanans" :key="pesanan.pesanan_id">
                <td>{{ pesanan.rute }}</td>
                <td>{{ pesanan.tanggal }}</td>
                <td>{{ pesanan.waktu }}</td>
                <td>{{ pesanan.nama }}</td>
                <td>{{ pesanan.noHP }}</td>
                <td>{{ pesanan.tipe }}</td>
                <td>{{ pesanan.kursi }}</td>
                <td>{{ pesanan.tarif }}</td>
                <td>{{ pesanan.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Filter Modal -->
      <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="filterModalLabel">Filter Riwayat Perjalanan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="applyFilter">
                <div class="mb-3">
                  <label for="filterTanggal" class="form-label">Tanggal</label>
                  <input type="date" id="filterTanggal" v-model="filter.tanggal" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="filterRute" class="form-label">Rute</label>
                  <input type="text" id="filterRute" v-model="filter.rute" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="filterTipe" class="form-label">Tipe Pesanan</label>
                  <select id="filterTipe" v-model="filter.tipe" class="form-control">
                    <option value="">Semua</option>
                    <option value="Orang">Orang</option>
                    <option value="Barang">Barang</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                  <button type="submit" class="btn btn-primary">Terapkan Filter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from "bootstrap";
  
  export default {
    data() {
      return {
        pesanans: [
          {
            pesanan_id: 1,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-19",
            waktu: "13:00",
            nama: "Andi",
            noHP: "081234567890",
            tipe: "Orang",
            kursi: 2,
            tarif: "Rp 500.000",
            status: "Selesai",
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
            tarif: "Rp 100.000",
            status: "Selesai",
          },
          {
            pesanan_id: 3,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-18",
            waktu: "13:00",
            nama: "Siti",
            noHP: "081345678901",
            tipe: "Orang",
            kursi: 1,
            tarif: "Rp 250.000",
            status: "Selesai",
          },
          {
            pesanan_id: 4,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-18",
            waktu: "16:00",
            nama: "Agus",
            noHP: "081456789012",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 100.000",
            status: "Selesai",
          },
          {
            pesanan_id: 5,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-17",
            waktu: "13:00",
            nama: "Dewi",
            noHP: "081567890123",
            tipe: "Orang",
            kursi: 3,
            tarif: "Rp 750.000",
            status: "Selesai",
          },
          {
            pesanan_id: 6,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-17",
            waktu: "16:00",
            nama: "Joko",
            noHP: "081678901234",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 100.000",
            status: "Selesai",
          },
          {
            pesanan_id: 7,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-16",
            waktu: "13:00",
            nama: "Santi",
            noHP: "081789012345",
            tipe: "Orang",
            kursi: 1,
            tarif: "Rp 250.000",
            status: "Selesai",
          },
          {
            pesanan_id: 8,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-16",
            waktu: "16:00",
            nama: "Bambang",
            noHP: "081890123456",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 100.000",
            status: "Selesai",
          },
          {
            pesanan_id: 9,
            rute: "Pontianak - Entikong",
            tanggal: "2024-08-15",
            waktu: "13:00",
            nama: "Rina",
            noHP: "081901234567",
            tipe: "Orang",
            kursi: 2,
            tarif: "Rp 500.000",
            status: "Selesai",
          },
          {
            pesanan_id: 10,
            rute: "Balai Karangan - Pontianak",
            tanggal: "2024-08-15",
            waktu: "16:00",
            nama: "Yuli",
            noHP: "081012345678",
            tipe: "Barang",
            kursi: 0,
            tarif: "Rp 100.000",
            status: "Selesai",
          },
        ],
        filter: {
          tanggal: "",
          rute: "",
          tipe: "",
        },
        alertMessage: '',
        alertType: '',
        showAlert: false,
      };
    },
    computed: {
      filteredPesanans() {
        return this.pesanans.filter(pesanan => {
          return (
            (!this.filter.tanggal || pesanan.tanggal === this.filter.tanggal) &&
            (!this.filter.rute || pesanan.rute.includes(this.filter.rute)) &&
            (!this.filter.tipe || pesanan.tipe === this.filter.tipe)
          );
        });
      }
    },
    methods: {
      showFilterModal() {
        const filterModal = new Modal(document.getElementById("filterModal"));
        filterModal.show();
      },
      applyFilter() {
        const filterModal = Modal.getInstance(document.getElementById("filterModal"));
        filterModal.hide();
        this.showAlertMessage('Filter diterapkan.', 'alert-success');
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
  
  .filter-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
  