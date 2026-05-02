import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-importar',
  templateUrl: './importar.html',
  styleUrl: './importar.scss',
})
export class Importar {
  private api = inject(ApiService);
  loading = signal(false);
  error = signal('');
  ok = signal(false);
  payload = signal<any>(null);
  resumen = signal('');

  onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.error.set('');
    this.ok.set(false);
    this.payload.set(null);
    this.resumen.set('');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target!.result as string);
        this.payload.set(data);
        this.resumen.set(
          `Juegos: ${data.juegos?.length ?? 0}  |  ` +
          `Niveles: ${data.niveles?.length ?? 0}  |  ` +
          `Botellas: ${data.botellas?.length ?? 0}  |  ` +
          `Bloqueos: ${data.bloqueos?.length ?? 0}  |  ` +
          `Estrategias: ${data.estrategias?.length ?? 0}`
        );
      } catch {
        this.error.set('El archivo no es un JSON válido.');
      }
    };
    reader.readAsText(file);
  }

  importar() {
    if (!this.payload()) return;
    this.loading.set(true);
    this.error.set('');
    this.ok.set(false);
    this.api.importData(this.payload()).subscribe({
      next: () => {
        this.ok.set(true);
        this.payload.set(null);
        this.resumen.set('');
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al importar: ' + err.message);
        this.loading.set(false);
      },
    });
  }
}
