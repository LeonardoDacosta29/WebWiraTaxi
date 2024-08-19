<template>
    <div class="container mt-4">
      <h2>Manajemen Laporan</h2>
  
      <!-- Tombol Filter -->
      <div class="d-flex justify-content-between mb-3">
        <button class="btn btn-primary" @click="toggleFilterForm">Filter</button>
        <button class="btn btn-success" @click="saveOrPrintReport">Save / Cetak Laporan</button>
      </div>
  
      <!-- Form Filter -->
      <div v-if="showFilterForm" class="card mb-4">
        <div class="card-body">
          <form @submit.prevent="applyFilter">
            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="filterTanggal" class="form-label">Tanggal</label>
                <input type="date" id="filterTanggal" v-model="filter.tanggal" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                <label for="filterBulan" class="form-label">Bulan</label>
                <select id="filterBulan" v-model="filter.bulan" class="form-control">
                  <option value="">Pilih Bulan</option>
                  <option v-for="bulan in bulanOptions" :key="bulan.value" :value="bulan.value">
                    {{ bulan.text }}
                  </option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="filterTahun" class="form-label">Tahun</label>
                <input type="number" id="filterTahun" v-model="filter.tahun" class="form-control" min="2000" max="2100" />
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="filterRute" class="form-label">Rute</label>
                <select id="filterRute" v-model="filter.rute" class="form-control">
                  <option value="">Pilih Rute</option>
                  <option v-for="rute in ruteOptions" :key="rute.value" :value="rute.value">
                    {{ rute.text }}
                  </option>
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="filterTipe" class="form-label">Tipe</label>
                <select id="filterTipe" v-model="filter.tipe" class="form-control">
                  <option value="">Pilih Tipe</option>
                  <option value="Orang">Orang</option>
                  <option value="Barang">Barang</option>
                </select>
              </div>
            </div>
  
            <button type="submit" class="btn btn-primary">Terapkan Filter</button>
          </form>
        </div>
      </div>
  
      <!-- Tabel Laporan -->
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
              <tr v-for="pesanan in filteredPesanans" :key="pesanan.pesanan_id">
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
  export default {
    data() {
      return {
        showFilterForm: false,
        filter: {
          tanggal: "",
          bulan: "",
          tahun: "",
          rute: "",
          tipe: "",
        },
        bulanOptions: [
          { value: "01", text: "Januari" },
          { value: "02", text: "Februari" },
          { value: "03", text: "Maret" },
          { value: "04", text: "April" },
          { value: "05", text: "Mei" },
          { value: "06", text: "Juni" },
          { value: "07", text: "Juli" },
          { value: "08", text: "Agustus" },
          { value: "09", text: "September" },
          { value: "10", text: "Oktober" },
          { value: "11", text: "November" },
          { value: "12", text: "Desember" },
        ],
        ruteOptions: [
          { value: "Pontianak - Entikong", text: "Pontianak - Entikong" },
          { value: "Balai Karangan - Pontianak", text: "Balai Karangan - Pontianak" },
          { value: "Kembayan - Pontianak", text: "Kembayan - Pontianak" },
        ],
        pesanans: [
          // Data statis untuk pesanan yang sudah selesai
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
            driver: "Budi",
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
            driver: "Slamet",
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
            driver: "Budi",
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
            driver: "Slamet",
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
            driver: "Budi",
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
            driver: "Slamet",
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
            driver: "Budi",
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
            driver: "Slamet",
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
            driver: "Budi",
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
            driver: "Slamet",
            status: "Selesai",
          },
        ],
        filteredPesanans: [], // Array untuk menyimpan hasil filter
        alertMessage: "",
        alertType: "",
        showAlert: false,
      };
    },
    created() {
      this.filteredPesanans = this.pesanans; // Awalnya tampilkan semua data
    },
    methods: {
      toggleFilterForm() {
        this.showFilterForm = !this.showFilterForm;
      },
      applyFilter() {
        this.filteredPesanans = this.pesanans.filter((pesanan) => {
          return (
            (!this.filter.tanggal || pesanan.tanggal === this.filter.tanggal) &&
            (!this.filter.bulan || pesanan.tanggal.slice(5, 7) === this.filter.bulan) &&
            (!this.filter.tahun || pesanan.tanggal.slice(0, 4) === this.filter.tahun) &&
            (!this.filter.rute || pesanan.rute === this.filter.rute) &&
            (!this.filter.tipe || pesanan.tipe === this.filter.tipe)
          );
        });
      },
      saveOrPrintReport() {
        // Logika untuk menyimpan atau mencetak laporan
        this.showAlertMessage("Laporan berhasil disimpan atau dicetak.", "alert-success");
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
  