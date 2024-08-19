<template>
  <div class="container mt-4">
    <h2>Update Status Pesanan</h2>

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
            <tr v-for="pesanan in ongoingPesanans" :key="pesanan.pesanan_id">
              <td>{{ pesanan.rute }}</td>
              <td>{{ pesanan.tanggal_keberangkatan }}</td>
              <td>{{ pesanan.waktu_keberangkatan }}</td>
              <td>{{ pesanan.nama_pemesan }}</td>
              <td>{{ pesanan.contact_pemesan }}</td>
              <td>{{ pesanan.tipe_pesanan }}</td>
              <td>{{ pesanan.jumlah_kursi }}</td>
              <td>{{ pesanan.status }}</td>
              <td>
                <button class="btn btn-success btn-sm me-2" @click="markAsComplete(pesanan.pesanan_id)">Selesai</button>
              </td>
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
      ongoingPesanans: [
        {
          pesanan_id: 1,
          rute: "Pontianak - Entikong",
          tanggal_keberangkatan: "2024-08-19",
          waktu_keberangkatan: "10:00",
          nama_pemesan: "Rohit",
          contact_pemesan: "087876544545",
          tipe_pesanan: "Orang",
          jumlah_kursi: 1,
          status: "Dikerjakan",
        },
        {
          pesanan_id: 2,
          rute: "Pontianak - Balai Karangan",
          tanggal_keberangkatan: "2024-08-19",
          waktu_keberangkatan: "10:00",
          nama_pemesan: "Lusi",
          contact_pemesan: "085346567665",
          tipe_pesanan: "Barang",
          jumlah_kursi: 2,
          status: "Dikerjakan",
        },
        // Tambahkan data lainnya di sini
      ],
      alertMessage: "",
      alertType: "",
      showAlert: false,
    };
  },
  methods: {
    markAsComplete(pesananId) {
      const pesananIndex = this.ongoingPesanans.findIndex((p) => p.pesanan_id === pesananId);
      if (pesananIndex !== -1) {
        this.ongoingPesanans[pesananIndex].status = "Selesai";
        this.showAlertMessage("Pesanan berhasil diselesaikan.", "alert-success");
      } else {
        this.showAlertMessage("Gagal menyelesaikan pesanan.", "alert-danger");
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
