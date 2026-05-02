import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.html',
  styleUrl: './exportar.scss',
})
export class Exportar {
  private api = inject(ApiService);
  loading = signal(false);
  error = signal('');

  exportar() {
    this.loading.set(true);
    this.error.set('');
    this.api.exportData().subscribe({
      next: (data) => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `botellas-export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al exportar: ' + err.message);
        this.loading.set(false);
      },
    });
  }
}
