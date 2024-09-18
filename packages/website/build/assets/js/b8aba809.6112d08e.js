'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [938],
  {
    6783: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => a,
          contentTitle: () => i,
          default: () => l,
          frontMatter: () => r,
          metadata: () => c,
          toc: () => d
        });
      var s = n(2388),
        o = n(5667);
      const r = { id: 'genComments', title: '//@step comments Generation' },
        i = 'Generate Comments for Test Code',
        c = {
          id: 'genComments',
          title: '//@step comments Generation',
          description: 'Automatically generate comments for the test code using predefined steps:',
          source: '@site/docs/genComments.md',
          sourceDirName: '.',
          slug: '/genComments',
          permalink: '/jest-bdd-generator/genComments',
          draft: !1,
          unlisted: !1,
          editUrl:
            'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/genComments.md',
          tags: [],
          version: 'current',
          frontMatter: { id: 'genComments', title: '//@step comments Generation' },
          sidebar: 'docsSidebar',
          previous: { title: 'Testing code Generation', permalink: '/jest-bdd-generator/genTests' },
          next: { title: 'Gherkin *.feature generation', permalink: '/jest-bdd-generator/genGherkins' }
        },
        a = {},
        d = [
          { value: 'invoke from code', id: 'invoke-from-code', level: 2 },
          { value: 'CLI', id: 'cli', level: 2 }
        ];
      function m(e) {
        const t = {
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          header: 'header',
          p: 'p',
          pre: 'pre',
          ...(0, o.R)(),
          ...e.components
        };
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(t.header, {
              children: (0, s.jsx)(t.h1, {
                id: 'generate-comments-for-test-code',
                children: 'Generate Comments for Test Code'
              })
            }),
            '\n',
            (0, s.jsx)(t.p, {
              children: 'Automatically generate comments for the test code using predefined steps:'
            }),
            '\n',
            (0, s.jsx)(t.h2, { id: 'invoke-from-code', children: 'invoke from code' }),
            '\n',
            (0, s.jsx)(t.pre, {
              children: (0, s.jsx)(t.code, {
                className: 'language-ts',
                children:
                  "import { JestToGherkin } from 'jest-bdd-generator/lib/jest-to-gherkin/JestToGherkin';\n\nconst transpiler = new JestToGherkin();\ntranspiler.transpile(jestSource, { fileName: '*.test.ts' });\nconst ret = transpiler.generateComments();\n"
              })
            }),
            '\n',
            (0, s.jsx)(t.h2, { id: 'cli', children: 'CLI' }),
            '\n',
            (0, s.jsx)(t.pre, {
              children: (0, s.jsx)(t.code, {
                className: 'language-bash',
                children:
                  'npx gen-comments pathTestsInput=./tests/noComment.test.ts pathOutput=./generatedComments.test.ts\n'
              })
            })
          ]
        });
      }
      function l(e = {}) {
        const { wrapper: t } = { ...(0, o.R)(), ...e.components };
        return t ? (0, s.jsx)(t, { ...e, children: (0, s.jsx)(m, { ...e }) }) : m(e);
      }
    },
    5667: (e, t, n) => {
      n.d(t, { R: () => i, x: () => c });
      var s = n(5528);
      const o = {},
        r = s.createContext(o);
      function i(e) {
        const t = s.useContext(r);
        return s.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e]
        );
      }
      function c(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(o)
              : e.components || o
            : i(e.components)),
          s.createElement(r.Provider, { value: t }, e.children)
        );
      }
    }
  }
]);
