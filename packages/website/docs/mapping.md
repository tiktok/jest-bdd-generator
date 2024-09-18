---
id: mapping
title: Gherkin Jest comparison
---

# Comparison / Mapping of Gherkin to Jest

| Cucumber | Jest |
| --- | --- |
| `Feature` | `define()` |
| `Scenario` | `test()` / `it()` |
| `Examples` | `test.each()()` |
| `Background` | `beforeAll()` |
| `Steps` | code statements and `//@STEP` comments |

## for instance, these two are the perfect match
```Gherkin
Feature: Rounding methods of Math

Scenario Outline: Integer pattern
  Given input number is <num>
  When rounding with <method>
  Then rounded number is <result>

Examples:
| num | method | result |
| 1234.1 | "ceil" | 1235 |
| 1234.9 | "ceil" | 1235 |
| -1234.1 | "ceil" | -1234 |
| -1234.9 | "ceil" | -1234 |
| 1234.1 | "floor" | 1234 |
| 1234.9 | "floor" | 1234 |
| -1234.1 | "floor" | -1235 |
| -1234.9 | "floor" | -1235 |
| 1234.5 | "round" | 1235 |
| 1234.4 | "round" | 1234 |
| -1234.5 | "round" | -1234 |
| -1234.6 | "round" | -1235 |
```

```ts
import { describe, test, it, expect } from '@jest/globals';

describe('Fail With Math.f16Round', () => {
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
  ])('Integer pattern', async ({ num, method, result }) => {
    //@Given input number is <num>
    expect(typeof num).toBe('number');

    //@When rounding with <method>
    expect(Math).toHaveProperty(method);

    //@Then rounded number is <result>
    expect(Math[method](num)).toEqual(result);
  });
});


```