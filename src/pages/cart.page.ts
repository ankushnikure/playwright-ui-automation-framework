import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {

    // Locators
    private readonly cartItems: Locator = this.page.locator(".cart_item");
    private readonly continueShoppingButton: Locator = this.page.getByRole("button", { name: "Continue Shopping" });
    private readonly checkoutButton: Locator = this.page.getByRole("button", { name: "Checkout" });

    // Dynamic locators
    private cartItem(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName });
    }

    private removeButton(productName: string): Locator {
        return this.cartItem(productName).getByRole("button", { name: "Remove" });
    }

    //Methods
    async removeProduct(productName: string): Promise<void> {
        await this.removeButton(productName).click();
    }

    async isProductVisible(productName: string): Promise<boolean> {
        return await this.cartItem(productName).isVisible();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}