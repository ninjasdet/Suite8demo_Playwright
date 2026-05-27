Feature: Testing Account module

Scenario: Create Account

    Given user signs into the Login page using valid username and password following which navigates to the Home page
    When The user clicks on Accounts module and click on create account
    When Entering valid data in all fields and  and click on save button
    Then The user should able to see the created account details