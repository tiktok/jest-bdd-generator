import { compose } from '../jest-to-gherkin';
import { run } from './adapter'; // console.log(process.argv)
import * as path from 'path';
import * as fs from 'fs';

const files = fs.readdirSync(path.join(process.cwd(), './tests'));
let defaultFileEntry;
if (files[0]) {
  defaultFileEntry = files[0].match(/(\w+)\.test\.ts/)?.[1] ?? 'index';
}

const options = {
  pathTestsInput: path.join(process.cwd(), `./tests/${defaultFileEntry}.test.ts`),
  pathOutput: path.join(process.cwd(), `./doc/features/${defaultFileEntry}.test.feature`),
};

void run(compose, options, ['pathTestsInput']);
