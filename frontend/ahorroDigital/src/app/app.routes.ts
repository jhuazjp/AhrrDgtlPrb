import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SimulacionComponent } from './features/simulacion/simulacion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'simulador', component: SimulacionComponent },
  { path: '**', redirectTo: 'login' }
];
