import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type ProductType = 'CDT' | 'AHORRO';

export interface SimulacionRequest {
  product: ProductType;
  amount: number;
  rate: number;
  termMonths: number;
}

export interface SimulacionRow {
  month: number;
  interest: number;
  balance: number;
}

export interface SimulacionResponse {
  product: ProductType;
  amount: number;
  rate: number;
  termMonths: number;
  finalAmount: number;
  gain: number;
  schedule: SimulacionRow[];
}

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  simular(payload: SimulacionRequest): Observable<SimulacionResponse> {
    return this.http.post<SimulacionResponse>(`${this.baseUrl}/simulador`, payload);
  }
}
