import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly documentInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly registerLink: Locator;
  readonly recoveryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentInput = page.locator('input[name="document"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('xpath=//form[@id="login-form"]//button[@id="login-submit"]');
    this.errorAlert = page.locator('xpath=//form[@id="login-form"]//*[@id="login-error"]');
    this.registerLink = page.getByRole('link', { name: /Registrate/i });
    this.recoveryLink = page.getByRole('link', { name: /Olvide/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(document: string, password: string): Promise<void> {
    await this.documentInput.fill(document);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorAlert).toContainText(message);
  }

  async expectOnboardingLinksValid(): Promise<void> {
    await expect(this.registerLink).toHaveAttribute('href', /^(?!#).+/);
    await expect(this.recoveryLink).toHaveAttribute('href', /^(?!#).+/);
  }
}
