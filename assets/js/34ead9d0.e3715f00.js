"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[669],{6561:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var s=t(2388),o=t(5667);const i={id:"testOracle",title:"Managing Examples with Test Oracle"},r="Managing Test Examples with Test Oracle",l={id:"testOracle",title:"Managing Examples with Test Oracle",description:"For more information about test oracles, you can visit Test Oracle on Wikipedia.",source:"@site/docs/testOracle.md",sourceDirName:".",slug:"/testOracle",permalink:"/jest-bdd-generator/testOracle",draft:!1,unlisted:!1,editUrl:"https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/testOracle.md",tags:[],version:"current",frontMatter:{id:"testOracle",title:"Managing Examples with Test Oracle"},sidebar:"docsSidebar",previous:{title:"Report Jest in Cucumber style",permalink:"/jest-bdd-generator/generateReports"},next:{title:"//@step comments Generation",permalink:"/jest-bdd-generator/generateComments"}},a={},c=[{value:"<code>Examples</code> and Combinations of All Options",id:"examples-and-combinations-of-all-options",level:2},{value:"Using the Test Oracle Component",id:"using-the-test-oracle-component",level:3},{value:"Explore It with Our Demo:",id:"explore-it-with-our-demo",level:2},{value:"Working with Selections:",id:"working-with-selections",level:3},{value:"Editing Expressions:",id:"editing-expressions",level:3},{value:"A More Complex Demo",id:"a-more-complex-demo",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"managing-test-examples-with-test-oracle",children:"Managing Test Examples with Test Oracle"})}),"\n",(0,s.jsxs)(n.p,{children:["For more information about test oracles, you can visit ",(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Test_oracle",children:"Test Oracle on Wikipedia"}),"."]}),"\n",(0,s.jsxs)(n.h2,{id:"examples-and-combinations-of-all-options",children:[(0,s.jsx)(n.code,{children:"Examples"})," and Combinations of All Options"]}),"\n",(0,s.jsxs)(n.p,{children:["The combinations of all possible options in test examples form what\u2019s known as a ",(0,s.jsx)(n.strong,{children:"Cartesian product"}),". This mathematical concept can result in thousands of combinations. The goal of this Web UI is to handle these combinations efficiently for you."]}),"\n",(0,s.jsx)(n.h3,{id:"using-the-test-oracle-component",children:"Using the Test Oracle Component"}),"\n",(0,s.jsxs)(n.p,{children:["Here\u2019s an example of how to integrate the ",(0,s.jsx)(n.strong,{children:"TestOracle"})," component into your code:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"<TestOracle \r\n  colSelections={colSelections} // Editor configuration of expressions\r\n  defaultCols={defaultCols} // Default columns\r\n  defaultRows={defaultRows} // Default rows\r\n  execute={execute} // Function that processes the combined expression\r\n/>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"explore-it-with-our-demo",children:"Explore It with Our Demo:"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"/demos/oracleNumber",children:(0,s.jsx)(n.strong,{children:"Rounding methods demo"})})," features a table of various ",(0,s.jsx)(n.code,{children:"Math.round"})," methods:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"run"})," in the top-left corner to generate and view the expected results."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"copy"})," to copy the table data and use it in your ",(0,s.jsx)(n.code,{children:".feature"})," files."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"working-with-selections",children:"Working with Selections:"}),"\n",(0,s.jsx)(n.p,{children:"You can easily copy selected data from the table:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Drag and select individual cells, or drag across column headers to select and copy entire columns."}),"\n",(0,s.jsx)(n.li,{children:"The selected data can be pasted directly into your Gherkin files."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"editing-expressions",children:"Editing Expressions:"}),"\n",(0,s.jsxs)(n.p,{children:["You can edit the expressions for both rows (e.g., ",(0,s.jsx)(n.code,{children:"9.1"}),", ",(0,s.jsx)(n.code,{children:"-9.1"}),") and columns (",(0,s.jsx)(n.code,{children:'"ceil"'}),", ",(0,s.jsx)(n.code,{children:'"floor"'}),"):"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Click the header of any row or column to modify the expression."}),"\n",(0,s.jsx)(n.li,{children:"Any changes you make will be reflected in the URL hash, so you can track and share updates."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You can also edit ",(0,s.jsx)(n.strong,{children:"row headers"})," (e.g., ",(0,s.jsx)(n.code,{children:"num"}),", ",(0,s.jsx)(n.code,{children:"note"}),") by clicking on the top of the row expression. The selected column will appear in the ",(0,s.jsx)(n.strong,{children:"Input box"}),", and the ",(0,s.jsx)(n.strong,{children:"paste box"})," supports multiline data separated by ",(0,s.jsx)(n.code,{children:"\\n"})," or ",(0,s.jsx)(n.code,{children:"\\r\\n"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"a-more-complex-demo",children:"A More Complex Demo"}),"\n",(0,s.jsxs)(n.p,{children:["You can explore a more advanced example of Test Oracle with the ",(0,s.jsx)(n.a,{href:"/demos/oracleIntl",children:(0,s.jsx)(n.strong,{children:"Intl Plural Rule demo"})}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},5667:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var s=t(5528);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);