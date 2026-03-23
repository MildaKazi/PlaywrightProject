import { Locator } from "@playwright/test";

export class SearchResultCard {
  private readonly title: Locator;
  private readonly headerLink: Locator;
  private readonly price: Locator;

  constructor(private readonly page: Locator) {
    this.title = this.page.locator(".s-card__title span:first-child");
    this.headerLink = this.page.locator(
      ".su-card-container__header .s-card__link",
    );
    this.price = this.page.locator(".s-card__price");
  }

  async getTitle(): Promise<string> {
    return await this.title.innerText();
  }

  async open(): Promise<void> {
    await this.headerLink.scrollIntoViewIfNeeded();
    await this.headerLink.click();
  }

  async getPrice(): Promise<string> {
    return await this.price.innerText();
  }
}
