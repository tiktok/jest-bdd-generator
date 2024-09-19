---
id: generateComments
title: //@step comments Generation
---

# Generate Comments for Test Code

This API automatically generates `//@step` comments for your test code, based on predefined steps.

### Upgrading Your Existing Tests
To integrate our system, you’ll need to update your test code by adding `//@step` comments. Don’t worry—each comment only needs to be added once per step. 

Once a `test()` function for a `Scenario` is ready, the system will automatically identify all the steps within that scenario. It will then search the entire file for matching code sequences and mark them with the appropriate `//@step` comments.

## Code Invocation
To generate comments programmatically, you can use the following code:
```ts
import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';

const transpiler = new JestToGherkin();
transpiler.transpile(jestSource, { fileName: '*.test.ts' });
const ret = transpiler.generateComments();
```

## CLI
You can also generate comments using the CLI:
```bash
npx gen-comments pathTestsInput=./tests/noComment.test.ts pathOutput=./generatedComments.test.ts
```

## Web UI
Try out our demo Web UI for generating comments [here](/genComments):
- The second function compares the original code to the one with added comments.
- Click the second button to automatically insert the `//@step` comments.