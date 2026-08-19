import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}

    async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getTitle(): Promise<void> {
        await this.page.title();
    }

    async getCurrentUrl(): Promise<void> {
        this.page.url();
    }
}