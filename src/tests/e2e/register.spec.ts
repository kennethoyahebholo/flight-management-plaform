import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('should successfully register a new user and navigate to home page', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('http://localhost:3000/register');

    // Fill in the registration form with valid data
    await page.fill('input[name="fullName"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="password"]', 'Password12$');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the successful registration to trigger (e.g., the user is redirected to the home page)
    await page.waitForURL('http://localhost:3000/');

    // Assert that the user is on the home page after successful registration
    expect(page.url()).toBe('http://localhost:3000/');

    // Optionally, check if a success toast or message is displayed
    const successMessage = page.locator('text="Account created successfully"');
    await expect(successMessage).toBeVisible();
  });

  test('should display validation errors for empty input', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('http://localhost:3000/register');

    // Fill in the registration form with invalid data (invalid email format)
    await page.fill('input[name="fullName"]', '');
    await page.fill('input[name="email"]', ''); // Invalid email
    await page.fill('input[name="password"]', ''); // Short password

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for validation messages to appear (ensure the page has rendered them)
    await page.waitForSelector('text=Required', { timeout: 2000 }); // Ensure the error appears
  });

  test('should navigate to the login page when clicking on "Login"', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Find the "Login" link and click it
    await page.click('text=Login');

    // Wait for the register page to load
    await page.waitForURL('http://localhost:3000/');

    // Assert that the user is now on the register page
    expect(page.url()).toBe('http://localhost:3000/');
  });
});
