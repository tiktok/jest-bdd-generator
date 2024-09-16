/* eslint-disable @typescript-eslint/no-unused-vars */
import { AstBuilder, GherkinClassicTokenMatcher, Parser /*, compile */ } from '@cucumber/gherkin';
import { /* GherkinDocument, */ IdGenerator /* , PickleStep */ } from '@cucumber/messages';
import * as prettier from 'prettier';
import { JestToGherkin } from '../jest-to-gherkin';
// import { Step } from '../types';
import * as fs from 'fs';
// import * as path from 'path';
import { TestGeneratorFromSource } from './TestGeneratorFromSource';

/*

var builder = new Gherkin.AstBuilder(uuidFn)
var matcher = new Gherkin.GherkinClassicTokenMatcher() // or Gherkin.GherkinInMarkdownTokenMatcher()

var parser = new Gherkin.Parser(builder, matcher)
var gherkinDocument = parser.parse('Feature: ...')
var pickles = Gherkin.compile(gherkinDocument, 'uri_of_the_feature.feature', uuidFn)

*/

const newId = IdGenerator.uuid();
const builder = new AstBuilder(newId);
const matcher = new GherkinClassicTokenMatcher();
const _parser = new Parser(builder, matcher);
// const pickles =
// console.log(pickles)

export class TestGenerator extends TestGeneratorFromSource {
  compileKnownSteps(pathTestInput: string): JestToGherkin['output'] {
    const source = fs.readFileSync(pathTestInput).toString();
    return this.compileKnownStepsFromSource(source);
  }
  async generateGherkin(options: {
    pathTestsInput: string;
    pathGherkinInput: string;
  }): Promise<string | void> {
    const { pathTestsInput, pathGherkinInput } = options;
    const steps = this.compileKnownSteps(pathTestsInput);
    const gherkinSource = fs.readFileSync(pathGherkinInput).toString();
    const testingCode = this.generateGherkinFromSource(steps, gherkinSource);
    return testingCode ? prettier.format(testingCode, { parser: 'typescript' }) : undefined;
  }
}
