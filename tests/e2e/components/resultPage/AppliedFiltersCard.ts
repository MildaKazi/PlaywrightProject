import { Locator, Page } from "@playwright/test";
import { AppliedFiltersDrawer } from "./AppliedFiltersDrawer";

export class AppliedFiltersCard {
  readonly page: Page;
  readonly appliedFiltersDrawer: AppliedFiltersDrawer;
  readonly appliedFiltersInfo: Locator;
  private readonly expandfiltersInfoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appliedFiltersDrawer = new AppliedFiltersDrawer(page);
    this.appliedFiltersInfo = page.locator(
      ".srp-multi-aspect__flyout__btn-label",
    );
    this.expandfiltersInfoButton = page.locator(
      ".srp-multi-aspect__flyout__btn-label",
    );
  }

  async getAppliedFiltersInfo(): Promise<string> {
    return await this.appliedFiltersInfo.innerText();
  }
}
