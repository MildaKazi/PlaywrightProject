import { Locator, Page } from "@playwright/test";

export class CartBucket {
  readonly page: Page;
  private readonly removebutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removebutton = page.locator("[data-test-id='cart-remove-item']");
  }

  async removeItemFromCart(): Promise<void> {
    await this.removebutton.click();
  }
}
