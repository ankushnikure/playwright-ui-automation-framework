import { test, expect } from "@playwright/test";

test("verify nopCommerce home page", async ({ page }) => {
    await page.goto("/");
    console.log("URL:", page.url());
    console.log("TITLE:", await page.title());
});