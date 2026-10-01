import { test, expect } from "@fixtures/page.fixture";
import { checkoutUser } from "@test-data/checkout";
import { products } from "@test-data/products";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate("/");
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    if (!username || !password) {
        throw new Error(`USERNAME or PASSWORD missing in selected environment`);
    }
    await loginPage.login(username, password);
});

test("Verify user can complete checkout and download order PDF @smoke", async ({
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
        expect(cartPage.pageTitle).toHaveText("Your Cart");
    });

    await test.step("Proceed to checkout", async () => {
        await cartPage.proceedToCheckout();
        expect(checkoutInformationPage.getCurrentUrl()).toContain("checkout-step-one.html");
        expect(checkoutInformationPage.pageTitle).toHaveText("Checkout: Your Information");
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
        expect(checkoutOverviewPage.pageTitle).toHaveText("Checkout: Overview");
    });

    await test.step("Complete checkout", async () => {
        await checkoutOverviewPage.finishCheckout();
        expect(checkoutCompletePage.getCurrentUrl()).toContain("checkout-complete.html");
        expect(checkoutCompletePage.pageTitle).toHaveText("Checkout: Complete!");
    });

    await test.step("Download order PDF", async () => {
        // Start listening for the download
        const downloadPromise = page.waitForEvent("download");

        // Trigger the action that downloads the file
        await checkoutCompletePage.generateOrderPdf();

        // Capture the downloaded file
        const download = await downloadPromise;

        // Get the suggested file name
        const fileName = download.suggestedFilename();

        // Validate filename / pdf file
        expect(fileName).toContain("swag-labs-order-");
        expect(fileName).toMatch(/\.pdf$/); // $ verifies that .pdf is actually at the end of the filename.

        // Save the downloaded file
        await download.saveAs(`test-results/${fileName}`);
    });

})

