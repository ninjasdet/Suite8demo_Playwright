@Login
Feature: Login page

 @login_valid
  Scenario: login validation with valid data
    Given The user is on the Login page
    When The user enters valid username and  password and clicks on Login
    Then The user lands on Home page.

@Login_invalidusernameandpassword
 Scenario: Login validations with invalid username and invalid password
     Given S1 The user is on the Login page
     When the user clicks on loginbutton by entering invalid username and invalid password
     Then the user should able to see errormessage "Login credentials incorrect ,please try again." 

@login_withemptyfields
Scenario: Login validations with Invalid data
    Given S2 The user is on the Login page
    When the user clicks on Loginbutton without entering username and password
    Then the user should able to see errormessage "Missing required field." under usernametextbox and passwordtextbox
    
    
@login_usernameEmptyPassword
    Scenario: Login validations with username and without password
     Given S3 The user is on the Login page
     When the user clicks on loginbutton by entering username without password
     Then the user should able to see errormessage "Missing required field." under passwordtextbox

@login_passwordEmptyusername
     Scenario: Login validations with password and without username
     Given S4 The user is on the Login page
     When the user clicks on loginbutton by entering password without username
     Then the user should able to see errormessage "Missing required field." under usernametextbox



     
     
     