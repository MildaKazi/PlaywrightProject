import { Locator, Page } from "@playwright/test";

export class AddToCartModal {
  readonly page: Page;
  readonly seeInCartButton: Locator;
  readonly closeButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.seeInCartButton = page.getByRole("link", { name: "See in cart" });
    this.closeButton = page.getByRole("button", { name: "Close dialog" });
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }
}
