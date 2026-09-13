import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {

    // Locators
    private readonly inventoryItems: Locator = this.page.locator(".inventory_item");
    private readonly shoppingCartLink: Locator = this.page.locator(".shopping_cart_link");

    // Dynamic Locators
    private productItem(productName: string): Locator {
        return this.inventoryItems.filter({ hasText: productName });
    }

    private productDescription(productName: string): Locator {
        return this.productItem(productName).locator(".inventory_item_desc");
    }

    private productPrice(productName: string): Locator {
        return this.productItem(productName).locator(".inventory_item_price");
    }

    private addToCartButton(productName: string): Locator {
        return this.productItem(productName).getByRole("button", { name: "Add to cart" });
    }

    private removeProductButton(productName: string): Locator {
        return this.productItem(productName).getByRole("button", {name: 'Remove'});
    }

    // Methods
    async getProductname(productName: string): Promise<string> {
        return (await this.productItem(productName).textContent()) ?? "";
    }

    async getProductDescription(productName: string): Promise<string> {
        return (await this.productDescription(productName).textContent()) ?? "";
    }

    async getProductPrice(productName: string): Promise<string> {
        return (await this.productPrice(productName).textContent()) ?? "";
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.addToCartButton(productName).click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        await this.removeProductButton(productName).click();
    }

    async isRemoveButtonVisible(productName: string): Promise<boolean> {
        return await this.removeProductButton(productName).isVisible();
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

}