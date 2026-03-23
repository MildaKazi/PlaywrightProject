import { Locator } from "@playwright/test";

export class AppliedFiltersDrawerItem {
  constructor(private readonly page: Locator) {}

  async getTitle(): Promise<string> {
    return await this.page.innerText();
  }
}
