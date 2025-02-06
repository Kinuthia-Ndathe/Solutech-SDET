Feature: Unsuccessful login with invalid credentials

    Scenario: User cannot log in with invalid credentials
        Given the user is on the login page
        When the user enters invalid credentials
        And the user clicks the login button
        Then the user should see an error message