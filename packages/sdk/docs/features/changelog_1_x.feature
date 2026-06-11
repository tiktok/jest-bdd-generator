Feature: update to 1.x

Scenario: npm audit
    Given the project is updated to 1.x
    When running npm audit
    Then there should be no vulnerabilities reported
    
Scenario: generate tests CLI without tests input specified
    Given a pathGherkinInput in the CLI
    And pathTestsInput is not specified
    When calling generate test API 
    Then default file name is the gherkin file name with .test.ts extension
    And the default path is ./tests/
    When the default file does not exist
    Then tests will be generated with a blank template
    And the file should have properly wrapped around `describe()`


Scenario: generate simple tests without examples
    Given a gherkin file with multiple scenarios without examples
    When calling generate test API
    Then the tests will be generated without test.each()
    And the testFn will not have parameters

Scenario: reporting with gen-report API with special characters in step comments
    Given a jest test file and matching gherkin file
    When calling gen-report API
    Then the generated steps comments <Origin> are properly formatted and escaped to <Escaped>
    Then the report will be generated with the correct status for each step
Examples:
    | Origin   | Escaped    |
    | 'N / 3'  | 'N \\/ 3'  |

Scenario: reporting with gen-report API and js-dom
    Given a jest test file and matching gherkin file
    And js-dom is enabled
    When calling gen-report API 
    Then delegate call to jest should not fail due to 'testEnvironmentOptions'
    Then the report will be generated with the correct status for each step

Scenario: reporting with gen-report fails
    Given a jest test file and matching gherkin file
    When calling gen-report API 
    And the delegate call to jest fails
    Then the test report should be generated with an error status