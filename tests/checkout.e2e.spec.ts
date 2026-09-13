import { test, expect } from "@fixtures/page.fixture";
import { checkoutUser } from "@test-data/checkout";
import { products } from "@test-data/products";
import { validUser } from "@test-data/users";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate("/");
    await loginPage.login(validUser.username, validUser.password);
});

test("Verify user can complete checkout and download order PDF", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage
}) => {

    await test.step("Add product to cart", async () => {
        await inventoryPage.addProductToCart(products.backpack);
        expect(await inventoryPage.isRemoveButtonVisible(products.backpack)).toBeTruthy();
    });

    await test.step("Go to cart", async () => {
        await inventoryPage.goToCart();
        expect(cartPage.getCurrentUrl()).toContain("cart.html");
        expect(await cartPage.getPageTitle()).toBe("Your Cart");
    });

    await test.step("Proceed to checkout", async () => {
        await cartPage.proceedToCheckout();
        expect(checkoutInformationPage.getCurrentUrl()).toContain("checkout-step-one.html");
        expect(await  checkoutInformationPage.getPageTitle()).toBe("Checkout: Your Information");
    });

    await test.step("Enter checkout information", async () => {
        await checkoutInformationPage.enterCheckoutInformation(
            checkoutUser.firstName,
            checkoutUser.lastName,
            checkoutUser.postalCode
        );
    });

    await test.step("Continue checkout", async () => {
        await checkoutInformationPage.continueCheckout();
        expect(checkoutOverviewPage.getCurrentUrl()).toContain("checkout-step-two.html");
        expect(await checkoutOverviewPage.getPageTitle()).toBe("Checkout: Overview");
    });

    await test.step("Complete checkout", async () => {
        await checkoutOverviewPage.finishCheckout();
        expect(checkoutCompletePage.getCurrentUrl()).toContain("checkout-complete.html");
        expect(await checkoutCompletePage.getPageTitle()).toBe("Checkout: Complete!");
    });

    await test.step("Download order PDF", async () => {
        const downloadPromise = page.waitForEvent("download");
        await checkoutCompletePage.generateOrderPdf();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain("swag-labs-order-");
        expect(download.suggestedFilename()).toMatch(/\.pdf$/); // $ verifies that .pdf is actually at the end of the filename.
        await download.saveAs(`test-results/${download.suggestedFilename()}`);
    });

})

