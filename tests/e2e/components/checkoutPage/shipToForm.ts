import { Locator, Page } from "@playwright/test";

export class ShipToForm {
  readonly page: Page;
  private readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly streetAddress: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;
  readonly doneButton: Locator;
  readonly shippingSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = this.page.getByLabel("Email");
    this.firstName = this.page.getByLabel("First Name");
    this.lastName = this.page.getByLabel("Last Name");
    this.streetAddress = this.page.getByLabel("Street address", {
      exact: true,
    });
    this.city = this.page.getByLabel("City");
    this.zipCode = this.page.getByLabel("ZIP code");
    this.phoneNumber = this.page.getByLabel("Phone number (required)");
    this.doneButton = this.page.getByTestId("ADD_ADDRESS_SUBMIT");
    this.shippingSummary = this.page.getByTestId("SHIPPING_SUMMARY");
  }

  async fillForm(
    email: string,
    firstName: string,
    lastName: string,
    streetAddress: string,
    city: string,
    zipCode: string,
    phoneNumber: string,
  ): Promise<void> {
    await this.email.fill(email);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.streetAddress.fill(streetAddress);
    await this.city.fill(city);
    await this.zipCode.fill(zipCode);
    await this.phoneNumber.fill(phoneNumber);
    await this.doneButton.click();
  }
  async getShippingSummary(): Promise<string> {
    return await this.shippingSummary.innerText();
  }
}
