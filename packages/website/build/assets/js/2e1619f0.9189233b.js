'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [813],
  {
    3080: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => a,
          contentTitle: () => i,
          default: () => u,
          frontMatter: () => o,
          metadata: () => c,
          toc: () => d
        });
      var s = n(2388),
        r = n(5667);
      const o = { id: 'genTests', title: 'Testing code Generation' },
        i = 'Generating testing code',
        c = {
          id: 'genTests',
          title: 'Testing code Generation',
          description: 'Given a well prepared Gherkin, most of the testing code can easily be generated.',
          source: '@site/docs/genTests.md',
          sourceDirName: '.',
          slug: '/genTests',
          permalink: '/jest-bdd-generator/genTests',
          draft: !1,
          unlisted: !1,
          editUrl: 'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/genTests.md',
          tags: [],
          version: 'current',
          frontMatter: { id: 'genTests', title: 'Testing code Generation' },
          sidebar: 'docsSidebar',
          previous: { title: 'Gherkin Jest comparison', permalink: '/jest-bdd-generator/mapping' },
          next: { title: '//@step comments Generation', permalink: '/jest-bdd-generator/genComments' }
        },
        a = {},
        d = [
          { value: 'invoke with code.', id: 'invoke-with-code', level: 2 },
          { value: 'CLI', id: 'cli', level: 2 },
          { value: 'Web UI', id: 'web-ui', level: 2 }
        ];
      function l(e) {
        const t = {
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          header: 'header',
          p: 'p',
          pre: 'pre',
          ...(0, r.R)(),
          ...e.components
        };
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(t.header, {
              children: (0, s.jsx)(t.h1, {
                id: 'generating-testing-code',
                children: 'Generating testing code'
              })
            }),
            '\n',
            (0, s.jsx)(t.p, {
              children: 'Given a well prepared Gherkin, most of the testing code can easily be generated.'
            }),
            '\n',
            (0, s.jsx)(t.h2, { id: 'invoke-with-code', children: 'invoke with code.' }),
            '\n',
            (0, s.jsx)(t.pre, {
              children: (0, s.jsx)(t.code, {
                className: 'language-ts',
                children:
                  "import { TestGeneratorFromSource } from 'jest-bdd-generator/lib/gherkin-to-test/TestGeneratorFromSource';\n\nconst generator = new TestGeneratorFromSource();\nconst steps = generator.compileKnownStepsFromSource(jestSource);\nconst ret = generator.generateGherkinFromSource(steps, gherkinSource) \n"
              })
            }),
            '\n',
            (0, s.jsx)(t.h2, { id: 'cli', children: 'CLI' }),
            '\n',
            (0, s.jsx)(t.pre, {
              children: (0, s.jsx)(t.code, {
                className: 'language-bash',
                children:
                  ' npx gen-test pathTestsInput=./tests/noImplement.test.ts pathGherkinInput=./docs/features/successfulMathRound.feature pathOutput=./tests/generatedTests.test.ts\n'
              })
            }),
            '\n',
            (0, s.jsx)(t.h2, { id: 'web-ui', children: 'Web UI' })
          ]
        });
      }
      function u(e = {}) {
        const { wrapper: t } = { ...(0, r.R)(), ...e.components };
        return t ? (0, s.jsx)(t, { ...e, children: (0, s.jsx)(l, { ...e }) }) : l(e);
      }
    },
    5667: (e, t, n) => {
      n.d(t, { R: () => i, x: () => c });
      var s = n(5528);
      const r = {},
        o = s.createContext(r);
      function i(e) {
        const t = s.useContext(o);
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
              ? e.components(r)
              : e.components || r
            : i(e.components)),
          s.createElement(o.Provider, { value: t }, e.children)
        );
      }
    }
  }
]);
