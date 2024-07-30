import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Editor, OnMount } from '@monaco-editor/react';
import { TestGeneratorFromSource } from '../gherkin-to-test/TestGeneratorFromSource';
import { JestToGherkin } from '../jest-to-gherkin/JestToGherkin';
import { Step } from '../types';

const LineWrapper = styled('div')`
  display: flex;
  > * {
    flex: 1 1 0;
  }
`;
const ColumnWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CodeWrapper = styled('aside')`
  position: absolute;
  width: 100%;
  height: 100vh;
  border: solid 1px rgb(192, 230, 255);
`;

const Feature = styled('a')`
.feature {
}
.feature h1,
h2,
h3,
b,
th {
  font-weight: 700;
  color: #06a;
}
.feature h1 {
  font-size: 20px;
}
.feature h2 {
  font-size: 18px;
}
.feature h3 {
  font-size: 16px;
}
.feature section {
  margin: 0 0 1em 1em;
}
.feature p {
  font-size: 14px;
  text-indent: 1em;
}
.feature table {
  font-size: 12px;
  text-align: center;
  min-width: 50%;
}
.feature table td {
  text-align: center;
}
.feature .active .active {
  /* box-shadow: inset 0px -1px 0px 0px #fa0 */
  background-color: rgb(192, 230, 255);
}


`

type IRefEditor = Parameters<OnMount>[0];
type GherkinDocument = ReturnType<TestGeneratorFromSource['compileGherkinFromSource']>;
type Feature = NonNullable<GherkinDocument['feature']>;
type FeatureChild = Feature['children'][0];
type Scenario = FeatureChild['scenario'];
type Background = FeatureChild['background'];
type GherkinStep = NonNullable<Scenario>['steps'][0];

const mapKeyword = (scenario: Scenario | Background, idxStep: number): Step['key'] => {
  const keyGherkin = scenario?.steps[idxStep].keywordType;
  switch (keyGherkin) {
    case 'Context':
      return 'Given';
    case 'Action':
      return 'When';
    case 'Outcome':
      return 'Then';
    case 'Conjunction':
      return mapKeyword(scenario, idxStep - 1);
    default:
      return '';
  }
};

