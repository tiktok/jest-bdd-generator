import React from 'react';
import { CustomPageWrapper } from '../root';
import { TestGeneration } from 'jest-bdd-generator/UI/TestGeneration';
// import { TestStory } from 'jest-bdd-generator/UI/TestStory';
// import { TestOraclePluralRule } from 'demo-project/src/plural';
import { TestOracleF16Round } from 'demo-project/src/f16round';
import {
  useDocsSidebar,
  DocsSidebarProvider
} from '@docusaurus/plugin-content-docs/lib/client/docsSidebar.js';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/lib/client/index.js';
import { SidebarItemConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types.js';

const tests = `import { describe, test, it, expect } from '@jest/globals';

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
  ])('Integer pattern', async ({ num, method, result }) => {
    //@Given input number is <num>
    expect(typeof num).toBe('number');

    //@When rounding method is <method>
    expect(Math).toHaveProperty(method);

    //@Then rounded number is <result>
    expect(Math[method](num)).toEqual(result);
  });
  test.each([
    { num: 5.5, method: 'fround', result: 5.5 },
    { num: 5.5, method: 'f16round', result: 5.5 },
    { num: 5.05, method: 'fround', result: 5.050000190734863 },
    { num: 5.05, method: 'f16round', result: 5.05078125 },
    { num: 5, method: 'fround', result: 5 },
    { num: 5, method: 'f16round', result: 5 },
    { num: -5.05, method: 'fround', result: -5.050000190734863 },
    { num: -5.05, method: 'f16round', result: -5.05078125 }
  ])('Float and double', async ({ num, method, result }) => {
    expect(typeof num).toBe('number');
    expect(Math).toHaveProperty(method);
    expect(Math[method](num)).toEqual(result);
  });
});

`;

const gherkin = `@format-feature
Feature: Fail With Math.f16Round
- reference:  ([Math.f16round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/f16round)) 

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


Scenario Outline: Float, Single and double
  Given input number is <num>
  When rounding with <method>
  Then rounded number is <result>

Examples:
| num | method | result |
| 5.5 | "fround" | 5.5 |
| 5.5 | "f16round" | 5.5 |
| 5.05 | "fround" | 5.050000190734863 |
| 5.05 | "f16round" | 5.05078125 |
| 5 | "fround" | 5 |
| 5 | "f16round" | 5 |
| -5.05 | "fround" | -5.050000190734863 |
| -5.05 | "f16round" | -5.05078125 |`;

export default function Help() {
  return (
    <CustomPageWrapper path="/genComments">
      <TestGeneration featureSource={gherkin} testsSource={tests} />
    </CustomPageWrapper>
  );
}
