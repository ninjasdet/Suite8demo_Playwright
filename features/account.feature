@Accounts
Feature: Testing Account module

@AccountsNavigationValidation
Scenario: Verify user can navigate to Accounts module successfully
    Given user signs into the Login page using valid username and password following which navigates to the Home page
    When The user clicks on Accounts module from menu.
    Then The user should able to navigate to the Accounts module successfully and the Accounts page URL should be correct

@CreateAccount
Scenario: Create Account
    Given S1 user signs into the Login page using valid username and password following which navigates to the Home page
    When The user clicks on Accounts module and click on create account and entering valid data in all fields and  and click on save button.
    Then The user should able to see the created account details


@CreateAccountValidation
  Scenario: Verify Create Account page UI elements
    Given S2 user signs into the Login page using valid username and password following which navigates to the Home page
    When The user clicks on Accounts module and click on create account
    Then User should navigate to Create Account page and Create label should be visible
    Then Verify the NAME field should be visible and enabled
    Then Verify the NAME field editbox is editable
    Then Verify Save button and Cancel button should be visible and enabled
   
  
@AccountNameValidation
Scenario: Verify that user receives error message for empty Name field during Create Account
        Given S3 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on create account and enter details with empty Name
        Then The user should able to see error message "Missing required field: Name." under Name textbox.

@ViewAccounts
Scenario:View Accounts
        Given S4 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on view accounts.
        Then The user should able to see the account details in the list.

@RecentlyViewedAccounts
Scenario:Verify that user able to see the recently viewed account details.
        Given S5 user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on accounts module and click on the viewaccounts.
        When The user should  see the account details in the list and  again click on the accountsmodule.
        Then The user able to see the recently viewed account details.

@UpdateAccount
Scenario: Verify that user able to update the account details
        Given S6 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Account module and click on view accounts
        When The user click on account and click on edit button and update the details and click on save button.
        Then The user should able to see the updated account details.

@ImportAccounts
Scenario: Import Accounts
        Given S7 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on import Accounts.
        When click on Download Import File Template and edit the file and save the file.
        When click on choose file and uploads a CSV file.
        When click on the next button and click on next button and click on import now button.
        Then The user should able to see the view import results.

       