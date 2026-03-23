import { Page } from "@playwright/test";
import { ShipToForm } from "../components/checkoutPage/shipToForm";

export class CheckoutPage {
  readonly page: Page;
  readonly shipToForm: ShipToForm;

  constructor(page: Page) {
    this.page = page;
    this.shipToForm = new ShipToForm(page);
  }
}
