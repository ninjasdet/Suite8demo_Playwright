@Accounts
Feature: Testing Account module

@CreateAccount
Scenario: Create Account
    Given S1 user signs into the Login page using valid username and password following which navigates to the Home page
    When The user clicks on Accounts module and click on create account and entering valid data in all fields and  and click on save button.
    Then The user should able to see the created account details

@AccountNameValidation
Scenario: Verify that user receives error message for empty Name field during Create Account
        Given S2 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on create account and enter details with empty Name
        Then The user should able to see error message "Missing required field: Name." under Name textbox.

@ViewAccounts
Scenario:View Accounts
        Given S3 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on view accounts.
        Then The user should able to see the account details in the list.

@RecentlyViewedAccounts
Scenario:Verify that user able to see the recently viewed account details.
        Given S4 user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on accounts module and click on the viewaccounts.
        When The user should  see the account details in the list and  again click on the accountsmodule.
        Then The user able to see the recently viewed account details.

@UpdateAccount
Scenario: Verify that user able to update the account details
        Given S5 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Account module and click on view accounts
        When The user click on account and click on edit button and update the details and click on save button.
        Then The user should able to see the updated account details.

@ImportAccounts
Scenario: Import Accounts
        Given S6 user signs into the Login page using valid username and password following which navigates to the Home page
        When The user clicks on Accounts module and click on import Accounts.
        When click on Download Import File Template and edit the file and save the file.
        When click on choose file and uploads a CSV file.
        When click on the next button and click on next button and click on import now button.
        Then The user should able to see the view import results.

       