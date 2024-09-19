---
id: generateGherkins
title: Gherkin *.feature generation
---

# Generate `*.feature` Files

## View the Corresponding Gherkin for Your Tests
Easily compare or debug your test cases by generating a corresponding `*.feature` file. The API scans through your test functions and comments, formatting them into Gherkin for a clear, structured view.

## Generate New `*.feature` Files
If you're migrating from an existing project, the API can automatically generate Gherkin files based on your test comments, allowing for a seamless transition to BDD.

## API Usage
To generate a Gherkin document from test cases, use the following command:
```bash
npx gen-doc pathTestsInput=./tests/failWithF16Round.test.ts pathOutput=./docs/features/generatedFeature.feature
```

## Web UI
Try our demo Web UI for generating Gherkin files [here](/fullImplement):
- Click the button labeled `Generate Gherkin from DEFINED STEPS` to generate a Gherkin file from your defined steps.
