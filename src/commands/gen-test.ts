import { TestGenerator } from '../gherkin-to-test';

import { run } from './adapter'; // console.log(process.argv)
import * as path from 'path';
import * as fs from 'fs';

async function main(): Promise<void> {
  const files = fs.readdirSync(path.join(process.cwd(), './tests'));
  let defaultFileEntry;
  if (files[0]) {
    defaultFileEntry = files[0].match(/(\w+)\.test\.ts/)?.[1] ?? 'index';
  }

  const generator = new TestGenerator();

  function execute(
    ...args: Parameters<typeof generator.generateGherkin>
  ): ReturnType<typeof generator.generateGherkin> {
    return generator.generateGherkin(...args);
  }

  const options: Parameters<typeof generator.generateGherkin>[0] = {
    pathTestInput: path.join(process.cwd(), `./tests/${defaultFileEntry}.test.ts`),
    pathGherkinInput: path.join(process.cwd(), `./features/${defaultFileEntry}.test.feature`),
  };
  const optionsFromArgV: (keyof Parameters<typeof generator.generateGherkin>[0])[] = [
    'pathTestInput',
    'pathGherkinInput',
  ];

  const stepsKnown = run(execute, options, optionsFromArgV);
}

void main();
