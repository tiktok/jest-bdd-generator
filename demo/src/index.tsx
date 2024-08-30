import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { TestOraclePluralRule } from './plural'
import { TestOracleF16Round } from './f16round'
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
const routes: RouteObject[] = [
  {
    path: '/plural-rule',
    element: <TestOraclePluralRule />,
  },
  {
    path: '/',
    element:<TestOracleF16Round/>
  },]

function RouteElements(): React.ReactElement | null {
  const element = useRoutes(routes);
  return element;
}
export const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.createRoot(elem).render(
  <Wrapper>
    <nav>
      <a href="./plural-rule">Test Oracle Demo: (Intl)</a>
      <br />
      <a href="./">Test Oracle Demo: (Math)</a>
    </nav>
    <article>
      <BrowserRouter>
        <RouteElements />
      </BrowserRouter>
    </article>
  </Wrapper>);
