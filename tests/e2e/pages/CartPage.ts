import { Page } from "@playwright/test";
import { CartBucket } from "../components/cartPage/CartBucket";

export class CartPage {
  readonly page: Page;
  readonly cartBucket: CartBucket;

  constructor(page: Page) {
    this.page = page;
    this.cartBucket = new CartBucket(page);
  }
}
