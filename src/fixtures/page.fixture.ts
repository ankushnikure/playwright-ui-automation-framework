import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/login.page"
import { InventoryPage } from "@pages/inventory.page";
import { CartPage } from "@pages/cart.page";
import { CheckoutInformationPage } from "@pages/checkout-information.page";
import { CheckoutOverviewPage } from "@pages/checkout-overview.page";
import { CheckoutCompletePage } from "@pages/checkout-complete.page";

type Fixtures = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage
    checkoutInformationPage: CheckoutInformationPage,
    checkoutOverviewPage: CheckoutOverviewPage,
    checkoutCompletePage: CheckoutCompletePage,
}

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutInformationPage: async ({ page }, use) => {
        const checkoutInformationPage = new CheckoutInformationPage(page);
        await use(checkoutInformationPage);
    },

    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    checkoutCompletePage: async ({ page }, use) => {
        const checkoutComplete = new CheckoutCompletePage(page);
        await use(checkoutComplete);
    }

});

export { expect } from "@playwright/test";