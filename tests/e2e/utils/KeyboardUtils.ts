import { Page } from "@playwright/test";
import { KeyboardKeys } from "../enums/KeyboardKeys";

export class KeyboardUtils {
  constructor(private page: Page) {}

  async pressKey(key: KeyboardKeys, delay: number = 0) {
    await this.page.keyboard.press(key, { delay });
  }
}
