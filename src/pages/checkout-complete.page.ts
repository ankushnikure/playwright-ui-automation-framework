import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutCompletePage extends BasePage {

    // Locators
    private readonly backHomeButton: Locator = this.page.getByRole("button", {name: "Back Home"});
    private readonly generatePDFOrderButton: Locator = this.page.getByRole("button", {name: "Generate PDF order"});

    // Methods
    async goBackHome(): Promise<void> {
        await this.backHomeButton.click();
    }

    async generateOrderPdf(): Promise<void> {
        await this.generatePDFOrderButton.click();
    }
}