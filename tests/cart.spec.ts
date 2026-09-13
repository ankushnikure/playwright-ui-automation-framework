import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";
import { validUser } from "@test-data/users";

test.describe("Cart tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
        await loginPage.login(validUser.username, validUser.password);
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