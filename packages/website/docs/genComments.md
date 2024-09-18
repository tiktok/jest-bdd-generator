---
id: genComments
title: //@step comments Generation
---
# Generate Comments for Test Code
Automatically generate comments for the test code using predefined steps:


## invoke from code
```ts
import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';

const transpiler = new JestToGherkin();
transpiler.transpile(jestSource, { fileName: '*.test.ts' });
const ret = transpiler.generateComments();
```
## CLI

  ```bash
  npx gen-comments pathTestsInput=./tests/noComment.test.ts pathOutput=./generatedComments.test.ts
  ```

  