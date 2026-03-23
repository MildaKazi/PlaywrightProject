import { Locator } from "@playwright/test";

export class CartItemCard {
  readonly cartIemTitle: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartItemPrice: Locator;
  readonly deleteItemButton: Locator;
  readonly cartInfoHeader: Locator;

  constructor(page: Locator) {
    this.cartIemTitle = page.locator(".gh-info__title");
    this.cartItemQuantity = page.locator(".gh-info__row--quantity");
    this.cartItemPrice = page.locator(".gh-info__row .gh-item-bold");
    this.deleteItemButton = page.locator(".gh_info__delete .icon--delete");
    this.cartInfoHeader = page.locator(
      ".gh-minicart-header .gh-minicart-header__title",
    );
  }
  async getTitle(): Promise<string> {
    return await this.cartIemTitle.innerText();
  }
  async getQuantity(): Promise<string> {
    return await this.cartItemQuantity.innerText();
  }
  async getPrice(): Promise<string> {
    return await this.cartItemPrice.innerText();
  }
  async deleteItemFromCart(): Promise<void> {
    await this.deleteItemButton.click();
  }
}
