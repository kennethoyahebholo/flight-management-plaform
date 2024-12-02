import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should successfully log in and navigate to the dashboard', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Fill in the email field
    await page.fill('input[name="email"]', 'oyahebholokennethizosea@gmail.com');

    // Fill in the password field
    await page.fill('input[name="password"]', 'Password12$');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for the dashboard to load
    await page.waitForURL('http://localhost:3000/dashboard');

    // Assert that the user is on the dashboard
    expect(page.url()).toBe('http://localhost:3000/dashboard');
  });

  test('should display an error message for invalid login', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    // Click the login button
    await page.click('button[type="submit"]');

    // Assert that an error message is displayed
    await expect(page.locator('text="Invalid user and password combination"')).toBeVisible();
  });

  test('should display validation errors for empty input fields', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Click the login button without filling inputs
    await page.click('button[type="submit"]');

    // Assert that validation errors are displayed for email and password
    await expect(page.locator('text="Email is required"')).toBeVisible();
    await expect(page.locator('text="Password is required"')).toBeVisible();
  });

  test('should display validation error for invalid email format', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Fill in an invalid email format
    await page.fill('input[name="email"]', 'invalid-email-format');
    await page.fill('input[name="password"]', 'password123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Assert that an error message for invalid email is displayed
    await expect(page.locator('text="Invalid email"')).toBeVisible();
  });

  test('should clear validation errors when input is corrected', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Fill in invalid email format and click submit
    await page.fill('input[name="email"]', 'invalid-email-format');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Assert validation error is displayed
    await expect(page.locator('text="Invalid email"')).toBeVisible();

    // Correct the email and submit again
    await page.fill('input[name="email"]', 'correct.email@example.com');
    await page.click('button[type="submit"]');

    // Assert the validation error is no longer visible
    await expect(page.locator('text="Invalid email"')).not.toBeVisible();
  });

  test('should navigate to the register page when clicking on "Register Here"', async ({
    page
  }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/');

    // Find the "Register Here" link and click it
    await page.click('text=Register Here');

    // Wait for the register page to load
    await page.waitForURL('http://localhost:3000/register');

    // Assert that the user is now on the register page
    expect(page.url()).toBe('http://localhost:3000/register');
  });
});
