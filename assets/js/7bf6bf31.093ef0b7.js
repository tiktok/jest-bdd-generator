"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[72],{1471:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var t=r(2388),o=r(5667);const i={},s=void 0,a={id:"UI/TestOracle.api",title:"TestOracle.api",description:'API Report File for "jest-bdd-generator"',source:"@site/../sdk/docs/UI/TestOracle.api.md",sourceDirName:"UI",slug:"/UI/TestOracle.api",permalink:"/jest-bdd-generator/references/UI/TestOracle.api",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"TestStory.api",permalink:"/jest-bdd-generator/references/UI/TestStory.api"},next:{title:"TestGeneration.api",permalink:"/jest-bdd-generator/references/UI/TestGeneration.api"}},l={},c=[{value:"API Report File for &quot;jest-bdd-generator&quot;",id:"api-report-file-for-jest-bdd-generator",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"api-report-file-for-jest-bdd-generator",children:'API Report File for "jest-bdd-generator"'}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["Do not edit this file. It is a report generated by ",(0,t.jsx)(n.a,{href:"https://api-extractor.com/",children:"API Extractor"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"\r\nimport { default as React_2 } from 'react';\r\n\r\n// @public (undocumented)\r\nexport type EditorSelectionRelation<T extends IExpressionNote> = {\r\n    value: T[StringKeyOf<T>];\r\n} & Partial<T>;\r\n\r\n// @public (undocumented)\r\nexport type IExpression = {\r\n    [key: string]: IExpressionValue;\r\n};\r\n\r\n// @public (undocumented)\r\nexport type IExpressionNote = IExpression & {\r\n    note?: string;\r\n};\r\n\r\n// @public (undocumented)\r\nexport type IExpressionValue = string | number | boolean | Date;\r\n\r\n// @public (undocumented)\r\nexport function restoreHash<T extends IExpression>(selections?: Partial<{\r\n    [k in StringKeyOf<T>]: Array<NonNullable<T[k]> | EditorSelectionRelation<T>> | NonNullable<T[k]>;\r\n}>): [{\r\n    expression: T;\r\n}[], {\r\n    expression: T;\r\n}[], string];\r\n\r\n// @public (undocumented)\r\nexport type StringKeyOf<T> = string & Exclude<Exclude<keyof T, symbol>, number>;\r\n\r\n// @public (undocumented)\r\nexport function TestOracle<T extends IExpression, E extends IExpressionNote = T & {\r\n    note?: string;\r\n}, K extends StringKeyOf<E> = StringKeyOf<E>, S extends {\r\n    [k in StringKeyOf<E>]: Array<NonNullable<E[k]> | EditorSelectionRelation<E>> | NonNullable<E[k]>;\r\n} = {\r\n    [k in StringKeyOf<E>]: Array<NonNullable<E[k]> | EditorSelectionRelation<E>> | NonNullable<E[k]>;\r\n}>({ defaultCols, defaultRows, colSelections, execute, sort }: {\r\n    defaultCols: Partial<E>[];\r\n    defaultRows: Partial<E>[];\r\n    colSelections: Partial<S>;\r\n    execute: (options: Partial<T>) => Promise<React_2.ReactNode>;\r\n    sort?: (options: Partial<E> | undefined) => Promise<void | ((row: {\r\n        expression: Partial<E>;\r\n    }) => number)>;\r\n}): React_2.ReactElement<any, any>;\r\n\r\n// (No @packageDocumentation comment for this package)\r\n\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},5667:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>a});var t=r(5528);const o={},i=t.createContext(o);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);