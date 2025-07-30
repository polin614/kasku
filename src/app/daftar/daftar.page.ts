import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.page.html',
  styleUrls: ['./daftar.page.scss'],
})
export class DaftarPage {
  tanggal_transaksi: string = '';
  jenis_transaksi: string = '';
  kategori: string = '';
  jumlah: number = 0;
  deskripsi: string = '';
  metode_pembayaran: string = '';
  catatan_tambahan: string = '';
  status: string = '';
  userid: string = 'user123'; // bisa diganti dinamis nanti

  constructor(private apiService: ApiService, private router: Router) {}

  isFormValid(): boolean {
    return (
      this.tanggal_transaksi !== '' &&
      this.jenis_transaksi !== '' &&
      this.kategori !== '' &&
      this.jumlah > 0
    );
  }

  inputTransaksi() {
    if (this.isFormValid()) {
      const data = {
        tanggal_transaksi: this.tanggal_transaksi,
        jenis_transaksi: this.jenis_transaksi,
        kategori: this.kategori,
        jumlah: this.jumlah,
        deskripsi: this.deskripsi,
        metode_pembayaran: this.metode_pembayaran,
        catatan_tambahan: this.catatan_tambahan,
        status: this.status,
        userid: this.userid
      };

      this.apiService.addpolinData(data).subscribe(response => {
        console.log('Transaksi berhasil ditambahkan:', response);
        this.resetForm();
        this.router.navigate(['/data']);
        this.apiService.getPendaftar().subscribe();
      });
    } else {
      console.log('Form belum lengkap');
    }
  }

  resetForm() {
    this.tanggal_transaksi = '';
    this.jenis_transaksi = '';
    this.kategori = '';
    this.jumlah = 0;
    this.deskripsi = '';
    this.metode_pembayaran = '';
    this.catatan_tambahan = '';
    this.status = '';
  }
}
