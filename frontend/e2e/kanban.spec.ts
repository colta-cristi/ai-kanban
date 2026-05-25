import { expect, test } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads board with dummy cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
    await expect(page.getByText("Research competitors")).toBeVisible();
    await expect(page.getByTestId("column-col-1")).toBeVisible();
    await expect(page.getByTestId("column-col-5")).toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    await page.getByTestId("column-title-col-1").click();
    const input = page.getByTestId("column-title-input-col-1");
    await input.fill("Ideas");
    await input.press("Enter");
    await expect(page.getByTestId("column-title-col-1")).toHaveText("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    await page.getByTestId("add-card-button-col-2").click();
    await page.getByTestId("add-card-title-col-2").fill("E2E test card");
    await page.getByTestId("add-card-details-col-2").fill("Created by Playwright");
    await page.getByTestId("add-card-submit-col-2").click();
    await expect(page.getByText("E2E test card")).toBeVisible();
    await expect(page.getByText("Created by Playwright")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    await page.getByTestId("delete-card-card-1").click();
    await expect(page.getByText("Research competitors")).not.toBeVisible();
  });

  test("drags a card to another column", async ({ page }) => {
    const dragHandle = page
      .getByTestId("card-card-4")
      .locator('[aria-roledescription="sortable"]');
    const targetColumn = page.getByTestId("column-col-5");
    const handleBox = await dragHandle.boundingBox();
    const columnBox = await targetColumn.boundingBox();
    if (!handleBox || !columnBox) throw new Error("Drag targets not found");

    const startX = handleBox.x + handleBox.width / 2;
    const startY = handleBox.y + handleBox.height / 2;
    const endX = columnBox.x + columnBox.width / 2;
    const endY = columnBox.y + 120;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 20, startY + 20, { steps: 5 });
    await page.mouse.move(endX, endY, { steps: 20 });
    await page.mouse.up();

    await expect(targetColumn.getByText("Set up Next.js project")).toBeVisible();
  });
});
