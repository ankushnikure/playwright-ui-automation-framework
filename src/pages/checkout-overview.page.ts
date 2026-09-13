import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutOverviewPage extends BasePage {

    // Locators
    private readonly finishButton: Locator = this.page.getByRole("button", {name: "Finish"});

    // Methods
    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }
}