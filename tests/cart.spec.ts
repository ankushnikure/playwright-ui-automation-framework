import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";

test.describe("Cart tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        if(!username || !password) {
            throw new Error(`USERNAME or PASSWORD missing in selected environment`);
        }
        await loginPage.login(username, password);
    });

    test("Verify user can remove product from cart", async ({
        inventoryPage,
        cartPage
    }) => {
        await inventoryPage.addProductToCart(products.backpack);
        await inventoryPage.goToCart();
        await cartPage.removeProduct(products.backpack);
        expect(await cartPage.isProductVisible(products.backpack)).toBeFalsy();
    });

    test("Verify user can continue shopping from cart", async ({
        inventoryPage,
        cartPage
    }) => {
        await inventoryPage.addProductToCart(products.backpack);
        await inventoryPage.goToCart();
        await cartPage.continueShopping();
        expect(inventoryPage.getCurrentUrl()).toContain("inventory.html");
    });

    test("Verify user can proceed to checkout from cart", async ({
        inventoryPage,
        cartPage,
        checkoutInformationPage
    }) => {
        await inventoryPage.addProductToCart(products.backpack);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        expect(checkoutInformationPage.getCurrentUrl()).toContain("checkout-step-one.html");
    });

});