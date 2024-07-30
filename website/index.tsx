import   React from "react";
import * as ReactDOM from "react-dom";
import { TestGeneration } from '../src/UI/TestGeneration'
import { TestOracle } from '../src/UI/TestOracle'
import { TestStory } from '../src/UI/TestStory'
import { BrowserRouter, useRoutes, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/website/TestGeneration',
    element: <TestGeneration />,
  },
  {
    path: '/website/TestStory',
    element: <TestStory />,
  },
  // {
  //   path: '/TestOracle',
  //   element: <TestOracle />,
  // },
  {
    path: '/website/',
    element: <nav>
      <a href="./TestGeneration">TestGeneration</a>
      <br/>
      <a href="./TestStory">TestStory</a>
    </nav>,
  },]

function RouteElements(): React.ReactElement | null {
  const element = useRoutes(routes);
  return element;
}
export const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.render(
  <BrowserRouter>
    <RouteElements />
  </BrowserRouter>, elem);
