import * as React from "react";
import * as ReactDOM from "react-dom";
import { TestGeneration } from '../src/UI/TestGeneration'

const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.render(<TestGeneration />, elem);