import * as React from "react";
import * as ReactDOM from "react-dom";
import { TestOracle } from '../src/UI/TestOracle'

export const elem = document.createElement("div");
elem.className = "root";
document.body.append(elem);
ReactDOM.render(<TestOracle<{num: number; method: 'ceil' | 'floor' | 'round' | 'fround' | 'f16round'}>
  defaultRows={[
    { num: 1234.1 },
    { num: -1234.1 },
    { num: 1234.9 },
    { num: -1234.9 },
    { num: 1234.5 },
    { num: -1234.5 },
    { num: 1234.4 },
    { num: -1234.4 },
    { num: 1234.6 },
    { num: -1234.6 },
  ]}
  defaultCols={[
    { method: 'ceil' }, 
    { method: 'floor' }, 
    { method: 'fround' }, 
    { method: 'f16round' }, 
    { method: 'round' }
  ]}
  colSelections={{
    num: Number.NaN,
    method: [
      'ceil', 
      'floor', 
      'round', 
      'fround', 
      'f16round'
    ]
  }}
  execute={ (opt) => Math[opt.method](opt.num)} />, elem);
