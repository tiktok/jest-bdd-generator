```bash
npm link ../
```

## first, all is legit Jest
```bash
npx jest
```

## 1. Generate comments of test code from DEFINED STEPS
```bash
npx gen-comments pathTestInput=./tests/noComment.test.ts  pathOutput=./generatedComments.test.ts
# or See also: ./package.json - scripts
npm run gen-comments
#or
```

## 2. Generate test code from Gherkin Document and DEFINED STEPS
```bash
npx gen-test pathTestInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/format.feature pathOutput=./generatedIt.test.ts
# or See also: ./package.json - scripts
npm run gen-test
```

## 3. Generate Gherkin from DEFINED STEPS
```bash
npx gen-doc pathTestsInput=./tests/format.test.ts  pathOutput=./docs/features/generatedFormat.feature
# or See also: ./package.json - scripts
npm run gen-doc
```

## 4. Generate Report.html
```bash
npx gen-report pathTestsInput=./tests/format.test.ts pathFeatureInput=./docs/features/format.feature
# or See also: ./package.json - scripts
npm run gen-report
```
- the output should be `format-report.html` at `./docs/reports`
