import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";
import { validUser } from "@test-data/users";

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(validUser.username, validUser.password);
});

test("Verify user can remove product from cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.removeProduct(products.backpack);
    expect(await cartPage.isProductVisible(products.backpack)).toBeFalsy();
});

test("Verify user can continue shopping from cart", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
});

test("Verify user can proceed to checkout from cart", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/)
});