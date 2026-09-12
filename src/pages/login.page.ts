import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    // Locators
    private readonly usernameInput: Locator = this.page.getByRole('textbox', { name: 'Username' });
    private readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });
    private readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });
    private readonly loginError: Locator = this.page.locator('[data-test="error"]');


    // Methods
    async goto(path: string): Promise<void> {
        await this.navigate(path)
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }

    async expectLoginError(message: string): Promise<void> {
        await expect(this.loginError).toHaveText(message);
    }
    
}