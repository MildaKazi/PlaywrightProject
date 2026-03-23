import { Locator, Page } from "@playwright/test";
import { CartItemCard } from "./CartItemCard";

export class CartInformationPopUp {
  readonly page: Page;
  private readonly items: Locator;
  readonly cartInfoHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartInfoHeader = this.page.locator(
      ".gh-minicart-header .gh-minicart-header__title",
    );
    this.items = this.page.locator(".gh-item__card");
  }

  async getCartInfoAfterDelete(): Promise<string> {
    return await this.cartInfoHeader.innerText();
  }

  getItem(index: number): CartItemCard {
    return new CartItemCard(this.items.nth(index - 1));
  }
}
