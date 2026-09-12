import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { validUser, invalidUser } from "@test-data/users";

let loginPage: LoginPage;

test.describe("Login Tests", () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto("/");
    })

    test("Verify login with valid credentials", async ({ page }) => {
        await loginPage.login(validUser.username, validUser.password)
        await expect(page).toHaveURL(/inventory.html/);
    })

    test("Verify login with invalid credentials", async ({ page }) => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
    })

})