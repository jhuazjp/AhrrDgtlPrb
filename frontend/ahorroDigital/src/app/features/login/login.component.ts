import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface StrengthInfo {
  label: string;
  level: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);

  isLoading = false;
  errorMessage = '';

  form = this.fb.group({
    document: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(5),
        Validators.maxLength(12)
      ]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get strength(): StrengthInfo {
    const value = this.form.get('password')?.value || '';
    return this.evaluateStrength(value);
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload = {
      document: this.form.value.document ?? '',
      password: this.form.value.password ?? ''
    };

    this.authService.login(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/simulador');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Error al iniciar sesion';
        this.cdr.detectChanges();
      }
    });
  }

  private evaluateStrength(value: string): StrengthInfo {
    if (!value) {
      return { label: '', level: 0 };
    }

    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[a-z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 2) {
      return { label: 'Debil', level: 1 };
    }
    if (score <= 4) {
      return { label: 'Media', level: 2 };
    }
    return { label: 'Fuerte', level: 3 };
  }
}
