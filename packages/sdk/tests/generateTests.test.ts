import { describe, test, expect } from '@jest/globals';
import * as fs from 'node:fs';
import { AstBuilder, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
import * as child_process from 'node:child_process';

describe('format gherkin and generate testing code', () => {
  test.each([
    {
      featurePath: '../demo/docs/features/successfulMathRound.feature',
      testsPath: '../demo/tests/noImplement.test.ts',
      outputPath: '../demo/generatedTests.test.ts'
    }
  ])('generate missing Scenarios', async ({ featurePath, testsPath, outputPath }) => {
    //@Given a gherkin file with multiple scenarios
    const strFeatureFile = fs.readFileSync(featurePath).toString?.();
    expect(strFeatureFile).toBeTruthy();

    //@Given a test.ts file that have several test() with steps comments
    const strTestsFile = fs.readFileSync(testsPath).toString?.();
    expect(strTestsFile).toBeTruthy();

    //@When calling generate test API
    const ret = child_process.spawnSync(`npx`, [
      `gen-test`,
      `pathTestsInput=${testsPath}`,
      `pathGherkinInput=${featurePath}`,
      `pathOutput=${outputPath}`
    ]);
    expect(ret.status).toBe(0);

    //@Then the tests will be generated
    const strOutputFile = fs.readFileSync(outputPath).toString();
    expect(strOutputFile).toBeTruthy();

    //@Then the steps are reused in the new scenarios
    expect(
      strOutputFile.match(
        /test\.each\(\[[^\]]+\]\)\("Float and double", async \(\{ num, method, result \}\) => {/
      )
    ).toBeTruthy();
  });
  test.each([
    {
      featurePath: '../demo/docs/features/failWithF16Round.feature',
      testsPath: '../demo/tests/successfulMathRound.test.ts',
      outputPath: '../demo/generatedTests.test.ts'
    }
  ])('generate and update examples', async ({ featurePath, testsPath, outputPath }) => {
    //@Given a gherkin file with multiple scenarios
    const strFeatureFile = fs.readFileSync(featurePath).toString();
    expect(strFeatureFile).toBeTruthy();

    //@Given there are examples
    expect(strFeatureFile.match(/\n\s*?Examples:\s*?\n/)).toBeTruthy();

    //@Given a test.ts file that have several test() with steps comments
    const strTestsFile = fs.readFileSync(testsPath).toString?.();
    expect(strTestsFile).toBeTruthy();

    //@When calling generate test API
    const ret = child_process.spawnSync(`npx`, [
      `gen-test`,
      `pathTestsInput=${testsPath}`,
      `pathGherkinInput=${featurePath}`,
      `pathOutput=${outputPath}`
    ]);
    expect(ret.status).toBe(0);

    //@Then the tests will be generated
    const strOutputFile = fs.readFileSync(outputPath).toString();
    expect(strOutputFile).toBeTruthy();

    //@Then the test.each() is updated
    expect(strTestsFile.match(/test\.each\(\[[^\]]+("f16round")[^\]]+\]\)\("Float and double"/)).toBeFalsy();
    expect(
      strOutputFile.match(/test\.each\(\[[^\]]+("f16round")[^\]]+\]\)\("Float and double"/)
    ).toBeTruthy();
    expect(
      strOutputFile.match(/test\.each\(\[[^\]]+("someThingElse")[^\]]+\]\)\("Float and double"/)
    ).toBeFalsy();
  });
  test.each([
    {
      featurePath: '../demo/docs/features/successfulMathRound.feature',
      testsPath: '../demo/tests/noComment.test.ts',
      outputPath: '../demo/generatedTests.test.ts'
    }
  ])('update old testing code', async ({ featurePath, testsPath, outputPath }) => {
    //@Given a gherkin file with multiple scenarios
    const strFeatureFile = fs.readFileSync(featurePath).toString?.();
    expect(strFeatureFile).toBeTruthy();

    //@Given a test.ts file that have several test() with steps comments
    const strTestsFile = fs.readFileSync(testsPath).toString?.();
    expect(strTestsFile).toBeTruthy();

    //@Given some other test() do not have comments
    const regexComments =
      /\("Float and double", async \(\{ num, method, result \}\) => \{[^\}]*?(\n\s*?\/\/@(Given|When|Then)[^\n]+\s*?\n)[^\}]*?\}/g;
    expect(regexComments.test(strTestsFile)).toBeFalsy();

    //@When calling generate comments API
    const ret = child_process.spawnSync(`npx`, [
      `gen-test`,
      `pathTestsInput=${testsPath}`,
      `pathGherkinInput=${featurePath}`,
      `pathOutput=${outputPath}`
    ]);
    expect(ret.status).toBe(0);

    //@Then the tests will be generated
    const strOutputFile = fs.readFileSync(outputPath).toString();
    expect(strOutputFile).toBeTruthy();

    //@Then the comments of the steps will be generated
    expect(regexComments.test(strOutputFile)).toBeTruthy();

    //@Then the steps are reused in the new scenarios
    expect(
      strOutputFile.match(
        /test\.each\(\[[^\]]+\]\)\("Float and double", async \(\{ num, method, result \}\) => {/
      )
    ).toBeTruthy();
  });
});
