import * as fs from 'fs';
import * as path from 'path';
import { JestToGherkin } from './JestToGherkin';
export * from './JestToGherkin';

/**
 * Read from the given path and create Jest to Gherkin transpiler instance.
 * @param pathTestsInput {string} path to the TypeScript testing code in Jest.
 * @returns Jest to Gherkin transpiler instance, which compiles TypeScript testing code in Jest.
 */
function createTranspiler(pathTestsInput: string): JestToGherkin {
  const source = fs.readFileSync(pathTestsInput).toString();
  const transpiler = new JestToGherkin();
  transpiler.fileName = path.basename(pathTestsInput);
  const _o = transpiler.transpile(source, { fileName: pathTestsInput }).outputText;
  return transpiler;
}

/**
 * Read from the given path of Jest testing code and compose Gherkin source code.
 * @param options {{pathTestsInput: string}}: String path to the TypeScript testing code in Jest
 * @returns Composed Gherkin source code.
 */
export function compose(options: { pathTestsInput: string }): string {
  const { pathTestsInput } = options;
  const transpiler = createTranspiler(pathTestsInput);
  return transpiler.outputCode();
}

/**
 *
 * @param options {{pathTestsInput: string}}: String path to the TypeScript testing code in Jest
 * @returns
 */
export function generateComments(options: { pathTestsInput: string }): string {
  const { pathTestsInput } = options;
  const transpiler = createTranspiler(pathTestsInput);
  return transpiler.generateComments();
}
