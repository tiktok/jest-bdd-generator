import ts from 'typescript';
import { ExampleStep, Step } from '../types';
import { ISearchExpressionSchema, Transpile } from '../transpiler';

export class JestToGherkin extends Transpile {
  public fileName: string = '';
  constructor() {
    super();
    const searchTestFunction: ISearchExpressionSchema = {
      keyword: 'test',
      chain: [
        {
          keyword: 'each',
          arguments: [
            {
              callback: (nodeExamples, call, ctx) => {
                const examples = (nodeExamples as ts.ArrayLiteralExpression).elements.map((nodeObj) => {
                  const ret: Record<string, string | number> = {};
                  if (ts.isObjectLiteralExpression(nodeObj)) {
                    nodeObj.properties.forEach((nodeProp) => {
                      if (ts.isPropertyAssignment(nodeProp)) {
                        const rawLiteral = nodeProp.initializer.getText();
                        let keyName = nodeProp.name.getText();
                        if (ts.isStringLiteral(nodeProp.name)) {
                          keyName = keyName.substring(1, keyName.length - 1);
                        }
                        if (ts.isNumericLiteral(nodeProp.initializer)) {
                          ret[keyName] = Number(rawLiteral);
                        } else if (ts.isPrefixUnaryExpression(nodeProp.initializer)) {
                          ret[keyName] = -Number(nodeProp.initializer.operand.getFullText());
                        } else if (ts.isStringLiteral(nodeProp.initializer)) {
                          ret[keyName] = rawLiteral.substring(1, rawLiteral.length - 1);
                        } else {
                          ret[keyName] = rawLiteral;
                        }
                      }
                    });
                  }
                  return ret;
                });
                this.output.push({
                  key: 'Examples',
                  value: ((call.parent as ts.CallExpression).arguments[0] as ts.StringLiteral).text,
                  examples,
                  pos: {
                    start: this.parsePosition(call.pos),
                    end: this.parsePosition(call.end)
                  }
                });
              }
            }
          ]
        }
      ],
      arguments: [
        {
          callback: this.callbackOnStringArgumentFactory('Scenario')
        },
        {
          callback: this.callbackOnFnArgument,
          searchCallSchema: [
            {
              keyword: 'expect',
              arguments: [
                {
                  callback: (node, call, ctx) => {
                    this.output.push({
                      key: 'Then',
                      value: call.parent.getText(),
                      pos: {
                        start: this.parsePosition(call.pos),
                        end: this.parsePosition(call.end)
                      }
                    });
                    return node;
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    const searchDescribeFunction: ISearchExpressionSchema = {
      keyword: 'describe',

      arguments: [
        {
          callback: this.callbackOnStringArgumentFactory('Feature')
        },
        {
          searchCallSchema: [
            {
              keyword: 'test',
              chain: searchTestFunction.chain,
              arguments: searchTestFunction.arguments
            },
            {
              keyword: 'it',
              chain: searchTestFunction.chain,
              arguments: searchTestFunction.arguments
            }
          ]
        }
      ]
    };
    searchDescribeFunction.arguments[1].searchCallSchema?.push(searchDescribeFunction);
    this.searchSchema = [searchDescribeFunction];
  }

  outputCode(): ReturnType<Transpile['outputCode']> {
    this.output = this.output.sort((a, b) => {
      const startA = a.pos.start;
      const startB = b.pos.start;
      if (startA.line < startB.line) {
        return -1;
      } else if (startA.line === startB.line) {
        return startA.character < startB.character ? -1 : 1;
      } else {
        return 1;
      }
    });

    const fileHeadJest: string[] = [];
    this.output.reduce(
      (prevstep, step, idx, steps) => {
        let displayKey = '',
          displayValue = '';
        switch (step.key) {
          case 'Feature':
            displayKey = '\nFeature: ';
            displayValue = step.value;
            break;
          case 'Scenario':
            displayKey = `\nScenario `;
            if (step.examples) {
              displayKey += `Outline: `;
            }
            displayValue = step.value;
            break;
          case 'Given':
          case 'Then':
          case 'When':
            displayKey = `  ${prevstep?.key === step.key ? 'And' : step.key} `;
            displayValue = step.value;
            break;
          case 'Examples':
            const MIN_WITH = 8;
            const examples = (step as ExampleStep).examples;
            const header = Object.keys(examples[0]);
            const widthsCols = new Array(header.length);
            widthsCols.fill(MIN_WITH);
            const getColMaxWidth = (val: string, i: number): string => {
              widthsCols[i] = Math.max(widthsCols[i], val.length);
              widthsCols[i] = Math.ceil(widthsCols[i] / MIN_WITH) * MIN_WITH;
              return val;
            };
            const padding = (str: string, i: number): string => {
              const spacesEachSide = (widthsCols[i] - str.length) / 2;
              const paddingLefts = new Array(Math.ceil(spacesEachSide)).fill(' ').join('');
              const paddingRights = new Array(Math.floor(spacesEachSide)).fill(' ').join('');
              return `${paddingLefts}${str}${paddingRights}   `;
            };
            const table = [
              header.map((title, i) => getColMaxWidth(title, i)),
              ...examples.map((val) => header.map((colname, i) => getColMaxWidth(val[colname].toString(), i)))
            ]
              .map((row) => row.map(padding).join('|'))
              .join('\n');
            displayKey = `Examples:\n`;
            displayValue = table;
            break;
          default:
        }
        fileHeadJest.push(`${displayKey}${displayValue}`);
        return step;
      },
      {} as Step | undefined
    );
    return `${fileHeadJest.join('\n')}`;
  }
}
