import { runTests } from '../index';
import { run } from './adapter'; // console.log(process.argv)
import * as path from 'path';

const options: Parameters<typeof runTests>[0] = {
  pathFeatureInput: path.join(process.cwd(), './doc/features'),
  pathTestsInput: path.join(process.cwd(), './tests'),
  pathOutput: path.join(process.cwd(), './doc/reports'),
};
// const optionsFromArgV = Object.keys(options) as Exclude<keyof Parameters<typeof runTests>[0], 'scenario'>[];

void run(runTests, options);
