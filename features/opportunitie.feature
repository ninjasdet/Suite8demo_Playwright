@Opportunities

Feature: Opportunities page 


@CreateOpportunities
Scenario:Create Opportunities
        Given user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on Opportunities module and click on create opportunity and enter details and click on save button.
        Then The user should able to see the created opportunities details.
@OpportunitieMandatoryValidation
Scenario: Verify that user receives error message for empty Opportunity Name field during Create Opportunity
        Given S1 user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on Opportunities module and click on create opportunitie and enter the details with mandatory fileds empty and click on save button.
        Then The user should able to see error messages under the mandatory fileds.

@ViewOpportunities
Scenario:View Opportunities
        Given S2 user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on Opportunities module and click on view opportunities.
        Then The user should able to see the opportunities details in the list.

@RecentlyViewedOpportunities
Scenario:Verify that user able to see the recently viewed opportunities details.
        Given S3 user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on Opportunities module and click on the viewopportunities.
        When The user should  see the opportunities details in the list and  again click on the opportunities module.
        Then The user able to see the recently viewed opportunities details.

@UpdateOpportunities
Scenario: Verify that user able to update the Opportunities details
        Given S4user signs into the Login page using valid username and password following which navigates to the Home page.
        When The user clicks on Opportunities module and click on viewopportunities.
        When The user click on opportunities and click on edit button and update the details and click on save button.
        Then The user should able to see the updated opportunities details.

@ImportOpportunities
        Scenario: Import Opportunities Successfully
         Given S5 user signs into the Login page using valid username and password following which navigates to the Home page.
         When The user clicks on Opportunities module and click on import Opportunities.
         When Start to type your When step here click on Download Import File Template and edit the file and save the file.
         When click on choose file and uploads a valid CSV file.
         When click on the next button and click on next button and click on next button and click on import now button.
         Then The user should able to see the viewimport results.
