import { Page, BrowserContext, Locator } from "@playwright/test";
import { BuyItNowModal } from "../components/itemPage/BuyItNowModal";
import { AddToCartModal } from "../components/itemPage/AddToCartModal";

export class ItemPage {
  readonly page: Page;
  readonly buyItNowModal: BuyItNowModal;
  readonly addToCartModal: AddToCartModal;
  readonly buyItNowButton: Locator; //pasikur button komponenta
  readonly addToCartButton: Locator;
  readonly seeInCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyItNowModal = new BuyItNowModal(page);
    this.addToCartModal = new AddToCartModal(page);
    this.buyItNowButton = page.getByRole("button", { name: "Buy It Now" });
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.seeInCartButton = page.getByRole("button", { name: "See in cart" });
  }
}
