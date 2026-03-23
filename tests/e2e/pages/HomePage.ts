import { Page } from "@playwright/test";
import { SearchBar } from "../components/homePage/SearchBar";
import { NavigationHeader } from "../components/homePage/NavigationHeader";
import { CartInformationPopUp } from "../components/homePage/CartInformationPopUp";

export class HomePage {
  readonly page: Page;
  readonly searchBar: SearchBar;
  readonly navigationHeader: NavigationHeader;
  readonly cartInformationPopUp: CartInformationPopUp;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = new SearchBar(page);
    this.navigationHeader = new NavigationHeader(page);
    this.cartInformationPopUp = new CartInformationPopUp(page);
  }
  async goto(): Promise<void> {
    await this.page.goto("https://www.ebay.com/");
  }
}
