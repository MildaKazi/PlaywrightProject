import { Locator, Page } from "@playwright/test";
import { SearchResultCard } from "../components/resultPage/SearchResultCard";
import { FilterPanel } from "../components/resultPage/FilterPanel";
import { AppliedFiltersCard } from "../components/resultPage/AppliedFiltersCard";

export class ResultPage {
  readonly page: Page;
  private readonly items: Locator;
  readonly filterPanel: FilterPanel;
  readonly appliedFiltersCard: AppliedFiltersCard;

  constructor(page: Page) {
    this.page = page;
    this.filterPanel = new FilterPanel(page);
    this.appliedFiltersCard = new AppliedFiltersCard(page);
    this.items = page.locator(".srp-river-results .s-card.s-card--horizontal");
  }

  getItem(index: number): SearchResultCard {
    return new SearchResultCard(this.items.nth(index - 1));
  }
}
