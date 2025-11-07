/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @ttfe/@typescript-eslint/no-unnecessary-condition */
import * as ts from 'typescript';
import { IStepKey, Step } from '../types';
export * from '../types';
type ISearchableExpression =
  | ts.Identifier
  | ts.PropertyAccessExpression
  | ts.ParenthesizedExpression
  | ts.CallExpression
  | ts.AwaitExpression
  | ts.TaggedTemplateExpression;

// function isTsNode(node: Exclude<unknown, ts.Node>): false;
// function isTsNode(node: ts.Node): true;
function isTsNode(node: unknown): boolean {
  const v = node as ts.Node | undefined;
  return !!v && !!(ts.SyntaxKind[v.kind] && ts.NodeFlags[v.flags]);
}

const compareNodesIgnores = ['pos', 'end', 'id', 'parent', 'nextContainer'];

function compareNodes(node1: ts.Node, node2: ts.Node): boolean {
  const keys = Object.keys(node1) as Array<keyof ts.Node>;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (compareNodesIgnores.indexOf(k) !== -1) {
      continue;
    }
    const v1 = node1[k];
    const v2 = node2[k];
    if (typeof v1 === 'string') {
      if (typeof v2 !== 'string' || v2 !== v1) {
        return false;
      }
    } else if (typeof v1 === 'number') {
      if (typeof v2 !== 'number' || v2 !== v1) {
        return false;
      }
    } else if (Array.isArray(v1)) {
      if (!Array.isArray(v2) || v2.length !== v1.length) {
        return false;
      }
      for (let j = 0; j < v1.length; j++) {
        if (!compareNodes(v1[j], v2[j])) {
          return false;
        }
      }
    } else if (isTsNode(v1)) {
      if (!isTsNode(v2)) {
        return false;
      }
      // console.log(k);
      if (!compareNodes(v1 as ts.Node, v2 as ts.Node)) {
        return false;
      }
    }
  }
  return true;
}

function searchCallName(node: ISearchableExpression): string | string[] | void {
  if (ts.isParenthesizedExpression(node) && ts.isBinaryExpression(node.expression)) {
    return searchCallName(node.expression.right as ts.Identifier | ts.ParenthesizedExpression);
  } else if (ts.isPropertyAccessExpression(node)) {
    // property access node, such as 'a.b' : expression == 'a'; /* left */; name == 'b'  /* right */;
    return searchCallName(node.expression as Parameters<typeof searchCallName>[0]) ?? node.name.escapedText;
  } else if (ts.isIdentifier(node)) {
    return node.escapedText;
  } else if (ts.isCallExpression(node) || ts.isAwaitExpression(node)) {
    return searchCallName(node.expression as Parameters<typeof searchCallName>[0]);
  } else if (ts.isTaggedTemplateExpression(node)) {
    return searchCallName(node.tag as Parameters<typeof searchCallName>[0]);
  }
}

function traverseArguments(
  arrArgsMap: ISearchCallSchema[0],
  callExpression: ts.CallExpression,
  context: ts.TransformationContext
): void {
  const contextCallExpression = {} as IArgumentsSearchContext;
  for (let argIndex = 0; argIndex < arrArgsMap.arguments.length; argIndex++) {
    const argMapTo = arrArgsMap.arguments[argIndex];
    const currentArgument = callExpression.arguments[argIndex];
    if (argMapTo.callback) {
      argMapTo.callback(currentArgument, callExpression, contextCallExpression);
    }
    if (argMapTo.searchCallSchema) {
      if (ts.isArrowFunction(currentArgument) || ts.isFunctionExpression(currentArgument)) {
        traverseChildren(argMapTo.searchCallSchema, currentArgument.body, context);
      }
    }
  }
}

function traverseChildren(
  signatures: ISearchCallSchema,
  node: ts.Node,
  context: ts.TransformationContext
): void {
  ts.visitEachChild(
    node,
    (subNode) => {
      if (ts.isExpressionStatement(subNode) && ts.isCallExpression(subNode.expression)) {
        const callExpression = subNode.expression;
        const name = searchCallName(callExpression.expression as ISearchableExpression);
        for (let i = 0; i < signatures.length; i++) {
          const arrArgsMap = signatures[i];
          if (typeof arrArgsMap === 'function') {
            continue;
          }

          if (name === arrArgsMap.keyword) {
            // there is a match
            traverseArguments(arrArgsMap, callExpression, context);

            if (arrArgsMap.chain) {
              let subExpression: ts.CallExpression | ts.PropertyAccessExpression = callExpression;
              while (subExpression.expression) {
                if (ts.isPropertyAccessExpression(subExpression.expression)) {
                  const nameChain = subExpression.expression.name.escapedText;
                  const chainSchema = arrArgsMap.chain.find((schemaKey) => schemaKey.keyword === nameChain);
                  if (chainSchema) {
                    traverseArguments(chainSchema, subExpression, context);
                  }

                  return subNode;
                }
                subExpression = subExpression.expression as ts.CallExpression;
              }
            }
          }
        }
      }
    },
    context
  );
}

