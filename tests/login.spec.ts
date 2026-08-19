import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { loginCredentials } from "@test-data/users";

loginCredentials.forEach((data) => {

    test(`Verify login with ${data.testcase}`, async ({ page }) => {
        await page.goto("/");
        console.log("URL:", page.url());
        console.log("TITLE:", await page.title());

        const loginPage = new LoginPage(page);
        await loginPage.login(data.username, data.password);

        if (data.expectedResult === "success") {
            await expect(page).toHaveURL(/inventory.html/);
        } else {
            await expect(loginPage.loginError).toBeVisible();
            const loginErrorText = await loginPage.getLoginError();
            console.log("Login error:", loginErrorText);
        }
    });

})