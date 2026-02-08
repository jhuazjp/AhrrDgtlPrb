import { test, expect } from '@playwright/test';


const API_BASE_URL =  process.env.API_BASE_URL || 'http://localhost:30000/api/';

test.use({ baseURL: API_BASE_URL });

test.describe('Backend API', () => {
  test('login exitoso devuelve token y usuario @P0', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: { document: '12345678', password: 'Test123*' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(body.user?.document).toBe('12345678');
  });

  test('login invalido devuelve 401 @P0', async ({ request }) => {
    const response = await request.post('auth/login', {
      data: { document: '12345678', password: 'ClaveIncorrecta' }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBe('Error Credenciales Incorrectas');
  });

  test('simulacion exitosa devuelve cronograma @P1', async ({ request }) => {
    const response = await request.post('simulador', {
      data: { product: 'CDT', amount: 1000000, rate: 12.5, termMonths: 12 }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.product).toBe('CDT');
    expect(body.schedule?.length).toBe(12);
  });

  test('simulacion con monto minimo invalido devuelve 400 @P1', async ({ request }) => {
    const response = await request.post('simulador', {
      data: { product: 'CDT', amount: 50000, rate: 12.5, termMonths: 12 }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain('Monto minimo');
  });
});
