import { Locator, Page } from "@playwright/test";

export class NavigationHeader {
  readonly page: Page;
  private cartButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cartButton = this.page.locator(".gh-cart__icon");
  }

  async hoverOverCartIcon(): Promise<void> {
    await this.cartButton.hover();
  }

  async getCartIconTitle(): Promise<string | null> {
    await this.page.waitForTimeout(2000);
    return await this.cartButton.getAttribute("aria-label");
  }
}