export type ICallbackOnFunctionExpression = (
  node: ts.Expression,
  callExpression: ts.CallExpression,
  context: IArgumentsSearchContext,
  ..._any: unknown[]
) => void;
export type IArgumentsSearchContext = {
  host: string;
  stepOfCurrentFunction: Step;
};
export type ISearchExpressionSchema = {
  keyword: string;
  arguments: { callback?: ICallbackOnFunctionExpression; searchCallSchema?: ISearchCallSchema }[];
  chain?: ISearchCallSchema;
};
export type ISearchCallSchema = Array<ISearchExpressionSchema>;

/**
 * TypeScript Custom Transformer Factory for Jest to Gherkin transpilation.
 * Can be used in `ts.transpileModule` transformers.
 * @param searchSchema {ISearchCallSchema} Search schema for Jest to Gherkin transpilation.
 * @param self The factory owner, i.e., Transpile instance.
 * @returns {ts.CustomTransformerFactory} TypeScript Custom Transformer Factory. Works as a part of TypeScript transpilation.
 */
export const customTransformerFactory: (
  searchSchema: ISearchCallSchema,
  self: Transpile
) => ts.CustomTransformerFactory = (searchSchema, self) => (context) => {
  return {
    transformBundle: (node) => node,
    transformSourceFile: (node: ts.SourceFile) => {
      self.sourceFile = node;
      if (node.fileName.match(/\.test\.ts/)) {
        traverseChildren(searchSchema, node, context);
      }
      return node;
    }
  };
};

export class Transpile {
  /**
   * The search schema for Jest to Gherkin transpilation. It looks for `describe`, `test`, `it` function calls.
   * And ``@When ...``, `@Then ...`, `@Given ...` comments.
   */
  searchSchema!: ISearchCallSchema;
  /**
   * The source code to be transpiled.
   */
  source: string = '';
  sourceFile?: ts.SourceFile;
  /**
   * The retrieved step.
   * During the transpilation, steps are pushed into this array.
   * 'searchSchema' defines how to find the steps.
   */
  public output: Step[] = [];
  /**
   * the `Step` compiled from the source code.
   */
  public get steps(): Step[] {
    return this.output.map((s) => {
      const { key, value, host, parent, pos, examples } = s;
      return { key, value, host, parent, pos, examples };
    });
  }
  public get uniqueSteps(): Step[] {
    const stepsCopied = this.steps;
    return stepsCopied.filter(
      (s, i) => stepsCopied.findIndex((f) => f.key === s.key && f.value === s.value) === i
    );
  }
  // public get outputText(): string {
  //   return this._prepareOutput();
  // }

  /**
   * Based on code repeation, if a sequence of code matches multiple times, it is considered as a possible step.
   * Set during transpilation.
   */
  public possibleStep: Step[] = [];

  /** Setter for the source code to be transpiled. */
  public set input(input: string) {
    const sourceMap = this.dealwithSourceMap(input);

    if (sourceMap?.sourcesContent?.[0]) {
      this.source = sourceMap.sourcesContent[0];
    } else {
      this.source = input;
    }
  }

  /** Getter for the source code to be transpiled. */
  get input(): string {
    return this.source;
  }

  constructor(searchSchema?: ISearchCallSchema) {
    if (searchSchema) {
      this.searchSchema = searchSchema;
    }
  }

  /** Parse the position number to line and character. */
  parsePosition(pos: number): Step['pos']['start'] {
    if (this.sourceFile) {
      const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(pos);
      return {
        line,
        character,
        pos
      };
    } else {
      throw new Error();
    }
  }

