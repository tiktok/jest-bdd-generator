# BDD test tool
[CucumberJS](https://cucumber.io/docs/installation/javascript/) runs automated acceptance tests written in a behavior-driven development (BDD) style. At its core, Cucumber allows the execution of feature documentation written in plain language. This plain language is defined by a language called [Gherkin](https://cucumber.io/docs/gherkin/reference/). Cucumber enables developers, QA engineers, and non-technical stakeholders to collaborate and create a shared understanding of how the software should behave by using these Gherkin specifications, which describe the desired features and their expected behaviors in a natural, human-readable format.

### Describe the steps
Cucumber divides testing code into steps and runs them in sequence by the Scenarios defined.  
1. Setup (Given): Establish the context.
2. Action (When): Perform actions or simulate events.
3. Assertion (Then): Check the outcomes against the expected results.

### Reusing the steps
One of the powerful aspects of Cucumber and the BDD approach is the ability to reuse step definitions across multiple scenarios and features, allowing you to cover a wide range of test cases with a relatively small amount of code. This reuse is facilitated by writing generic step definitions that can be parameterized to handle different data and contexts.

### Tools for Jest.js
In Cucumber, the equivalent concept to Jest's `test()` function is a "Scenario." Each Scenario represents a single path or example through a feature, describing a particular behavior of the application in a given situation. 
Unlike the steps from CucumberJS, in unit testing the functions being tested should not rely on external context or state. This isolation ensures that tests are deterministic, meaning they will produce the same outcome every time they are run if the code hasn't changed. This characteristic is crucial for identifying and troubleshooting issues quickly and accurately.

### Comparison / Mapping:

| Cucumber | Jest |
| --- | --- |
| Feature | `define()` |
| Scenario | `test()` / `it()` |
| Examples | ` .each()` |
| Steps | code statements and `//@STEP:` comments |

# Features:


## 1. View DEFINED STEPS
```ts
import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';

const transpiler = new JestToGherkin();
transpiler.transpile(jestSource, { fileName: '*.test.ts' });
const uniqueSteps = transpiler.uniqueSteps;
```

## 1. Generate comments of test code from DEFINED STEPS
```ts
import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';

const transpiler = new JestToGherkin();
transpiler.transpile(jestSource, { fileName: '*.test.ts' });
const ret = transpiler.generateComments();
```

```bash
npx gen-comments pathTestInput=./tests/format.test.ts  # pathOutput=./generatedTest.ts
# >>>./generatedTest.ts
```

## 1. Generate test code from Gherkin Document and DEFINED STEPS
```ts
import { TestGeneratorFromSource } from 'jest-bdd-generator/lib/gherkin-to-test/TestGeneratorFromSource';

const generator = new TestGeneratorFromSource();
const steps = generator.compileKnownStepsFromSource(jestSource);
const ret = generator.generateGherkinFromSource(steps, gherkinSource) 
```

```bash
npx gen-test pathTestInput=./tests/format.test.ts pathGherkinInput=./docs/features/format.feature # pathOutput=./generatedTest.ts
```

## 1. Generate Gherkin from DEFINED STEPS
```ts
import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';

const transpiler = new JestToGherkin();
const ret = transpiler.transpile(jestSource, { fileName: 'a.test.ts' }).outputText;
```
```bash
npx gen-doc pathTestsInput=./tests/format.test.ts # pathOutput=./doc/features/format.feature

```

## 1. Generate Report.html
```ts
import { runTests } from 'jest-bdd-generator'

runTest({
  pathFeatureInput: './docs/features/format.feature',
  pathTestsInput: './tests/format.test.ts',
  pathOutput: './docs/reports/' // default = './docs/reports'
})
```

```bash
npx report pathTestsInput=./tests/format.test.ts pathFeatureInput=./docs/features/format.feature
#>>> pathOutput DEFAULT ./report.html
```
