import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchItem } from "../enums/SearchItem";
import { FilterGroups } from "../enums/FilterGroups";
import { FilterByValue } from "../enums/FilterByValue";
import { ResultPage } from "../pages/ResultPage";
import { ItemPage } from "../pages/ItemPage";
import { NavigationHeader } from "../components/homePage/NavigationHeader";
import { CartInformationPopUp } from "../components/homePage/CartInformationPopUp";
import { KeyboardUtils } from "../utils/KeyboardUtils";
import { KeyboardKeys } from "../enums/KeyboardKeys";
import { CheckoutPage } from "../pages/CheckoutPage";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const resultPage = new ResultPage(page);
  const keyboardUtils = new KeyboardUtils(page);

  await homePage.goto();
  await homePage.searchBar.fillSearchValue(SearchItem.HEADPHONES);
  await keyboardUtils.pressKey(KeyboardKeys.ENTER);
  await resultPage.filterPanel.searchProductsByGroups(
    FilterGroups.BRAND,
    FilterByValue.SONY,
  );
});

test("should be able to apply multiple filters for items", async ({ page }) => {
  const resultPage = new ResultPage(page);
  await resultPage.filterPanel.applyPriceForFilter("50", "250");

  const expectedFilters =
    await resultPage.appliedFiltersCard.getAppliedFiltersInfo();

  await resultPage.appliedFiltersCard.appliedFiltersInfo.click();

  const firstFilterItem =
    resultPage.appliedFiltersCard.appliedFiltersDrawer.getItem(1);
  const firstFilterItemName = await firstFilterItem.getTitle();
  const secondFilterItem =
    resultPage.appliedFiltersCard.appliedFiltersDrawer.getItem(2);
  const secondFilterItemName = await secondFilterItem.getTitle();

  expect(expectedFilters).toEqual("2 filters applied");
  expect(firstFilterItemName).toContain("$50.00 to $250.00");
  expect(secondFilterItemName).toContain(FilterByValue.SONY);
});

test("should update cart information when user adds/removes items", async ({
  page,
}) => {
  const resultPage = new ResultPage(page);

  await resultPage.filterPanel.applyPriceForFilter("50", "200");
  const cardThree = resultPage.getItem(3);
  const title = await cardThree.getTitle();
  const itemprice = await cardThree.getPrice();
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    await cardThree.open(),
  ]);

  const itemPage = new ItemPage(newPage);
  const navigationHeader = new NavigationHeader(newPage);
  const cartInformationPopUp = new CartInformationPopUp(newPage);

  await itemPage.addToCartButton.click();
  await itemPage.addToCartModal.closeModal();

  const cartItem = cartInformationPopUp.getItem(1);
  const cartInformationTitle = await navigationHeader.getCartIconTitle();
  await navigationHeader.hoverOverCartIcon();
  const cartItemTitle = await cartItem.getTitle();
  const cartItemQuantity = await cartItem.getQuantity();
  const cartItemPrice = await cartItem.getPrice();

  await cartItem.deleteItemFromCart();
  const cartInformationTitleAfterdelete =
    await navigationHeader.getCartIconTitle();
  await navigationHeader.hoverOverCartIcon();
  const cartInfoMessageAfterDelete =
    await cartInformationPopUp.getCartInfoAfterDelete();

  expect(cartInformationTitle).toEqual("Your shopping cart contains 1 items");
  expect(cartItemTitle).toContain(title);
  expect(cartItemQuantity).toEqual("Qty: 1");
  expect(cartItemPrice).toEqual(itemprice);
  expect(cartInformationTitleAfterdelete).toEqual(
    "Your shopping cart contains 0 items",
  );
  expect(cartInfoMessageAfterDelete).toEqual("Your cart is empty");
});

test("should check if shipping information is saved", async ({ page }) => {
  const resultPage = new ResultPage(page);

  await resultPage.filterPanel.applyPriceForFilter("50", "200");
  const cardThree = resultPage.getItem(3);
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    await cardThree.open(),
  ]);

  const itemPage = new ItemPage(newPage);
  const checkoutPage = new CheckoutPage(newPage);

  await itemPage.buyItNowButton.click();
  await itemPage.buyItNowModal.checkouAsGuestButton.click();

  //most of the time captcha appears only for automation and test going to fail.

  await checkoutPage.shipToForm.fillForm(
    "wqeqwe@zxczxcx.com",
    "name",
    "lastname",
    "m mazvd",
    "vln",
    "06238",
    "2222222",
  );
  const shippinginfo = checkoutPage.shipToForm.shippingSummary;
  await shippinginfo.waitFor({ state: "visible" });
  const expectedDetails = [
    `wqeqwe@zxczxcx.com`,
    `name`,
    `lastname`,
    `m mazvd`,
    `vln`,
    `06238`,
    "2222222",
  ];
  for (const detail of expectedDetails) {
    await expect(shippinginfo).toContainText(detail);
  }
});
