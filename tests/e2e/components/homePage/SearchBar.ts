import { Locator, Page } from "@playwright/test";

export class SearchBar {
  private readonly page: Page;
  private readonly searchInput: Locator;
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole("combobox", {
      name: "Search for anything",
    });
  }

  async fillSearchValue(value: string): Promise<void> {
    await this.searchInput.fill(value);
  }
}
