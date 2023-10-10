const { test, expect } = require("@playwright/test");

const user = require("../user");

test("successful authorization", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder("Email").fill(user.validUser.login);
    await page.getByPlaceholder("Пароль").fill(user.validUser.pass);  
    await page.getByTestId("login-submit-btn").click();
    await expect(page).toHaveTitle("Нетология — обучение современным профессиям онлайн", {timeout: 30000});

});

test("unsuccessful authorization", async ({ page }) => {
     
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder("Email").fill(user.invalidUser.login);
    await page.getByPlaceholder("Пароль").fill(user.invalidUser.pass);  
    await page.getByTestId("login-submit-btn").click();
    await expect(page.getByTestId("login-error-hint")).toHaveText("Вы ввели неправильно логин или пароль");
});