Feature: Leads page validations

@leads
Scenario:	Create new Lead with all required fields
    Given the user is logged into the application and on the home page
    When the user fills in all the required lead details on the Create Lead page
    And the user clicks the Save button on the Create Lead page
    Then the new Lead should be created successfully 
    And the lead name should be visible in the lead record page
		
@leads
Scenario: Create a new Lead with missing required fields
    Given the user is logged into the application and on the home page
    When the user fills in the Lead details but leaves the required field "Last Name" empty on the Create Lead page
    And the user clicks the Save button on the Create Lead page
    Then the user should see an error message indicating the missing required field on the Create Lead page
    And the lead should not be created
	
@leads
Scenario: Create a new lead by importing a vCard
    Given the user is logged into the application and on the home page
    When the user uploads a valid vCard file on the Import lead from vCard page    
    And the user clicks the "Import vCard" button on the Import lead from vCard page
    Then the lead should be created successfully
    And the lead name should be visible in the lead record page

@leads
Scenario: View Lead details
    Given the user is logged into the application and on the home page
    When the user clicks on the specific lead button on the view leads page
    Then the lead full name should be visible in the lead record page

@leads
Scenario:  View Recently Viewed Leads
    Given the user is logged into the application and on the home page
    When the user clicks on the specific lead button on the view leads page    
    Then the lead full name should be visible in the lead record page


@leads
Scenario: Import Lead with valid file 
    Given the user is logged into the application and on the home page
    When the user uploads a valid file on the Import Leads page
    And the user selects create new records and update existing records and clicks on next button for all 3 steps and clicks on Import Now button on the Import Leads page
    Then the user should view the Import Results screen with new lead details
	
@leads    
Scenario: Import Lead with invalid file 
    Given the user is logged into the application and on the home page
    When the user uploads a invalid file on the Import Leads page            
    Then the user should see the Invalid import file name Message on the Import Leads page

