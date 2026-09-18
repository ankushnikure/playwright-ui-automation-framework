import { test, expect } from "@fixtures/page.fixture";
import { validUser, invalidUser } from "@test-data/users";

test.describe("Login tests", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate("/");
    });

    test("Verify login with valid credentials", async ({ page, loginPage, inventoryPage }) => {
        await loginPage.login(validUser.username, validUser.password)
        expect(inventoryPage.getCurrentUrl()).toContain("inventory.html");
        expect(await inventoryPage.getPageTitle()).toBe("Products");
    });

    test("Verify login with invalid credentials", async ({ loginPage }) => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
    });

});