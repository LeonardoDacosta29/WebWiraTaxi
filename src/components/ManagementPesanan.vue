<template>
  <div class="container mt-4">
    <h2>Manajemen Pesanan</h2>
    <button class="btn btn-primary mb-3" @click="showAddPesananModal">Buat Pesanan</button>

    <!-- Tabel Pesanan Pending -->
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
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pesanan in pendingPesanans" :key="pesanan.pending_pesanan_id">
              <td>{{ getRouteName(pesanan.rute_id) }}</td>
              <td>{{ pesanan.tanggal_pemesanan }}</td>
              <td>{{ pesanan.waktu_pemesanan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.status }}</td>
              <td>
                <button class="btn btn-success btn-sm me-2" @click="accPesanan(pesanan)">Acc</button>
                <button class="btn btn-danger btn-sm" @click="batalPesanan(pesanan.pending_pesanan_id)">Batal</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Buat/Edit Pesanan -->
    <div class="modal fade" id="pesananModal" tabindex="-1" aria-labelledby="pesananModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="pesananModalLabel">{{ isEditing ? "Edit Pesanan" : "Buat Pesanan" }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePesanan">
              <div class="mb-3">
                <label for="rute" class="form-label">Rute</label>
                <select id="rute" v-model="form.rute_id" class="form-control" required>
                  <option v-for="route in routes" :key="route.rute_id" :value="route.rute_id">{{ route.lokasi_asal }} - {{ route.lokasi_tujuan }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="tanggalPemesanan" class="form-label">Tanggal Pemesanan</label>
                <input type="date" id="tanggalPemesanan" v-model="form.tanggal_pemesanan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="waktuPemesanan" class="form-label">Waktu</label>
                <select id="waktuPemesanan" v-model="form.waktu_pemesanan" class="form-control" required>
                  <option value="10.00">10.00</option>
                  <option value="13.00">13.00</option>
                  <option value="16.00">16.00</option>
                  <option value="19.00">19.00</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="namaPemesan" class="form-label">Nama</label>
                <input type="text" id="namaPemesan" v-model="form.nama_pemesan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="contactPemesan" class="form-label">No. HP</label>
                <input type="text" id="contactPemesan" v-model="form.contact_pemesan" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="tipePesanan" class="form-label">Tipe</label>
                <select id="tipePesanan" v-model="form.tipe_pesanan" class="form-control" required>
                  <option value="Orang">Orang</option>
                  <option value="Barang">Barang</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="driver" class="form-label">Driver</label>
                <select id="driver" v-model="form.driver_id" class="form-control">
                  <option v-for="driver in drivers" :key="driver.driver_id" :value="driver.driver_id">
                    {{ driver.nama_lengkap }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="jumlahKursi" class="form-label">Jumlah</label>
                <input type="number" id="jumlahKursi" v-model="form.jumlah_kursi" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="deskripsiBarang" class="form-label">Deskripsi Barang</label>
                <textarea id="deskripsiBarang" v-model="form.deskripsi_barang" class="form-control"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
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
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      pendingPesanans: [],
      routes: [], // Data rute yang akan diambil dari database
      drivers: [],
      isEditing: false,
      form: {
        rute_id: null, // Menggunakan rute_id sebagai nilai inputan
        tanggal_keberangkatan: "",
        waktu_keberangkatan: "10.00",
        nama_pemesan: "",
        contact_pemesan: "",
        tipe_pesanan: "Orang",
        jumlah_kursi: 1,
        deskripsi_barang: "",
        driver_id: null,
      },
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  async mounted() {
    await this.fetchPendingPesanans();
    await this.fetchRoutes(); // Panggil method untuk mengambil data rute
    await this.fetchDrivers(); // Panggil method untuk mengambil data driver
  },
  methods: {
    async fetchPendingPesanans() {
      try {
        const response = await axios.get("/pesanan/pending");
        this.pendingPesanans = response.data;
      } catch (error) {
        console.error("Error fetching pending pesanans:", error);
      }
    },
    async fetchRoutes() {
      try {
        const response = await axios.get("/ruteTarif");
        this.routes = response.data; // Menyimpan data rute untuk ditampilkan dalam opsi
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    },
    async fetchDrivers() {
      try {
        const response = await axios.get("/drivers"); // Pastikan endpoint ini sesuai dengan backend kamu
        this.drivers = response.data; // Simpan data driver
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },

    showAddPesananModal() {
      this.isEditing = false;
      this.form = {
        rute_id: null,
        tanggal_keberangkatan: "",
        waktu_keberangkatan: "10.00",
        nama_pemesan: "",
        contact_pemesan: "",
        tipe_pesanan: "Orang",
        jumlah_kursi: 1,
        deskripsi_barang: "",
        driver_id: null, // Pastikan reset driver_id juga
      };
      const pesananModal = new Modal(document.getElementById("pesananModal"));
      pesananModal.show();
    },
    calculateTarif(rute_id, tipe_pesanan) {
      const selectedRoute = this.routes.find((route) => route.rute_id === rute_id);
      if (selectedRoute) {
        return tipe_pesanan === "Orang" ? selectedRoute.tarif_orang : selectedRoute.tarif_barang;
      }
      return 0;
    },
    savePesanan() {
      const pesanan = { ...this.form };
      pesanan.tarif = this.calculateTarif(pesanan.rute_id, pesanan.tipe_pesanan); // Kalkulasi tarif
      if (!pesanan.driver_id) {
        delete pesanan.driver_id;
      }
      if (this.isEditing) {
        axios
          .put(`/pesanan/pending/${this.editingPesananId}`, pesanan)
          .then(() => {
            this.fetchPendingPesanans();
            const pesananModal = Modal.getInstance(document.getElementById("pesananModal"));
            pesananModal.hide();
            this.showAlertMessage("Pesanan berhasil diperbarui.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal memperbarui pesanan.", "alert-danger");
          });
      } else {
        axios
          .post("/pesanan/pending", pesanan)
          .then(() => {
            this.fetchPendingPesanans();
            const pesananModal = Modal.getInstance(document.getElementById("pesananModal"));
            pesananModal.hide();
            this.showAlertMessage("Pesanan berhasil ditambahkan.", "alert-success");
          })
          .catch(() => {
            this.showAlertMessage("Gagal menambahkan pesanan.", "alert-danger");
          });
      }
    },
    getRouteName(routeId) {
      const route = this.routes.find((route) => route.rute_id === routeId);
      return route ? `${route.lokasi_asal} - ${route.lokasi_tujuan}` : "Rute Tidak Ditemukan";
    },
    accPesanan(pesanan) {
      // Logika untuk meng-ACC pesanan dan memindahkannya ke tabel pesanan
      const pesananAcc = {
        ...pesanan,
        kendaraan_id: null, // Sesuaikan dengan kendaraan yang tersedia
        status: "ACC",
        tarif: this.calculateTarif(pesanan.rute_id, pesanan.tipe_pesanan), // Pastikan tarif dihitung di sini juga
        driver_id: pesanan.driver_id, // Pastikan driver_id dikirimkan ke backend
      };
      axios
        .post(`/pesanan/acc/${pesanan.pending_pesanan_id}`, pesananAcc) // Ubah URL untuk sesuai dengan backend
        .then(() => {
          axios
            .delete(`/pesanan/pending/${pesanan.pending_pesanan_id}`) // Ubah URL untuk delete pesanan
            .then(() => {
              this.fetchPendingPesanans();
              this.showAlertMessage("Pesanan berhasil di-ACC dan dipindahkan ke tabel pesanan.", "alert-success");
            })
            .catch(() => {
              this.showAlertMessage("Gagal menghapus pesanan dari tabel pending.", "alert-danger");
            });
        })
        .catch(() => {
          this.showAlertMessage("Gagal meng-ACC pesanan.", "alert-danger");
        });
    },
    batalPesanan(pesananId) {
      axios
        .put(`/pesanan/cancel/${pesananId}`, { status: "Dibatalkan" }) // Ubah URL untuk cancel pesanan
        .then(() => {
          this.fetchPendingPesanans();
          this.showAlertMessage("Pesanan berhasil dibatalkan.", "alert-success");
        })
        .catch(() => {
          this.showAlertMessage("Gagal membatalkan pesanan.", "alert-danger");
        });
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
