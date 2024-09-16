import { JestToGherkin } from '../jest-to-gherkin';
import { Transpile } from '../transpiler';
import * as path from 'path';
export class JestCucumberExecute extends JestToGherkin {
  outputCode(): ReturnType<Transpile['outputCode']> {
    const fileHeadJest = `const DelegateJest = require('${path.join(__dirname, './delegate-jest')}').DelegateJest;
  const cachedResult = new DelegateJest(__filename);
  cachedResult.delegateTo(${JSON.stringify(this.steps)});`;
    return fileHeadJest;
  }
}