  groupToScenario(): void {
    const scenarios = this.output.filter((step) => step.key === 'Scenario');
    this.output.forEach((step) => {
      if (step.key === 'Scenario') {
        return;
      }

      switch (step.key) {
        case 'Given':
        case 'When':
        case 'Then': {
          const parent = scenarios.find(
            (s) => s.pos.start.pos < step.pos.start.pos && s.pos.end.pos >= step.pos.end.pos //s.pos.start.line < step.pos.start.line && s.pos.end.line > step.pos.end.line,
          );
          if (!parent) {
            return;
          }
          step.parent = parent.value;
          break;
        }
        case 'Examples': {
          const parent = scenarios.find((s) => s.value === step.value && s.key === 'Scenario');
          if (!parent) {
            return;
          }
          step.parent = parent.value;
          parent.examples = step.examples;
          break;
        }
        default:
          break;
      }
    });
  }

  getDeclaration(declaration: ts.VariableDeclaration | ts.BindingElement): string[] {
    if (ts.isObjectBindingPattern(declaration.name)) {
      return declaration.name.elements.map((a) => this.getDeclaration(a)).flat();
    } else if (ts.isIdentifier(declaration.name)) {
      return [declaration.name.escapedText.toString()];
    }
    return [];
  }

  /**
   * Find code for a step when it is not implemented yet.
   * Search for the same Step signature in other Scenarios.
   * If found, generate comments for those steps.
   * Use the following RegExp to find or replace the generated comments:
   * ```ts
   * // /^\s*?\/\*\*\n\*\s*?FOUND: @.+\n(\*.+\n)+/g
   * @returns
   */
  generateComments(): string {
    const possibleStep: Step[] = this.possibleStep ?? [];
    const output: string[] = [];
    let lastIndex = 0;

    possibleStep.reduce((prev, step, i, self) => {
      const start = step.pos.start.pos;
      if (step.key === ('Matched Scenario' as any as IStepKey)) {
        // output.push(`//@Scenario ${step.value}`)
        return prev;
      }
      if (start < lastIndex) {
        console.error('warning: Overlap!');
        return prev;
      }
      const end = step.pos.end.pos;
      const stepDuplicated = prev.find((s) => s.key === step.key && s.value === step.value);
      if (stepDuplicated) {
        return prev;
      }
      output.push(
        this.input.substring(lastIndex, start),
        `\n`,
        ...step.value.split('\n').map((v) => `\n  //@${step.key}${v}`),
        this.input.substring(start, end),
        `\n  //# end of matched [@${step.value}] from [${step.parent}] Scenario\n`
      );
      lastIndex = end;
      return prev;
    }, [] as Step[]);
    output.push(this.input.substring(lastIndex));

    return output.join('');
  }

  /**
   * Search the block for code sequences that match known steps.
   * If found, generate a comment to mark the Step signature.
   * @param block
   * @returns {Step[]} The retrieved steps from matched code sequences.
   */
  generateFromKnownSteps(block: ts.Block): Transpile['output'] {
    const mapStatementsMatch = this.output.map((step) => ({
      key: step.key,
      value: step.value,
      idxStatement: 0
    }));
    const matched = [] as Array<{
      key: string;
      value: string;
      startIdx: number;
      endIdx: number;
      from: Step[];
    }>;
    // const ret: Transpile['output'] = [];
    block.statements.forEach((statement, idxCurrentStatement) => {
      mapStatementsMatch.forEach((map, idx) => {
        if (map.idxStatement < 0) {
          return;
        }
        const step = this.output[idx];
        const statementToCompare = step?.sourceCode?.statements?.[map.idxStatement];
        if (!statementToCompare) {
          return;
        }
        const isCurrentStatMatch = compareNodes(statement, statementToCompare);
        if (isCurrentStatMatch) {
          map.idxStatement++;
          if (map.idxStatement === step.sourceCode?.statements?.length) {
            const fullyMatched = {
              key: map.key,
              value: `${map.key} ${map.value}`,
              startIdx: idxCurrentStatement - map.idxStatement + 1,
              endIdx: idxCurrentStatement,
              from: [step]
            };
            const duplication = matched.find(
              (m) => m.startIdx === fullyMatched.startIdx && m.endIdx === fullyMatched.endIdx
            );
            if (duplication) {
              if (duplication.key === fullyMatched.key && duplication.value === fullyMatched.value) {
                duplication.from.push(step);
              } else {
                duplication.value += `\n${fullyMatched.value}`;
              }
            } else {
              matched.push(fullyMatched);
            }
            map.idxStatement = 0; // start over
          }
        } else {
          map.idxStatement = 0;
        }
      });
    });
    return matched.reduce(
      (dedupe, match, idx, self) => {
        const firstStatement = block.statements[match.startIdx];
        const lastStatement = block.statements[match.endIdx];
        const statements = block.statements.slice(match.startIdx, match.endIdx + 1);
        dedupe.push({
          key: `` as any as IStepKey,
          value: match.value,
          pos: {
            start: this.parsePosition(firstStatement.pos),
            end: this.parsePosition(lastStatement.end)
          },
          parent: match.from.map((step) => step.host).join(', '),
          sourceCode: {
            statements,
            fullText: statements.map((s) => s.getFullText()).join(''),
            imports: [...(match.from[0].sourceCode?.imports ?? [])],
            exports: [...(match.from[0].sourceCode?.exports ?? [])]
          }
        });
        return dedupe;
      },
      [] as Transpile['output']
    );
  }

