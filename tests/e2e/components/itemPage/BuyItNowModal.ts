import { Locator, Page } from "@playwright/test";

export class BuyItNowModal {
  readonly page: Page;
  readonly checkouAsGuestButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.checkouAsGuestButton = page.getByRole("link", {
      name: "Check out as guest",
    });
  }
}
