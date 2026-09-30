import { test, expect } from "@fixtures/page.fixture";
import { products } from "@test-data/products";

test.describe("Inventory tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        if(!username || !password) {
            throw new Error(`USERNAME or PASSWORD missing in selected environment`);
        }
        await loginPage.login(username, password);
    });

    test("Verify user can add specific product to cart @smoke", async ({ inventoryPage }) => {
        expect(inventoryPage.getCurrentUrl()).toContain("inventory.html");
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