  /**
   * Traverse the block to find comments that match `@When ...`, `@Then ...`, `@Given ...`.
   * @param block {ts.Block} The block to be traversed. Usually the body of a function expression.
   * @param _lastItem {Step} The last step found. Used to accumulate source code.
   * @returns {Step[]} The retrieved steps from comments.
   */
  getComments(block: ts.Block, _lastItem?: Step): Transpile['output'] {
    const ret: Transpile['output'] = [];
    let lastItem = _lastItem;
    block.statements.forEach((fnHandler) => {
      const commentRange = ts.getLeadingCommentRanges(this.input, fnHandler.getFullStart());

      commentRange?.forEach((range) => {
        const strComment = this.input.substring(range.pos, range.end);
        const keywords = strComment?.match(/^\s*?\/\/\s*?@(When|Then|Given) (.+[^\s])\s*?$/);
        if (!keywords) {
          return strComment;
        }

        ret.push({
          key: keywords[1] as IStepKey,
          value: keywords[2],
          pos: {
            start: this.parsePosition(range.pos),
            end: this.parsePosition(fnHandler.end)
          },
          sourceCode: {
            fullText: '',
            imports: [],
            exports: [],
            statements: []
          }
        });
        return strComment;
      });

      lastItem = ret[ret.length - 1] ?? lastItem;
      if (lastItem) {
        lastItem.sourceCode = lastItem.sourceCode || { fullText: '', statements: [] };
        lastItem.sourceCode.statements?.push(fnHandler);
        if (ts.isExpressionStatement(fnHandler)) {
          const arrInputs = [
            searchCallName(fnHandler.expression as ISearchableExpression)
          ].flat() as string[];
          lastItem.sourceCode.imports = lastItem.sourceCode?.imports || [];
          lastItem.sourceCode.imports.push(
            ...arrInputs.filter((i) => !lastItem?.sourceCode?.imports?.includes(i))
          );
        } else if (ts.isVariableStatement(fnHandler)) {
          const arrOutputs = fnHandler.declarationList.declarations.map((declaration) =>
            this.getDeclaration(declaration)
          );
          lastItem.sourceCode.exports = lastItem.sourceCode.exports || [];
          lastItem.sourceCode.exports.push(
            ...arrOutputs.flat().filter((i) => !lastItem?.sourceCode?.exports?.includes(i))
          );
        }
      }
      if (ts.isIfStatement(fnHandler) && ts.isBlock(fnHandler.thenStatement)) {
        ret.push(...this.getComments(fnHandler.thenStatement, lastItem));
      }
    });
    return ret.flat();
  }

  /**
   * Traversing the AST, when the string argument is found, create a step and push into the output.
   * @param name Gherkin Keyword, Feature or Scenario
   * @returns the retrieved step
   */
  callbackOnStringArgumentFactory: (name: IStepKey) => ICallbackOnFunctionExpression = (name) => {
    return (expressionOfArg, callExpression, context) => {
      let argValue: string;
      if (ts.isStringLiteral(expressionOfArg) || ts.isNoSubstitutionTemplateLiteral(expressionOfArg)) {
        argValue = expressionOfArg.text;
      } else if (ts.isTemplateExpression(expressionOfArg)) {
        argValue =
          expressionOfArg.head.text +
          expressionOfArg.templateSpans
            .map((sp) => `<${sp.expression.getText()}>${sp.literal.text}`)
            .join('');
      } else {
        return;
      }
      let k: IStepKey, v: string;
      const matchedValue = argValue.match(/^(When|Then|Given) (.+)$/);
      if (matchedValue) {
        k = matchedValue[1] as IStepKey;
        v = matchedValue[2];
      } else {
        k = name;
        v = argValue;
      }
      const fnArgument = callExpression.arguments.find((n) => ts.isFunctionLike(n) && ts.isBlock(n.body)) as
        | ts.FunctionExpression
        | ts.ArrowFunction;
      const fnArgumentBody = fnArgument?.body as ts.BlockLike;
      const step: Step = {
        key: k,
        value: v,
        pos: {
          start: this.parsePosition(expressionOfArg.pos),
          end: this.parsePosition(expressionOfArg.end)
        },
        sourceCode: {
          fullText: callExpression.getFullText(),
          // ["describe", "(", ["some title", ",", "() => {....}"], ")"]
          statements: [...(fnArgumentBody?.statements ?? [])]
        },
        host: argValue
      };
      this.output.push(step);
      context.stepOfCurrentFunction = step;
      context.host = argValue;
    };
  };

