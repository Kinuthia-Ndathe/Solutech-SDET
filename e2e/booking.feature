Feature: Book Tour

    Scenario: Create tour booking from the home page as guest
        Given I am on the home page
        When I select a tour
        And I enter my booking details
        And I confirm the booking
        Then I should see a booking confirmation

    Scenario: Create Tours
        Given I am an admin & logged in
        When I add a new tour with available slots, pricing, descriptions, and destinations
        Then the tour should be available for booking

    Scenario: View All Bookings
        Given I am an admin & logged in
        When I view all bookings
        Then I should see a list of all bookings made by users

    Scenario: View All Tickets
        Given I am an admin & logged in
        When I view all tickets
        Then I should see all tickets generated from bookings