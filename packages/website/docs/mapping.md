---
id: comparison
title: Gherkin Jest comparison
---

# Comparison / Mapping of Gherkin to Jest

| **Gherkin**      | **Jest**          |
|------------------|-------------------|
| `Feature`        | `describe()`       |
| `Scenario`       | `test()` / `it()`  |
| `Examples`       | `test.each()`      |
| `Background`     | `beforeAll()`      |
| `Steps`          | Code statements with `//@STEP` comments |

## Example: Mapping a Gherkin Scenario to Jest

Here’s how a Gherkin scenario translates perfectly into a Jest test:

### Gherkin
```gherkin
Feature: Rounding methods of Math

Scenario Outline: Integer pattern
  Given input number is <num>
  When rounding with <method>
  Then rounded number is <result>

Examples:
| num    | method | result |
| 1234.1 | "ceil" | 1235   |
| 1234.9 | "ceil" | 1235   |
| -1234.1| "ceil" | -1234  |
| -1234.9| "ceil" | -1234  |
| 1234.1 | "floor"| 1234   |
| 1234.9 | "floor"| 1234   |
| -1234.1| "floor"| -1235  |
| -1234.9| "floor"| -1235  |
| 1234.5 | "round"| 1235   |
| 1234.4 | "round"| 1234   |
| -1234.5| "round"| -1234  |
| -1234.6| "round"| -1235  |
```

### Jest
```ts
import { describe, test, expect } from '@jest/globals';

describe('Rounding methods of Math', () => {
  test.each([
    { num: 1234.1, method: 'ceil', result: 1235 },
    { num: 1234.9, method: 'ceil', result: 1235 },
    { num: -1234.1, method: 'ceil', result: -1234 },
    { num: -1234.9, method: 'ceil', result: -1234 },
    { num: 1234.1, method: 'floor', result: 1234 },
    { num: 1234.9, method: 'floor', result: 1234 },
    { num: -1234.1, method: 'floor', result: -1235 },
    { num: -1234.9, method: 'floor', result: -1235 },
    { num: 1234.5, method: 'round', result: 1235 },
    { num: 1234.4, method: 'round', result: 1234 },
    { num: -1234.5, method: 'round', result: -1234 },
    { num: -1234.6, method: 'round', result: -1235 }
  ])('Integer pattern for $method', ({ num, method, result }) => {
    //@Given input number is <num>
    expect(typeof num).toBe('number');

    //@When rounding with <method>
    expect(Math).toHaveProperty(method);

    //@Then rounded number is <result>
    expect(Math[method](num)).toEqual(result);
  });
});
```

In this example, the Gherkin feature and scenario outline are mapped directly into Jest's `describe()`, `test.each()`, and `expect()` functions, with comments marking the corresponding Gherkin steps (`//@STEP`). This provides a clear 1:1 mapping, demonstrating how the two frameworks align in structure and logic.