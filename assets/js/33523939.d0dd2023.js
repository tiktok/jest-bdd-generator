"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[768],{5838:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>a,frontMatter:()=>o,metadata:()=>d,toc:()=>l});var t=r(2388),s=r(5667);const o={id:"comparison",title:"Gherkin Jest comparison",slug:"/"},i="Comparison / Mapping of Gherkin to Jest",d={id:"introduction/comparison",title:"Gherkin Jest comparison",description:"| Gherkin      | Jest          |",source:"@site/docs/introduction/mapping.md",sourceDirName:"introduction",slug:"/",permalink:"/jest-bdd-generator/",draft:!1,unlisted:!1,editUrl:"https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/introduction/mapping.md",tags:[],version:"current",frontMatter:{id:"comparison",title:"Gherkin Jest comparison",slug:"/"},sidebar:"docsSidebar",previous:{title:"Why Jest-BDD",permalink:"/jest-bdd-generator/introduction/why"},next:{title:"Testing code Generation",permalink:"/jest-bdd-generator/generateTests"}},c={},l=[{value:"Example: Mapping a Gherkin Scenario to Jest",id:"example-mapping-a-gherkin-scenario-to-jest",level:2}];function h(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"comparison--mapping-of-gherkin-to-jest",children:"Comparison / Mapping of Gherkin to Jest"})}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"Gherkin"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"Jest"})})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"Feature"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"describe()"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"Scenario"})}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:"test()"})," / ",(0,t.jsx)(n.code,{children:"it()"})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"Examples"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"test.each()"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"Background"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"beforeAll()"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"Steps"})}),(0,t.jsxs)(n.td,{children:["Code statements with ",(0,t.jsx)(n.code,{children:"//@STEP"})," comments"]})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"example-mapping-a-gherkin-scenario-to-jest",children:"Example: Mapping a Gherkin Scenario to Jest"}),"\n",(0,t.jsx)(n.p,{children:"Here\u2019s how a Gherkin scenario translates perfectly into a Jest test:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-gherkin",metastring:'title="./docs/features/rounding.feature" showLineNumbers',children:'Feature: Rounding methods of Math\r\n\r\nScenario Outline: Integer pattern\r\n  Given input number is <num>\r\n  When rounding with <method>\r\n  Then rounded number is <result>\r\n\r\nExamples:\r\n| num    | method | result |\r\n| 1234.1 | "ceil" | 1235   |\r\n| 1234.9 | "ceil" | 1235   |\r\n| -1234.1| "ceil" | -1234  |\r\n| -1234.9| "ceil" | -1234  |\r\n| 1234.1 | "floor"| 1234   |\r\n| 1234.9 | "floor"| 1234   |\r\n| -1234.1| "floor"| -1235  |\r\n| -1234.9| "floor"| -1235  |\r\n| 1234.5 | "round"| 1235   |\r\n| 1234.4 | "round"| 1234   |\r\n| -1234.5| "round"| -1234  |\r\n| -1234.6| "round"| -1235  |\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",metastring:'title="./tests/rounding.test.ts" showLineNumbers',children:"import { describe, test, expect } from '@jest/globals';\r\n\r\ndescribe('Rounding methods of Math', () => {\r\n  test.each([\r\n    { num: 1234.1, method: 'ceil', result: 1235 },\r\n    { num: 1234.9, method: 'ceil', result: 1235 },\r\n    { num: -1234.1, method: 'ceil', result: -1234 },\r\n    { num: -1234.9, method: 'ceil', result: -1234 },\r\n    { num: 1234.1, method: 'floor', result: 1234 },\r\n    { num: 1234.9, method: 'floor', result: 1234 },\r\n    { num: -1234.1, method: 'floor', result: -1235 },\r\n    { num: -1234.9, method: 'floor', result: -1235 },\r\n    { num: 1234.5, method: 'round', result: 1235 },\r\n    { num: 1234.4, method: 'round', result: 1234 },\r\n    { num: -1234.5, method: 'round', result: -1234 },\r\n    { num: -1234.6, method: 'round', result: -1235 }\r\n  ])('Integer pattern for $method', ({ num, method, result }) => {\r\n    //@Given input number is <num>\r\n    expect(typeof num).toBe('number');\r\n\r\n    //@When rounding with <method>\r\n    expect(Math).toHaveProperty(method);\r\n\r\n    //@Then rounded number is <result>\r\n    expect(Math[method](num)).toEqual(result);\r\n  });\r\n});\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In this example, the Gherkin feature and scenario outline are mapped directly into Jest's ",(0,t.jsx)(n.code,{children:"describe()"}),", ",(0,t.jsx)(n.code,{children:"test.each()"}),", and ",(0,t.jsx)(n.code,{children:"expect()"})," functions, with comments marking the corresponding Gherkin steps (",(0,t.jsx)(n.code,{children:"//@STEP"}),"). This provides a clear 1:1 mapping, demonstrating how the two frameworks align in structure and logic."]})]})}function a(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},5667:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>d});var t=r(5528);const s={},o=t.createContext(s);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);