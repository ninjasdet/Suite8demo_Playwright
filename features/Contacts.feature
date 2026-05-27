Feature: Contacts page validations
@contacts @createcontact
Scenario: Create a new contact with all required fields
    Given the user is logged into the application and on the home page
    When the user fills in all the required contact details on the Create Contact page
    And the user clicks the Save button
    Then the new contact should be created successfully
    And the contact last name should be visible in the contact record page

@contacts
Scenario: Create a new contact with missing required fields
    Given the user is logged into the application and on the home page
    When the user fills in the contact details but leaves the required field "Last Name" empty on the Create Contact page
    And the user clicks the Save button
    Then the user should see an error message indicating the missing required field
    And the contact should not be created

@contacts @contactvcard
Scenario: Create a new contact by importing a vCard
    Given the user is logged into the application and on the home page
    When the user uploads a valid vCard file on the Import vCard page    
    And the user clicks the "Import vCard" button
    Then the new contact should be created successfully
    And the contact last name should be visible in the contact record page

@contacts @viewcontactdetails
Scenario: View Contact details
    Given the user is logged into the application and on the home page
    When the user clicks on the specific contact button on the view contacts page
    Then the contact full name should be visible in the contact record page

@contacts
Scenario:  View Recently Viewed Contacts
    Given the user is logged into the application and on the home page
    When the user clicks on the specific contact button on the view contacts page    
    Then the contact should be listed in the recently viewed menu    
 
@contacts
Scenario: Import Contacts with valid file 
    Given the user is logged into the application and on the home page
    When the user uploads a valid file on the Import Contacts page
    And the user selects create new records and update existing records and clicks on next button for all 3 steps and clicks on Import Now button
    Then the user should view the Import Results screen with new contact details

@contacts @importinvalidcontactfile    
Scenario: Import Contacts with invalid file 
    Given the user is logged into the application and on the home page
    When the user uploads a invalid file on the Import Contacts page            
    Then the user should see the Invalid import file name Message