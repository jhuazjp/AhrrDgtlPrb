import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SimuladorService,
  SimulacionResponse,
  ProductType
} from '../../core/services/simulador.service';

@Component({
  selector: 'app-simulacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simulacion.component.html',
  styleUrl: './simulacion.component.css'
})
export class SimulacionComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);

  isLoading = false;
  errorMessage = '';
  result: SimulacionResponse | null = null;

  form = this.fb.group({
    product: ['CDT' as ProductType, [Validators.required]],
    amount: [1000000, [Validators.required, Validators.min(100000), Validators.max(500000000)]],
    rate: [12.5, [Validators.required, Validators.min(0), Validators.max(100)]],
    termMonths: [12, [Validators.required, Validators.min(1), Validators.max(360)]]
  });

  constructor(private readonly simuladorService: SimuladorService) {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = {
      product: this.form.value.product as ProductType,
      amount: Number(this.form.value.amount),
      rate: Number(this.form.value.rate),
      termMonths: Number(this.form.value.termMonths)
    };

    this.simuladorService.simular(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.result = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Error al simular';
        this.cdr.detectChanges();
      }
    });
  }

  reset(): void {
    this.form.reset({
      product: 'CDT',
      amount: 1000000,
      rate: 12.5,
      termMonths: 12
    });
    this.result = null;
    this.errorMessage = '';
  }

  downloadCsv(): void {
    if (!this.result) {
      return;
    }
    const headers = ['month', 'interest', 'balance'];
    const rows = this.result.schedule.map((row) =>
      [row.month, row.interest, row.balance].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'simulacion.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
