Feature: format gherkin and generate testing code

Scenario Outline: generate missing Scenarios
  Given a gherkin file with multiple scenarios
  Given a test.ts file that have several test() with steps comments
  When calling generate test API
  Then the tests will be generated
  And the steps are reused in the new scenarios 
Examples:
    | featurePath | testsPath | outputPath |
    | "../demo/docs/features/successfulMathRound.feature"  | "../demo/tests/noImplement.test.ts"  | "../demo/generatedTests.test.ts" |


Scenario Outline: generate and update examples
  Given a gherkin file with multiple scenarios
  And there are examples
  Given a test.ts file that have several test() with steps comments
  When calling generate test API
  Then the tests will be generated
  And the test.each() is updated
Examples:
    | featurePath | testsPath | outputPath |
    | "../demo/docs/features/failWithF16Round.feature"  | "../demo/tests/successfulMathRound.test.ts"  | "../demo/generatedTests.test.ts" |


Scenario: update old testing code
  Given a gherkin file with multiple scenarios
  Given a test.ts file that have several test() with steps comments
  And some other test() do not have comments
  When calling generate comments API
  Then the tests will be generated
  And the comments of the steps will be generated
  And the steps are reused in the new scenarios
Examples:
    | featurePath | testsPath | outputPath |
    | "../demo/docs/features/successfulMathRound.feature"  | "../demo/tests/noComment.test.ts"  | "../demo/generatedTests.test.ts" |
