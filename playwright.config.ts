import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const ENV = process.env.ENV || 'staging';

const result = dotenv.config({ path: `.env.${ENV}` });
if(result.error) {
    throw new Error(`Could not load .env.${ENV}: ${result.error}`)
}

const BASE_URL = process.env.BASE_URL!;
if(!BASE_URL) {
    throw new Error(`BASE_URL is missing in .env.${ENV}`);
}

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { open: 'never' }]],

    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        headless: false
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1440, height: 900 }
            }
        },
        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                viewport: { width: 1440, height: 900 }
            }
        },
        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
                viewport: { width: 1440, height: 900 }
            }
        }
    ]
});