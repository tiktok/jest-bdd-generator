import * as ts from 'typescript';

/**
 * Step key enumeration. Gherkin keywords.
 */
export type IStepKey = 'Given' | 'When' | 'Then' | 'Examples' | 'Scenario' | 'Feature';

/**
 * Interface of Step.
 */
export type IStep = {
  /** Parameters the step referenced */
  stepParams?: string[];
  /** Gherkin keyword */
  key: IStepKey;
  value: string;
  /**
   * Examples data for Scenario Outline.
   * Undefined if not an Outline Scenario.
   */
  examples?: Array<Record<string, string | number>>;
  /**
   * Removed special characters from the title to make it suitable for file names or identifiers.
   */
  sanitizedTitle?: string;
  pos: {
    /**
     * Line and character position in source file.
     * For Scenario, position is at the start bracket of the function body.
     *   `test('...', () => {<-- start ... end -->})`
     * For Step, position is at the start of the comment keyword.
     *   `\n<-- start // @Given ... \n ... \n end -->`
     */
    start: {
      line: number;
      character: number;
      pos: number;
    };
    /**
     * Line and character position in source file where the step ends.
     */
    end: {
      line: number;
      character: number;
      pos: number;
    };
  };
  /**
   * Host Scenario title.
   */
  host?: string;
  /**
   * Host Scenario sanitized title.
   */
  parent?: string;
  sourceCode?: {
    /**
     * For Scenario, full text of the `test('...', () => {...})` function declaration.
     * Includes the body and its wrappings, which is not the same as `this.pos`
     *
     */
    fullText: string;
    /**
     * Accessed variables or any identifiers inside the step.
     */
    imports?: string[];
    /**
     * Declared variables or any identifiers inside the step.
     */
    exports?: string[];
    /**
     * The TypeScript statements inside the step.
     */
    statements?: ts.Statement[];
  };
};

/**
 * Example Step interface, extends IStep.
 */
export type ExampleStep = {
  key: 'Examples' | 'Scenario';
  examples: Array<Record<string, string | number>>;
} & IStep;

export type Step = ExampleStep | IStep;

export type Result = Step & {
  status?: 'passed' | 'skipped' | 'failed';
  errors?: string[];
};
