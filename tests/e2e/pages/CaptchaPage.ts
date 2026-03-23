import { Locator, Page } from "@playwright/test";

export class CaptchaPage {
  readonly page: Page;
  readonly captchaContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.captchaContainer = page.locator(".g-recaptcha");
  }
}
