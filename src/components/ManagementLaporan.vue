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
              <td>{{ pesanan.lokasi_asal }} - {{ pesanan.lokasi_tujuan }}</td>
              <td>{{ formatDate(pesanan.tanggal_keberangkatan) }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.tarif }}</td>
              <td>{{ pesanan.driver_name || 'N/A' }}</td>
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
      pesanans: [], // Data pesanan akan diambil dari backend
      filteredPesanans: [], // Array untuk menyimpan hasil filter
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async created() {
    await this.fetchReportData(); // Ambil data laporan saat komponen dibuat
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    async fetchReportData() {
      try {
        const response = await axios.get("/pesanan/report"); // Panggil API untuk mengambil data laporan
        this.pesanans = response.data;
        this.filteredPesanans = this.pesanans; // Tampilkan semua data pada awalnya
      } catch (error) {
        console.error("Error fetching report data:", error);
        this.showAlertMessage("Gagal mengambil data laporan.", "alert-danger");
      }
    },
    toggleFilterForm() {
      this.showFilterForm = !this.showFilterForm;
    },

    /**
     * applyFilter adalah tempat penerapan algoritma pencarian sekuensial.
     * Algoritma ini melakukan iterasi melalui semua data pesanan (this.pesanans)
     * dan memilih hanya data yang memenuhi kriteria filter yang dipilih oleh pengguna.
     */
    applyFilter() {
      this.filteredPesanans = this.pesanans.filter((pesanan) => {
        return (
          // Memfilter berdasarkan tanggal keberangkatan
          (!this.filter.tanggal || pesanan.tanggal_keberangkatan === this.filter.tanggal) &&
          
          // Memfilter berdasarkan bulan
          (!this.filter.bulan || pesanan.tanggal_keberangkatan.slice(5, 7) === this.filter.bulan) &&
          
          // Memfilter berdasarkan tahun
          (!this.filter.tahun || pesanan.tanggal_keberangkatan.slice(0, 4) === this.filter.tahun) &&
          
          // Memfilter berdasarkan rute
          (!this.filter.rute || `${pesanan.lokasi_asal} - ${pesanan.lokasi_tujuan}` === this.filter.rute) &&
          
          // Memfilter berdasarkan tipe pesanan
          (!this.filter.tipe || pesanan.tipe_pesanan === this.filter.tipe)
        );
      });
    },

    saveOrPrintReport() {
      window.print(); // Cetak laporan
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
