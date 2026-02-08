import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { testData } from '../../utils/test-data';

test.describe('Login @P0', () => {
  test('login exitoso redirige al simulador @P0', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.document, testData.validUser.password);
    await expect(page).toHaveURL(/\/simulador/);
    await expect(page.getByRole('heading', { name: 'Simulador de ahorro' })).toBeVisible();
  });

  test('login invalido muestra mensaje de error @P0', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.invalidUser.document, testData.invalidUser.password);
    await loginPage.expectError('Error Credenciales Incorrectas');
  });

  test('enlaces de registro y recuperacion deben tener ruta valida @P0', async ({page}) => {
    test.fail(true, 'BUG-001: enlaces de registro y recuperacion no redirigen');
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectOnboardingLinksValid();
  });

  test('simulador requiere sesion activa @P0', async ({page}) => {
    test.fail(true, 'BUG-002: simulador permite acceso sin autenticacion');
    await page.goto('/simulador');
    await expect(page).toHaveURL(/\/login/);
  });
});
