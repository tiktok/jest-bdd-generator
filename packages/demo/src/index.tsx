import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { TestOraclePluralRule } from './plural'
import { TestOracleF16Round } from './f16round'
import { BrowserRouter, useRoutes, type RouteObject } from 'react-router-dom';
import { TestGeneration } from 'jest-bdd-generator/UI/TestGeneration';
import { TestStory } from 'jest-bdd-generator/UI/TestStory';
import styled from "styled-components";

const Wrapper = styled('div')`
  display: flex;
  > nav {
    padding: .5em;
    min-width: 15em;
    a, a: visited { padding-left: 1em; color: black }
    
  }
  > article {
    flex-grow: 1;
  }
`
const Demo: React.FC<{
  Child: React.FC<{featureSource: string; testsSource: string}>;
  feature?: string;
  testing?: string;
}> = ({
  Child,
  feature = '/docs/features/failWithF16Round.feature',
  testing = '/tests/failWithF16Round.test.ts',
}) => {
  const [featSource, setFeatSource] = useState('');
  const [testSource, setTestSource] = useState('');
  React.useEffect(() => {
    fetch(feature).then(res => res.text()).then(ret => setFeatSource(ret));
  }, [feature])

  React.useEffect(() => {
    fetch(testing).then(res => res.text()).then(ret => setTestSource(ret));
  }, [testing])
  return <Child featureSource={featSource} testsSource={testSource} />
}



const routes: RouteObject[] = [
  {
    path: '/test-generation',
    element: <Demo Child={TestGeneration}/>,
  },
  {
    path: '/test-generation/no-implementation',
    element: <Demo Child={TestGeneration} feature='/docs/features/successfulMathRound.feature' testing='/tests/noImplement.test.ts'/>,
  },
  {
    path: '/test-generation/no-comments',
    element: <Demo Child={TestGeneration} feature='/docs/features/successfulMathRound.feature' testing='/tests/noComment.test.ts'/>,
  },
  {
    path: '/test-story',
    element: <Demo Child={TestStory}/>,
  },

  {
    path: '/test-oracle/plural-rule',
    element: <TestOraclePluralRule />,
  },
  {
    path: '/test-oracle/f16round',
    element:<TestOracleF16Round/>
  },
  {
    path: '/dist',
    element: <Demo Child={({featureSource}) => <pre>{featureSource}</pre>} feature='/README.md'/>
  },]


function RouteElements(): React.ReactElement | null {
  const element = useRoutes(routes);
  return element;
}
export const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.render(
  <Wrapper>
    <nav>
      <p>Code Generation Demo:
        <br />
        <a href="/test-generation"> Complete Testing-codes</a>
        <br />
        <a href="/test-generation/no-comments"> Missing step comments</a>
        <br />
        <a href="/test-generation/no-implementation"> Missing step implementations</a>
      </p>

      <p>Reports:
        <br />
        <a href="/docs/reports"> Reports (from CLI)</a>
      </p>
      <p>Storybook Demo:
        <br />
        <a href="/test-story"> Testing-codes by Gherkin Steps</a>
      </p>
      <p>Test Oracle Demo: 
        <br />
        <a href="/test-oracle/plural-rule">(Intl) plural rule</a>
        <br />
        <a href="/test-oracle/f16round">(Math) rounding methods</a>
      </p>
      <p> See also:
        <br />
        <a href="/dist">README.md</a>
      </p>
    </nav>
    <article>
      <BrowserRouter>
        <RouteElements />
      </BrowserRouter>
    </article>
  </Wrapper>, elem);
