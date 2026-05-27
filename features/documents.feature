Feature: Suite8demo application - Documents page Validations

    Scenario: Create Documents
        Given The user has logged into the application with valid username and password
        When Selecting Create Documents from Documents option
        And Entering valid details in all fields
        Then Verify document is created successfully

    Scenario: Mandatory fields validation - File Name, Document Name, Publish Date, Revision
        Given The user has logged into the application with valid username and password
        When Selecting Create Documents from Documents option and having blank values in File Name, Document Name, Publish Date, Revision fields
        And Clicking Save button
        Then Verify validation message is displayed for mandatory fields

    Scenario: View Documents
        Given The user has logged into the application with valid username and password
        When Selecting View Documents from Documents option
        Then Verify created document is displayed in the Documents page

    Scenario: Recently Viewed
        Given The user has logged into the application with valid username and password
        When MouseHovering on Documents -> Recently Viewed
        Then Verify recently viewed documents is displayed in Documents-> Recently Viewed -> <Document Name>
        When Selecting the recently viewed document name
        Then Verify document is displayed in the Documents page
