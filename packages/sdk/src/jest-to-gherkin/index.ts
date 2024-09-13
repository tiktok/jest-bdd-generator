import * as fs from 'fs';
import * as path from 'path';
import { JestToGherkin } from './JestToGherkin';
export * from './JestToGherkin';

function createTranspiler(pathTestsInput: string): JestToGherkin {
  const source = fs.readFileSync(pathTestsInput).toString();
  const transpiler = new JestToGherkin();
  transpiler.fileName = path.basename(pathTestsInput);
  const _o = transpiler.transpile(source, { fileName: pathTestsInput }).outputText;
  return transpiler;
}

export function compose(options: { pathTestsInput: string }): string {
  const { pathTestsInput } = options;
  const transpiler = createTranspiler(pathTestsInput);
  return transpiler.outputCode();
}

export function generateComments(options: { pathTestsInput: string }): string {
  const { pathTestsInput } = options;
  const transpiler = createTranspiler(pathTestsInput);
  return transpiler.generateComments();
}
