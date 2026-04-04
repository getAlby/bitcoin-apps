import { expect, test } from "@playwright/test";

test("discover page smoke test", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bitcoin Apps Directory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Featured" })).toBeVisible();
  await page.getByLabel("Search apps").fill("wallet");
  await expect(page.getByRole("heading", { name: "Featured" })).toHaveCount(0);
});
