---
id: genTests
title: Testing code Generation
---

# Generating testing code

Given a well prepared Gherkin, most of the testing code can easily be generated.

## invoke with code.
```ts
import { TestGeneratorFromSource } from 'jest-bdd-generator/lib/gherkin-to-test/TestGeneratorFromSource';

const generator = new TestGeneratorFromSource();
const steps = generator.compileKnownStepsFromSource(jestSource);
const ret = generator.generateGherkinFromSource(steps, gherkinSource) 
```
## CLI
 ```bash
  npx gen-test pathTestsInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/successfulMathRound.feature pathOutput=./tests/generatedTests.test.ts
```

## Web UI