import { Page, Locator, expect } from '@playwright/test';

export class SimulatorPage {
  readonly page: Page;
  readonly simularButton: Locator;
  readonly reiniciarButton: Locator;
  readonly resultadosHeading: Locator;
  readonly montoInput: Locator;
  readonly tasaInput: Locator;
  readonly plazoInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.simularButton = page.locator('xpath=//form[@id="sim-form"]//button[@id="sim-submit"]');
    this.reiniciarButton = page.locator('xpath=//form[@id="sim-form"]//button[@id="sim-reset"]');
    this.resultadosHeading = page.getByTestId('sim-results');
    this.montoInput = page.locator('input[name="amount"]');
    this.tasaInput = page.locator('input[name="rate"]');
    this.plazoInput = page.locator('input[name="termMonths"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/simulador');
  }

  async simular(): Promise<void> {
    await this.simularButton.click();
  }

  async reiniciar(): Promise<void> {
    await this.reiniciarButton.click();
  }

  async setMonto(value: string): Promise<void> {
    await this.montoInput.fill(value);
  }

  async blurMonto(): Promise<void> {
    await this.montoInput.blur();
  }

  async setTasa(value: string): Promise<void> {
    await this.tasaInput.fill(value);
  }

  async blurTasa(): Promise<void> {
    await this.tasaInput.blur();
  }

  async setPlazo(value: string): Promise<void> {
    await this.plazoInput.fill(value);
  }

  async expectResultadosVisible(): Promise<void> {
    await expect(this.resultadosHeading).toBeVisible();
  }

  async expectResultadosHidden(): Promise<void> {
    await expect(this.resultadosHeading).toHaveCount(0);
  }

  async expectMensajeError(message: string): Promise<void> {
    await expect(this.page.locator('xpath=//form[@id="sim-form"]//*[@id="sim-error"]')).toContainText(message);
  }

  async expectMontoError(message: string): Promise<void> {
    const field = this.page.locator('xpath=//input[@id="amount"]/ancestor::div[contains(@class,"field")]');
    await expect(field.locator('.field-error')).toContainText(message);
  }

  async expectTasaError(message: string): Promise<void> {
    const field = this.page.locator('xpath=//input[@id="rate"]/ancestor::div[contains(@class,"field")]');
    await expect(field.locator('.field-error')).toContainText(message);
  }

  async expectSimularDisabled(): Promise<void> {
    await expect(this.simularButton).toBeDisabled();
  }

  async expectFilasCronograma(count: number): Promise<void> {
    await expect(this.page.getByTestId('sim-row')).toHaveCount(count);
  }
}
