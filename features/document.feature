Feature: Suite8demo application - Documents page Validations
    @Documents
    Scenario: Create Documents
        Given D1 The user has logged into the application with valid username and password
        When Selecting Create Documents from Documents option
        When Entering valid details in all fields Documents Page
        When Saving in Documents page
        Then Verify document is created successfully

    @Documents
    Scenario: Mandatory fields validation - File Name, Document Name, Revision
        Given D2 The user has logged into the application with valid username and password
        When Selecting Create Documents from Documents option and having blank values in File Name, Document Name, Revision fields and clicking save button
        Then Verify validation message is displayed for mandatory fields in Documents page

    @Documents
    Scenario: View Documents
        Given D3 The user has logged into the application with valid username and password
        When Navigating to Documents in Documents Page
        Then Verify created document is displayed in the Documents page