const ExampleBlock: React.FC<{
  scenario: Scenario;
}> = ({ scenario }) => {
  if (scenario?.examples?.[0]) {
    return (
      <table>
        <thead> 
          <tr>
            {scenario.examples[0].tableHeader?.cells.map((cell, idxCell) => {
              return <th key={idxCell}>{cell.value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {scenario.examples[0].tableBody.map((row, idxRow) => {
            return (
              <tr key={idxRow}>
                {row.cells.map((cell, idxCell) => {
                  return <td key={idxCell}>{cell.value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <></>;
};

const ScenarioBlock: React.FC<
  {
    featureChild: FeatureChild;
    onSelectStep?: (scenario: NonNullable<Scenario>, idxStep: number, evt?: React.MouseEvent) => void;
  } & React.HTMLAttributes<HTMLElement>
> = ({ featureChild, onSelectStep, className }) => {
  const [selectedStep, setSelectedStep] = React.useState<GherkinStep>();
  if (!featureChild) {
    return <></>;
  }
  if (featureChild.rule) {
    return (
      <div>
        {featureChild.rule.children.map((ruleChild, idxRuleChild) => (
          <div key={idxRuleChild}>
            <ScenarioBlock featureChild={ruleChild} />
          </div>
        ))}
      </div>
    );
  } else {
    const scenario = featureChild.scenario ?? featureChild.background;
    const stepClick = (idxStep: number, evt: React.MouseEvent): void => {
      setSelectedStep(scenario?.steps[idxStep]);
      if (onSelectStep && scenario) {
        onSelectStep(scenario as NonNullable<Scenario>, idxStep, evt);
      }
    };

    return (
      <section className={className}>
        <h3>
          <b>{scenario?.keyword}</b> {scenario?.name}
        </h3>
        <p>{scenario?.description}</p>
        {scenario?.steps.map((s, i) => (
          <p
            className={selectedStep === s ? "active" : ''}
            key={i}
            onClick={(evt) => {
              stepClick(i, evt);
            }}
          >
            <b>{s.keyword}</b> {s.text}
          </p>
        ))}
        <ExampleBlock scenario={featureChild.scenario} />
      </section>
    );
  }
};

export const TestStory: React.FC = () => {
  const [editor, setEditor] = useState<IRefEditor>(); // useRef<HTMLTextAreaElement>(null);
  const [gherkinSource, setGherkinSource] = useState<GherkinDocument>();
  const [selectedScenario, setSelectedScenario] = useState<Scenario>();
  const [jestSource, setJestSource] = useState<Step[]>();
  const [scrollTop, setScrollTop] = useState<number>(5);
  const fileGherkinSource = useRef<HTMLInputElement>(null);
  const fileJestSource = useRef<HTMLInputElement>(null);
  const readGherkin = (gherkinSource: string): void => {
    if (editor) {
      const generator = new TestGeneratorFromSource();

      const ret = generator.compileGherkinFromSource(gherkinSource);
      setGherkinSource(ret);
    }
  };

  const handleGherkinFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (!evt.target.files) {
      return;
    }

    const file = evt.target.files[0];
    void file.text().then((val) => {
      readGherkin(val);
    });
  };

  const readJest = (jestSource: string): void => {
    const transpiler = new JestToGherkin();
    transpiler.transpile(jestSource, { fileName: 'a.test.ts' });
    setJestSource(transpiler.output);
  };

  const handleJestFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (!evt.target.files) {
      return;
    }

    const file = evt.target.files[0];
    void file.text().then((val) => {
      readJest(val);
    });
  };

  const selectStep = (scenario: NonNullable<Scenario>, idxStep: number, evt?: React.MouseEvent): void => {
    setSelectedScenario(scenario);

    if (evt?.target) {
      const target: HTMLParagraphElement = evt.target as HTMLParagraphElement;
      setScrollTop(target.offsetTop);
    }

    if (jestSource) {
      const signature = {
        key: mapKeyword(scenario, idxStep),
        value: scenario.steps[idxStep].text,
        parent: scenario.name,
      };

      const searchResults = jestSource.filter((s) => s.value === signature.value && s.key === signature.key);
      if (searchResults) {
        const searchResult = searchResults.find((s) => s.parent === signature.parent);
        if (searchResult?.sourceCode) {
          const head = `/**\n imports [${searchResult.sourceCode.imports?.join(
            ', ',
          )}]\n exports [${searchResult.sourceCode.exports?.join(', ')}] \n*/`;
          const tail = `/**\n Appearances in other Scenarios: [${searchResults.map((s) => s.parent).join(', ')}] \n*/`; //`\n`;
          const body = searchResult.sourceCode.statements
            ?.map(
              (statement) => statement.getFullText(), //.replace(/\n\s+/g, '\n')
            )
            .join('');
          editor?.setValue(`${head}\n${body}\n${tail}`);
        } else {
          editor?.setValue('');
        }
      }
    }
  };

  return (
    <LineWrapper>
      <ColumnWrapper>
        <label>load Gherkin file:</label>
        <input ref={fileGherkinSource} onChange={handleGherkinFile} type="file" />
        <Feature>
          <h1>
            {gherkinSource?.feature?.keyword} {gherkinSource?.feature?.name}
          </h1>
          <section>{gherkinSource?.feature?.description}</section>
          {gherkinSource?.feature?.children.map((featureChild, idxFeatureChild) => (
            <ScenarioBlock
              onSelectStep={selectStep}
              key={idxFeatureChild}
              className={selectedScenario === featureChild.scenario ? "active" : ''}
              featureChild={featureChild}
            />
          ))}
        </Feature>
      </ColumnWrapper>
      <ColumnWrapper className="active">
        <CodeWrapper style={{ top: scrollTop - 5 }} className="active">
          <label>load Jest file:</label>
          <input ref={fileJestSource} onChange={handleJestFile} type="file" />
          <Editor height="40vh" language="typescript" onMount={(editor) => setEditor(editor)} />
        </CodeWrapper>
      </ColumnWrapper>
    </LineWrapper>
  );
};
