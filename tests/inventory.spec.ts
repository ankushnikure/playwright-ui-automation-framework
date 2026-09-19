import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";
import { validUser } from "@test-data/users";

test.describe("Inventory tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
        await loginPage.login(validUser.username, validUser.password);
    });

    test("Verify user can add specific product to cart", async ({ inventoryPage }) => {
        expect(inventoryPage.getCurrentUrl).toContain("inventory.html");
        await inventoryPage.addProductToCart(products.backpack)
        expect(await inventoryPage.isRemoveButtonVisible(products.backpack)).toBeTruthy();
    });

    test("Verify user can go to cart", async ({
        inventoryPage,
        cartPage
    }) => {
        await inventoryPage.addProductToCart(products.backpack);
        await inventoryPage.goToCart();
        expect(cartPage.getCurrentUrl()).toContain("cart.html");
    });
});
