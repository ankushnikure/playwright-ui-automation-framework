import { Locator, Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}

    // Dynamic locators
    private readonly pageTitle: Locator = this.page.locator(".title");

    // Methods
    async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getPageTitle(): Promise<string> {
        return (await this.pageTitle.textContent()) ?? "";
    }

    getCurrentUrl(): string {
        return this.page.url();
    }
}