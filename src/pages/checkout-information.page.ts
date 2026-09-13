import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutInformationPage extends BasePage {

    // Locators
    private readonly firstNameInput: Locator = this.page.getByPlaceholder("First Name");
    private readonly lastNameInput: Locator = this.page.getByPlaceholder("last Name");
    private readonly postalCodeInput: Locator = this.page.getByPlaceholder("Zip/Postal Code");
    private readonly continueButton: Locator = this.page.locator('[data-test="continue"]');

    // Methods
    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

}