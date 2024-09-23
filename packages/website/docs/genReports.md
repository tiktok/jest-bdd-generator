---
id: generateReports
title: Report Jest in Cucumber style
---

# Generate a Cucumber style report for Jest output


Generate an HTML report for a failing test, which includes failure details and call stacks:
  ```bash
  npx gen-report pathTestsInput=<some.test.ts> pathFeatureInput=<a_gherkin_file.feature>
  ```
  - The above output will be `a_gherkin_file-report.html` saved in the `./docs/reports` folder.
