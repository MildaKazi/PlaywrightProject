import { Locator, Page } from "@playwright/test";
import { AppliedFiltersDrawerItem } from "./AppliedFiltersDrawerItem";

export class AppliedFiltersDrawer {
  readonly page: Page;
  private readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator(".srp-multi-aspect__item--overflow");
  }
  getItem(index: number): AppliedFiltersDrawerItem {
    return new AppliedFiltersDrawerItem(this.items.nth(index - 1));
  }
}