  /**
   * When a function expression argument is found, traverse its body to find steps inside it.
   * @param expressionOfArg
   * @param callExpression
   * @param callContext
   * @returns {void}
   */
  callbackOnFnArgument: ICallbackOnFunctionExpression = (expressionOfArg, callExpression, callContext) => {
    const steps: Transpile['output'] = [];
    const host = callContext.host as string;
    const stepOfCurrentFunction = callContext.stepOfCurrentFunction as Step;
    const param = expressionOfArg as ts.FunctionExpression;

    if (!param.body) {
      console.error('Argument type is not functionExpression', ts.SyntaxKind[param.kind]);
      return;
    }

    stepOfCurrentFunction.pos.start = this.parsePosition(param.body.pos);
    stepOfCurrentFunction.pos.end = this.parsePosition(param.body.end);

    steps.push(...this.getComments(param.body, stepOfCurrentFunction));
    if (steps.length > 0) {
      // const stepHost = steps[0];
      steps[steps.length - 1].pos.end = { ...stepOfCurrentFunction.pos.end };
      if (stepOfCurrentFunction.key !== 'Scenario') {
        stepOfCurrentFunction.pos.end = this.parsePosition(steps[0].pos.start.pos - 1);
      }
      steps[0].host = host;
      for (let i = 1; i < steps.length; i++) {
        steps[i].host = host;
        const startCurrentStep = steps[i].pos.start;
        const posCurrentStart = startCurrentStep.pos - 1;
        steps[i - 1].pos.end = this.parsePosition(posCurrentStart);
      }
    } else {
      this.possibleStep.push(...this.generateFromKnownSteps(param.body));
    }
    this.output.push(...steps);
  };

  /**
   * @deprecated Does nothing currently. Used to earse source map from input.
   * @param input
   * @returns
   */
  dealwithSourceMap(input: string): Record<string, string> {
    // const sourceMapData = input.split('//# sourceMappingURL=data:application/json;charset=utf-8;base64,')[1];
    // if (!sourceMapData || !Buffer) {
    return {} as never;
    // }
    // const buff = Buffer.from(sourceMapData, 'base64');
    // const rawSourceMap = buff.toString('utf-8');
    // //console.log(rawSourceMap)
    // return JSON.parse(rawSourceMap);
  }

  /**
   * TypeScript Transpiler for Jest code.
   * Note: If the `fileName` in `options` does not end with `.test.ts`, it works as an ordinary TypeScript transpiler.
   * @param input {string} Jest source code in TypeScript
   * @param options TS transpiler options, i.e { fileName: 'index.test.ts' }
   * @returns {Transpiler} Transpiler class
   */
  transpile(input: string, options: ts.TranspileOptions = {}): ts.TranspileOutput {
    if (options.fileName?.match(/\.test\.ts$/)) {
      this.input = input;
      const raw = ts.transpileModule(this.input, {
        ...options,
        transformers: {
          before: [customTransformerFactory(this.searchSchema, this)]
        },
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.React,
          isolatedModules: true,
          sourceMap: true
        }
      });
      const output: ts.TranspileOutput = {
        outputText: this._prepareOutput(),
        sourceMapText: raw.sourceMapText
      };
      return output;
    } else {
      return ts.transpileModule(input, {
        ...options,
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.React,
          isolatedModules: true,
          sourceMap: true
        }
      });
    }
  }

  /** @deprecated */
  private _prepareOutput(): string {
    this.groupToScenario();
    // console.log(new Array(10).fill('+').join('\n'));
    // console.log(this.output);
    return this.outputCode();
  }

  /** @deprecated */
  outputCode(): string {
    return '';
  }
}
