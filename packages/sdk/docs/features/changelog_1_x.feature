Feature: update to 1.x
Scnario: npm audit
    Given the project is updated to 1.x
    When running npm audit
    Then there should be no vulnerabilities reported
    
Scenario: generate tests CLI without tests input specified
    Given a pathGherkinInput in the CLI
    When calling the CLI without pathTestsInput
    Then default file name is the gherkin file name with .test.ts extension
    And the default path is ./tests/
    When the default file does not exist
    Then tests will be generated with a blank template
    And the file should have properly wrapped around describe() 


Scenario: generate simple tests without examples
    Given a gherkin file with multiple scenarios without examples
    When calling generate test API
    Then the tests will be generated without test.each()
    And the testFn will not have parameters

Scenario: reporting with gen-report API
    Given a jest test file and matching gherkin file
    When calling gen-report API
    Then the steps comments are properly formatted and escaped
    Then the report will be generated with the correct status for each step