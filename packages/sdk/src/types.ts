import * as ts from 'typescript';
export type IStepKey = 'Given' | 'When' | 'Then' | 'Examples' | 'Scenario' | 'Feature';
export type IStep = {
  stepParams?: string[];
  key: IStepKey;
  value: string;
  examples?: Array<Record<string, string | number>>;
  sanitizedTitle?: string;
  pos: {
    /**
     * Line and character position in source file.
     * For Scenario, position is at the start bracket of the function body. `test('...', () => {<-- start ... end -->})`
     * For Step, position is at the start of the comment keyword.
     */
    start: {
      line: number;
      character: number;
      pos: number;
    };
    end: {
      line: number;
      character: number;
      pos: number;
    };
  };
  host?: string;
  parent?: string;
  sourceCode?: {
    /**
     * For Scenario, full text of the `test('...', () => {...})` function declaration. Includes the body and its wrappings.
     */
    fullText: string;
    imports?: string[];
    exports?: string[];
    statements?: ts.Statement[];
  };
};

export type ExampleStep = {
  key: 'Examples' | 'Scenario';
  examples: Array<Record<string, string | number>>;
} & IStep;

export type Step = ExampleStep | IStep;

export type Result = Step & {
  status?: 'passed' | 'skipped' | 'failed';
  errors?: string[];
};
