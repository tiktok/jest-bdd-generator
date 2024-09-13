import React from 'react';
import ReactDOM from "react-dom";
import { TestGeneration } from 'jest-bdd-generator/UI/TestGeneration'
import { TestStory } from 'jest-bdd-generator/UI/TestStory'
import { TestOraclePluralRule } from 'demo-project/src/plural'
import { TestOracleF16Round } from 'demo-project/src/f16round'
import { BrowserRouter, useRoutes, type RouteObject } from 'react-router-dom';
import styled from "styled-components";

const Wrapper = styled('div')`
  display: flex;
  > nav {
    padding: .5em;
    min-width: 15em;
  }
  > article {
    flex-grow: 1;
  }
`

function MarkDownLoader ({url} : {url: string}) {
  const [source, setSource] = React.useState('');
  
  React.useEffect(() => {
    fetch(url).then(res => res.text()).then(ret => setSource(ret));
  })
  return  <pre>{source}</pre>

}

const routes: RouteObject[] = [
  {
    path: '/TestGeneration',
    element: <TestGeneration />,
  },
  {
    path: '/TestStory',
    element: <TestStory />,
  },
  {
    path: '/TestOracle-plural-rule',
    element: <TestOraclePluralRule />,
  },
  {
    path: '/TestOracle-f16round',
    element: <TestOracleF16Round />,
  },
  // {
  //   path: '/demo',
  //   element: <MarkDownLoader url="/dist/demo/README.md" />
  // },
  {
    path: '/',
    element: <MarkDownLoader url="/dist/README.md" />
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
      <a href="./">Intro</a>
      <br />
      <a href="./TestGeneration">TestGeneration</a>
      <br />
      <a href="./TestStory">TestStory</a>
      <br />
      &nbsp;&nbsp;<a href="./TestOracle-plural-rule">Test Oracle Demo - Intl Plural Rule</a>
      <br />
      &nbsp;&nbsp;<a href="./TestOracle-f16round">Test Oracle Demo - Math Rounding</a>
      <br />
      <a href="./demo">Quick Start</a>
      <br />
      <a href="./demo">Tutorial</a>
      <br />
      <a href="./demo">Documentation</a>
    </nav>
    <article>
      <BrowserRouter>
        <RouteElements />
      </BrowserRouter>
    </article>
  </Wrapper>, elem);