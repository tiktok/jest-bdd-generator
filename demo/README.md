```bash
npm link ../
```

## 0. first, all is legit Jest
* a successful testing.
```bash
npx jest tests/successfulMathRound.test.ts # It should succeed
```
* a failed testing for ([Math.f16round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/f16round)) which is not available in Node.js. Failures are shown.
```bash
npx jest tests/failWithF16Round.test.ts # Math.f16round is not around
```

## 1. Generate comments of test code from DEFINED STEPS
```bash
npx gen-comments pathTestInput=./tests/noComment.test.ts  pathOutput=./generatedComments.test.ts
```
  - See also: `./package.json` - `scripts`:
    - `npm run gen-comments`
  - or try to Generate test as below

## 2. Generate test code from Gherkin Document and DEFINED STEPS

* One of the test cases for Float are not implemented.
```bash
npx gen-test pathTestInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/failWithF16Round.feature pathOutput=./generatedIt.test.ts
```
  - See also: `./package.json` - `scripts`:
    - `npm run gen-test`

## 3. Generate Gherkin from DEFINED STEPS
```bash
npx gen-doc pathTestsInput=./tests/failWithF16Round.test.ts  pathOutput=./docs/features/generatedFeature.feature
```
  - See also: `./package.json` - `scripts`:
    - `npm run gen-doc`

## 4. Generate Report.html
* `failWithF16Round` will show `failures` and `callstacks`
```bash
npx gen-report pathTestsInput=./tests/failWithF16Round.test.ts pathFeatureInput=./docs/features/failWithF16Round.feature
```
  - the output should be `failWithF16Round-report.html` at `./docs/reports`
  - See also: `./package.json` - `scripts`:
    - `npm run gen-report`

* and of course, a report of the successful testing `successfulMathRound`
```bash
npx gen-report pathTestsInput=./tests/successfulMathRound.test.ts pathFeatureInput=./docs/features/successfulMathRound.feature
```

## 5. See the Test Oracle
```bash
npm run start
echo "visit : http://127.0.0.1:8080"
```