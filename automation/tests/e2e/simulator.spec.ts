import { test } from '@playwright/test';
import { SimulatorPage } from '../../pages/simulator.page';
import { testData } from '../../utils/test-data';

test.describe('Simulador', () => {
  test('simulacion exitosa muestra resultados @P1', async ({page}) => {
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.goto();
    await simulatorPage.simular();
    await simulatorPage.expectResultadosVisible();
    await simulatorPage.expectFilasCronograma(12);
  });

  test('validacion de monto maximo @P1', async ({page}) => {
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.goto();
    await simulatorPage.setMonto(testData.simulacion.montoAlto.amount);
    await simulatorPage.blurMonto();
    await simulatorPage.expectMontoError('Monto fuera de rango.');
    await simulatorPage.expectSimularDisabled();
    await simulatorPage.expectResultadosHidden();
  });

  test('validacion de monto minimo @P1', async ({page}) => {
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.goto();
    await simulatorPage.setMonto(testData.simulacion.montoBajo.amount);
    await simulatorPage.blurMonto();
    await simulatorPage.expectMontoError('Monto fuera de rango.');
    await simulatorPage.expectSimularDisabled();
    await simulatorPage.expectResultadosHidden();
  });

  test('validacion de tasa invalida @P1', async ({page}) => {
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.goto();
    await simulatorPage.setTasa(testData.simulacion.tasaAlta.rate);
    await simulatorPage.blurTasa();
    await simulatorPage.expectTasaError('Tasa invalida.');
    await simulatorPage.expectSimularDisabled();
  });

  test('reiniciar limpia resultados @P2', async ({page}) => {
    const simulatorPage = new SimulatorPage(page);
    await simulatorPage.goto();
    await simulatorPage.simular();
    await simulatorPage.expectResultadosVisible();
    await simulatorPage.reiniciar();
    await simulatorPage.expectResultadosHidden();
  });
});
