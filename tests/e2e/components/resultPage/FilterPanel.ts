import { Locator, Page } from "@playwright/test";
import { KeyboardUtils } from "../../utils/KeyboardUtils";
import { KeyboardKeys } from "../../enums/KeyboardKeys";

export class FilterPanel {
  private readonly minPrice: Locator;
  private readonly maxPrice: Locator;
  constructor(private page: Page) {
    this.minPrice = page.getByRole("textbox", { name: "Minimum Value in $" });
    this.maxPrice = page.getByRole("textbox", { name: "Maximum Value in $" });
  }

  async searchProductsByGroups(group: string, filterby: string): Promise<void> {
    await this.page
      .locator(".x-refine__group", { hasText: `${group}` })
      .getByRole("link", { name: `${filterby}` })
      .click();
  }

  async applyPriceForFilter(minPrice: string, maxPrice: string): Promise<void> {
    const keyboardUtils = new KeyboardUtils(this.page);
    await this.page.waitForTimeout(2000); // temp solution for flaky part, find a proper fix someday
    await this.minPrice.fill(minPrice);
    await this.page.waitForTimeout(2000); // temp solution for flaky part, find a proper fix someday
    await this.maxPrice.fill(maxPrice);
    await keyboardUtils.pressKey(KeyboardKeys.ENTER);
  }
}
