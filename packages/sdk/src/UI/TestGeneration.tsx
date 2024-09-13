import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { JestToGherkin } from '../jest-to-gherkin/JestToGherkin';
import { TestGeneratorFromSource } from '../gherkin-to-test/TestGeneratorFromSource';

import { Editor, OnMount } from '@monaco-editor/react';
import { Step } from '../types';

type IRefEditor = Parameters<OnMount>[0];

const LineWrapper = styled('div')`
  display: flex;
  > * {
    flex: 1 1 auto;
  }
`;
const ColumnWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const SourceCodeEditor: React.FC<{
  updateHandler: React.Dispatch<React.SetStateAction<string>>;
  type?: 'typescript' | 'markdown';
  value?: string;
}> = ({ updateHandler, type, value }) => {
  const [inJestSource, setEditor] = useState<any>(); // useRef<HTMLTextAreaElement>(null);
  const fileJestSource = useRef<HTMLInputElement>(null);

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (!evt.target.files) {
      return;
    }

    const file = evt.target.files[0];
    void file.text().then((val) => {
      updateHandler(val);
      if (inJestSource) {
        inJestSource.setValue(val);
      }
    });
  };
  return (
    <ColumnWrapper>
      <input ref={fileJestSource} onChange={handleFile} type="file" />
      <Editor
        value={value}
        height="40vh"
        language={type ?? 'typescript'}
        onMount={(editor) => setEditor(editor)}
        onChange={(v) => updateHandler(v ?? '')}
        
      />
    </ColumnWrapper>
  );
};

const getUniqueStep = (steps: Step[]): string => {
  const uniqueSteps = steps.filter((s, i) => steps.findIndex((f) => f.key === s.key && f.value === s.value) === i);
  return uniqueSteps
    .map((s) => {
      if (s.sourceCode) {
        const head = ''; //`\n`;// imports [${s.sourceCode.imports}]\n// exports [${s.sourceCode.exports}]
        const tail = ''; //`\n`;
        const body = s.sourceCode.statements
          ?.map(
            (statement) => statement.getFullText(), //.replace(/\n\s+/g, '\n')
          )
          .join('');
        return `${head}${body}${tail}`;
      } else {
        return '';
      }
    })
    .join('');
};

export const TestGeneration: React.FC<{
  testsSource?: string;
  featureSource?: string;
}> = ({
  testsSource = '',
  featureSource = ''
}) => {
  const [editor, setEditor] = useState<IRefEditor>(); // useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState<string>('typescript'); // useRef<HTMLTextAreaElement>(null);

  const [gherkinSource, setGherkinSource] = useState<string>(testsSource);
  const [jestSource, setJestSource] = useState<string>(featureSource);

  const genComment = (): void => {
    if (editor) {
      const transpiler = new JestToGherkin();
      transpiler.transpile(jestSource, { fileName: 'a.test.ts' });
      const ret = transpiler.generateComments();
      setType('typescript');
      editor.setValue(ret);
    }
  };

  const genUniqueStep = (): void => {
    if (editor) {
      const transpiler = new JestToGherkin();
      transpiler.transpile(jestSource, { fileName: 'a.test.ts' });
      setType('typescript');
      editor.setValue(getUniqueStep(transpiler.output));
    }
  };

  const genJest = (): void => {
    if (editor) {
      const generator = new TestGeneratorFromSource();
      const steps = generator.compileKnownStepsFromSource(jestSource);
      const ret = generator.generateGherkinFromSource(steps, gherkinSource) ?? '';
      setType('typescript');
      editor.setValue(ret);
    }
  };

  const genGherkin = (): void => {
    if (editor) {
      const transpilor = new JestToGherkin();

      const ret = transpilor.transpile(jestSource, { fileName: 'a.test.ts' }).outputText;
      setType('markdown');
      editor.setValue(ret);
    }
  };

  React.useEffect(() => {
    if (featureSource) {
      setGherkinSource(featureSource);
    }
    if (testsSource) {
      setJestSource(testsSource);
    }
  }, [testsSource, featureSource])
  return (
    <>
      <LineWrapper>
        <SourceCodeEditor updateHandler={setJestSource} value={testsSource}  type="typescript" />
        <SourceCodeEditor updateHandler={setGherkinSource} value={featureSource} type="markdown" />
      </LineWrapper>

      <LineWrapper>
        <button onClick={genUniqueStep} type="button" disabled={jestSource === ''}>
          View DEFINED STEPS
        </button>
        <button onClick={genComment} type="button" disabled={jestSource === ''}>
          Generate comments of test code from DEFINED STEPS
        </button>
        <button onClick={genJest} type="button" disabled={gherkinSource === ''}>
          Generate test code from Gherkin Document and DEFINED STEPS
        </button>
        <button onClick={genGherkin} type="button" disabled={jestSource === ''}>
          Generate Gherkin from DEFINED STEPS
        </button>
      </LineWrapper>
      <LineWrapper>
        <ColumnWrapper>
          <Editor height="40vh" language={type} onMount={(editor) => setEditor(editor)} />
        </ColumnWrapper>
      </LineWrapper>
    </>
  );
};
