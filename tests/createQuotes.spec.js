import { test, expect } from '@playwright/test';

test('Create Quotes', async({page})=>{
    await page.goto('https://suite8demo.suiteondemand.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('will');
    await page.getByRole('textbox', { name: 'Password' }).fill('will');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByText('Quotes', { exact: true }).hover();
    await page.getByText('Quotes', { exact: true }).click();

    const framePage =  page.frameLocator('[src*="index.php"]')
    await framePage.locator('#name').fill('QuoteTest');
    await framePage.locator('#approval_status').selectOption('Approved');
    await framePage.locator('#opportunity').fill('Nelson Inc - 10000 units');
    await framePage.locator('#stage').selectOption('Draft');
    await framePage.locator('#invoice_status').selectOption('Not Invoiced');
    await framePage.locator('#term').selectOption('Nett 15');
    await framePage.locator('#approval_issue').fill('Not checked Approved status');

    //Enter Account Details
    await framePage.locator('#billing_account').fill('Aim Capital Inc');
    await framePage.locator('#billing_contact').fill('Bill Wren');



});