import {test as base} from "@playwright/test";
import { LoginPage } from "@pages/login.page"
import { InventoryPage } from "@pages/inventory.page";
import { CartPage } from "@pages/cart.page";

type Fixtures = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage
}

export const test = base.extend<Fixtures>({

    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }

});

export {expect} from "@playwright/test";