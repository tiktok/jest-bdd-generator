---
id: generateTests
title: Testing code Generation
---
# Generating Testing Code

Once any of your `test()` cases are set up, all the steps within them can be reused. This API transpiles the input file, identifies implemented steps, and groups them based on the corresponding Gherkin. With a well-prepared Gherkin file, most of the testing code can be auto-generated with ease.

## Updating `Examples`
Managing large example tables can lead to mistakes. The newly generated file will update the test cases according to the Gherkin's `Examples` content, converting them into `test.each` blocks to handle different inputs.

## Adding New `Scenarios`
If a `Scenario` is missing its implementation, the API will search for each step within the scenario, sequence the related statements, and generate the necessary test code.

## Code Invocation
To generate tests programmatically, you can invoke the API as follows:
```ts
import { TestGeneratorFromSource } from 'jest-bdd-generator/lib/gherkin-to-test/TestGeneratorFromSource';

const generator = new TestGeneratorFromSource();
const steps = generator.compileKnownStepsFromSource(jestSource);
const ret = generator.generateGherkinFromSource(steps, gherkinSource);
```

## CLI
You can also use the CLI to generate tests:
```bash
npx gen-test pathTestsInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/successfulMathRound.feature pathOutput=./tests/generatedTests.test.ts
```

## Web UI
You can try the demo version of our web UI for generating test code [here](/genTestings).