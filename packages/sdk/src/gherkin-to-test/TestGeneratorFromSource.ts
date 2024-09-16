/* eslint-disable @typescript-eslint/no-unused-vars */
import { AstBuilder, GherkinClassicTokenMatcher, Parser /*, compile */ } from '@cucumber/gherkin';
import { GherkinDocument, IdGenerator /*, PickleStep */ } from '@cucumber/messages';
import { JestToGherkin } from '../jest-to-gherkin';
import { Step } from '../types';

const newId = IdGenerator.uuid();
const builder = new AstBuilder(newId);
const matcher = new GherkinClassicTokenMatcher();
const parser = new Parser(builder, matcher);

export class TestGeneratorFromSource {
  transpiler?: JestToGherkin;
  source!: string;
  compileGherkinFromSource(gherkinDoc: string): GherkinDocument {
    const gherkinDocument = parser.parse(gherkinDoc);
    return gherkinDocument;
    // return compile(gherkinDocument, 'uri.feature', newId);
  }
  compileKnownStepsFromSource(source: string): JestToGherkin['output'] {
    this.source = source;
    const _piler = new JestToGherkin();
    _piler.fileName = 'pathTestInput.test.ts';
    const o = _piler.transpile(source, {
      fileName: 'pathTestInput.test.ts'
    }).outputText;
    this.transpiler = _piler;
    return _piler.output;
  }
  generateGherkinFromSource(steps: Step[], gherkinSource: string): string | undefined {
    const plan = this.compileGherkinFromSource(gherkinSource);

    const statements = plan.feature?.children
      .map((p) => {
        let lastKeyword: string;
        const sourceSteps = p.scenario?.steps
          .map((pStep) => {
            const criteria = pStep.text;
            const keyword = pStep.keyword === 'And ' ? lastKeyword : pStep.keyword;
            lastKeyword = keyword;

            const source = steps.find((s) => s.value === criteria && s.parent === p.scenario?.name); // return s.value.replace(/<[^>]+>/g, '$p') === criteria.replace(/<[^>]+>/g, '$p');
            if (source?.sourceCode) {
              return [
                // `//@${source.key} ${source.value}`,
                // `  // import [${source.sourceCode?.imports}]`,
                // `  // export [${source.sourceCode?.exports}]`,
                `  ${(source.sourceCode.statements?.map((a) => a.getFullText()) ?? []).join('')}`
              ].join('');
            }

            const sourceInOtherScenario = steps.find((s) => s.value === criteria); // return s.value.replace(/<[^>]+>/g, '$p') === criteria.replace(/<[^>]+>/g, '$p');
            if (sourceInOtherScenario) {
              return [
                `/**`,
                `*     FOUND: @${keyword}${pStep.text}`,
                `*     FROM: (Scenario)${sourceInOtherScenario.parent} - [Step]${sourceInOtherScenario.key} ${sourceInOtherScenario.value}`,
                `*     referenced: [${sourceInOtherScenario.sourceCode?.imports}]`,
                `*     declared: [${sourceInOtherScenario.sourceCode?.exports}]`,
                `* (remove this comments block with: /^\\s*?\\/\\*\\*\\n\\*\\s*?FOUND: @.+\\n(\\*.+\\n)+/g )`,
                `${(sourceInOtherScenario.sourceCode?.statements?.map((a) => a.getFullText()) ?? []).join(
                  ''
                )}`,
                `*/`
              ].join('\n');
            }

            return [
              `//@${keyword}${pStep.text}`,
              `  // TODO: implement assertions here;`,
              `  return 'pending';`,
              ``
            ].join('    \n');
          })
          .join('\n');

        let fnTitle = 'it';
        let sourceParams: string[] = [];
        if (p.scenario?.examples) {
          const exp = p.scenario.examples
            .map((ex) => {
              const ret: string[] = [];
              sourceParams = ex.tableHeader?.cells.map((cell) => cell.value) ?? [];
              ex.tableBody.forEach((line) => {
                const row: Record<string, string> = {};
                line.cells.forEach((v, i) => {
                  row[sourceParams[i]] = JSON.parse(v.value);
                });
                const lineExpression = Object.keys(row)
                  .map((k) => {
                    const valueExpression = JSON.stringify(row[k]);
                    if (k.match(/^[a-zA-Z][0-9a-zA-Z]*?$/)) {
                      return `${k}: ${valueExpression}`;
                    } else {
                      return `"${k}": ${valueExpression}`;
                    }
                  })
                  .join(', ');
                ret.push(`{${lineExpression}}`);
              });
              return ret.join(',\n  ');
            })
            .join('');
          fnTitle = `test.each([\n  ${exp}\n])`;
          sourceParams = sourceParams.map((strVariable) => {
            if (strVariable.match(/^[a-zA-Z][0-9a-zA-Z]*?$/)) {
              return strVariable;
            } else {
              return `'${strVariable}': ${strVariable.replace(/-(\w)/g, (x) => x[1].toUpperCase())}`;
            }
          });
        }
        return `${fnTitle}('${p.scenario?.name}', async ({ ${sourceParams} }) => {\n${sourceSteps}\n});`;
      })
      .flat()
      .join('\n');

    const feature = steps.find((s) => s.key === 'Feature' && s.value === plan.feature?.name);
    if (feature?.sourceCode?.statements) {
      const contents = feature.sourceCode.statements;
      const head = this.source.substring(0, contents[0].getFullStart());
      const tail = this.source.substring(contents[contents.length - 1].end);

      return [head, statements, tail].join('\n');
    } else {
      return statements;
    }
  }
}
