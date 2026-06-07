Feature: Suite8demo applicatio Quotes page validations
    @Quotes
    Scenario: Create a new Quote
        Given S1 The user has logged into the application with valid username and password
        When Selecting Create Quote from Quotes option
        When Entering valid data in all fields - Overview, Address Information, Line items section and clicking Save button
        Then Verify the Quote is created successfully

    @Quotes
    Scenario: Mandatory fields validations for Title and Valid Until fields
        Given S2 The user has logged into the application with valid username and password
        When Selecting Create Quote from Quotes option and Title and Valid Until fields are blank
        And Clicking Save button
        Then Verify validation message is displayed for mandatory fields

    @Quotes
    Scenario: View Quotes
        Given S3 The user has logged into the application with valid username and password
        When Selecting View Quotes from Quotes option
        Then Verify created Quotes is displayed in the View Quotes page

    @Quotes
    Scenario: View Quotes - Recently Viewed
        Given S4 The user has logged into the application with valid username and password
        When Selecting View Quotes and Recently Viewed from Quotes 
        Then Verify Quotes is displayed in the recently viewed section

    @Quotes
    Scenario: Import Quotes
        Given S5 The user has logged into the application with valid username and password
        When Selecting Import Quotes from Quotes option
        When Import Quotes - Downloading Import file template, modify and select the downloaded document,selecting Next and Import File in corresponding pages
        Then Verify the new Title added in csv file is displayed in the Step2: Confirm Import file Properties page
        When Import Quotes - Click Next and Import buttons
        Then Verify import is successful and the new quote Title is displayed in Step5: View Import Details page
        When Click Exit in Import Quotes page
        Then Verify the file is imported successfully and displayed in View Quotes page

    @Quotes 
    Scenario: Import Line Items
        Given S6 The user has logged into the application with valid username and password
        When Selecting Import Line Items from Quotes option
        When Import Line Items - Downloading Import file template, modify and select the downloaded document,selecting Next and Import File in corresponding pages
        Then Verify the new Line Item added in csv file is displayed in the Step2: Confirm Import file Properties page
        When Import Line Items - Click Next and Import buttons
        Then Verify import is successful and the new Line Item Title is displayed in Step5: View Import Details page
        When Click Exit in Import Line Item page
        Then Verify the file is imported successfully

    @Quotes
    @Delete
    Scenario: Delete Quote
        Given S7 The user has logged into the application with valid username and password
        When Selecting Quotes and Deleting
        Then Verify the Quote is deleted
        
    @Quotes
    @UI
    Scenario: Validate User Interface of Quotes page - Overview section
        Given S8 The user has logged into the application with valid username and password
        When Selecting Create Quote option from Quotes
        Then Verify Quotes is displayed as the page title and Create label is displayed
        Then Verify Title field editbox is editable
        Then Verify Quote Number field is visible
        Then Verify max length of Valid Until field is 10
        Then Verify Approval Status dropdown list values contains Approved and Not Approved
        Then Verify Opportunity field is editable
        Then Verify the values present in Quote Stage dropdown list
        Then Verify Invoice Status dropdown list values contain Not Invoiced and Invoiced
        Then Verify Payment terms dropdown list values
        Then Verify Approval Issues field is editable
        Then Verify Save and Cancel buttons are enabled


