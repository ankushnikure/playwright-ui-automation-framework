import { test, expect } from "@fixtures/page.fixture";
import { validUser, invalidUser } from "@test-data/users";

test.describe("Login Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Verify login with valid credentials", async ({ page, loginPage }) => {
        await loginPage.login(validUser.username, validUser.password)
        await expect(page).toHaveURL(/inventory.html/);
    });

    test("Verify login with invalid credentials", async ({ loginPage }) => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
    });

});