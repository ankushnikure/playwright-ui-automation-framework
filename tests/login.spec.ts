import { test, expect } from "@fixtures/page.fixture";
import { invalidUser } from "@test-data/users";

test.describe("Login tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
    });

    test("Verify login with valid credentials", async ({ page, loginPage, inventoryPage }) => {
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        if(!username || !password) {
            throw new Error(`USERNAME or PASSWORD missing in selected environment`);
        }
        await loginPage.login(username, password)
        expect(inventoryPage.getCurrentUrl()).toContain("inventory.html");
        expect(await inventoryPage.getPageTitle()).toBe("Products");
    });

    test("Verify login with invalid credentials", async ({ loginPage }) => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
    });

});