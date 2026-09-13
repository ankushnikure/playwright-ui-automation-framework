import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";
import { validUser } from "@test-data/users";

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validUser.username, validUser.password);
});

test("Verify user can add specific product to cart", async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(products.backpack)
    expect(await inventoryPage.isRemoveButtonVisible(products.backpack)).toBeTruthy();
});

test("Verify user can go to cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
})