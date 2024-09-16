import * as ts from 'typescript';
export type IStepKey = 'Given' | 'When' | 'Then' | 'Examples' | 'Scenario' | 'Feature';
export type IStep = {
  stepParams?: string[];
  key: IStepKey;
  value: string;
  examples?: Array<Record<string, string | number>>;
  sanitizedTitle?: string;
  pos: {
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
