## 0. Initial Setup: Ensure Tests Run Properly
  ```bash
  rush update
  ```

* Run a successful test:
  ```bash
  npx jest tests/successfulMathRound.test.ts # Test should pass
  ```
* Run a test expected to fail:
  ```bash
  npx jest tests/failWithF16Round.test.ts # Math.f16round is unavailable in Node.js
  ```
  - This test fails because `Math.f16round` is not a valid method in Node.js. For more details, refer to [Math.f16round on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/f16round).

## 1. Generate Comments for Test Code
Automatically generate comments for the test code using predefined steps:
  ```bash
  npx gen-comments pathTestsInput=./tests/noComment.test.ts pathOutput=./generatedComments.test.ts
  ```
  - Alternatively, you can use the pre-configured npm script:
    ```bash
    npm run gen-comments
    ```

## 2. Generate Test Code from Gherkin and Predefined Steps
Generate test code based on Gherkin documents and the predefined steps:
  ```bash
  npx gen-test pathTestsInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/successfulMathRound.feature pathOutput=./tests/generatedTests.test.ts
  ```
  - You can also run this using the npm script:
    ```bash
    npm run gen-test
    ```

## 3. Generate Gherkin Document from Tests
Generate a Gherkin document from test cases:
  ```bash
  npx gen-doc pathTestsInput=./tests/failWithF16Round.test.ts pathOutput=./docs/features/generatedFeature.feature
  ```
  - The npm script is also available:
    ```bash
    npm run gen-doc
    ```

## 4. Generate Test Report in HTML
Generate a report for a successful test:
  ```bash
  npx gen-report pathTestsInput=./tests/successfulMathRound.test.ts pathFeatureInput=./docs/features/successfulMathRound.feature
  ```
  - Alternatively, use the npm script:
    ```bash
    npm run gen-report
    ```

Generate an HTML report for a failing test, which includes failure details and call stacks:
  ```bash
  npx gen-report pathTestsInput=./tests/failWithF16Round.test.ts pathFeatureInput=./docs/features/failWithF16Round.feature
  ```
  - The output will be `failWithF16Round-report.html` saved in the `./docs/reports` folder.


## 5. Managing Test Examples with Test Oracle
For more information on test oracle, check out [Test Oracle on Wikipedia](https://en.wikipedia.org/wiki/Test_oracle).

Start the TestOracle service:
  ```bash
  npm run start
  echo "Visit: http://127.0.0.1:8080"
  ```

### Features of the TestOracle Index Page
The [index page](http://127.0.0.1:8080/test-oracle/f16round) presents a table of various `Math.round` methods:
  - Click **run** in the top-left corner to reveal the expected results.
  - Click **copy** to paste the table data into your `.feature` files.

### Working with Selections:
You can copy selected data, including the relevant **rows** and **columns**:
  - Select cells by dragging and copying.
  - Drag on column headers to select and copy entire columns.

### Editing Expressions:
Each **row** (e.g., `9.1`, `-9.1`) or **column** (`"ceil"`, `"floor"`) expression can be edited:
  - Click on the header cell to edit the expression.
  - The changes will reflect in the URL hash.

Edit the **row headers** (`num`, `note`) by clicking on the top of the row expressions. Only the clicked column is shown in the **Input box**, and the **paste box** accepts multiline data, separated by `\n` or `\r\n`.

### Using the Component
Here’s an example of how to use the **TestOracle** component:

```tsx
<TestOracle 
  colSelections={colSelections} // Editor config of expressions
  defaultCols={defaultCols} // columns
  defaultRows={defaultRows} // rows
  execute={execute} // (combinedExpression) => cell
/>
```

### Advanced Example:
Visit: [http://127.0.0.1:8080/test-oracle/plural-rule](/test-oracle/plural-rule) for a more sophisticated use case.
- The source code is located at: `demo/src/plural/index.tsx`.
