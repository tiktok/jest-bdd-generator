'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [523],
  {
    5005: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => c,
          contentTitle: () => d,
          default: () => a,
          frontMatter: () => o,
          metadata: () => i,
          toc: () => h
        });
      var r = t(2388),
        s = t(5667);
      const o = { id: 'mapping', title: 'Gherkin Jest comparison' },
        d = 'Comparison / Mapping of Gherkin to Jest',
        i = {
          id: 'mapping',
          title: 'Gherkin Jest comparison',
          description: '| Cucumber | Jest |',
          source: '@site/docs/mapping.md',
          sourceDirName: '.',
          slug: '/mapping',
          permalink: '/jest-bdd-generator/mapping',
          draft: !1,
          unlisted: !1,
          editUrl: 'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/mapping.md',
          tags: [],
          version: 'current',
          frontMatter: { id: 'mapping', title: 'Gherkin Jest comparison' },
          sidebar: 'docsSidebar',
          previous: { title: 'Why Jest-BDD', permalink: '/jest-bdd-generator/introduction' },
          next: { title: 'Testing code Generation', permalink: '/jest-bdd-generator/genTests' }
        },
        c = {},
        h = [
          {
            value: 'for instance, these two are the perfect match',
            id: 'for-instance-these-two-are-the-perfect-match',
            level: 2
          }
        ];
      function l(e) {
        const n = {
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          header: 'header',
          pre: 'pre',
          table: 'table',
          tbody: 'tbody',
          td: 'td',
          th: 'th',
          thead: 'thead',
          tr: 'tr',
          ...(0, s.R)(),
          ...e.components
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.header, {
              children: (0, r.jsx)(n.h1, {
                id: 'comparison--mapping-of-gherkin-to-jest',
                children: 'Comparison / Mapping of Gherkin to Jest'
              })
            }),
            '\n',
            (0, r.jsxs)(n.table, {
              children: [
                (0, r.jsx)(n.thead, {
                  children: (0, r.jsxs)(n.tr, {
                    children: [
                      (0, r.jsx)(n.th, { children: 'Cucumber' }),
                      (0, r.jsx)(n.th, { children: 'Jest' })
                    ]
                  })
                }),
                (0, r.jsxs)(n.tbody, {
                  children: [
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'Feature' }) }),
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'define()' }) })
                      ]
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'Scenario' }) }),
                        (0, r.jsxs)(n.td, {
                          children: [
                            (0, r.jsx)(n.code, { children: 'test()' }),
                            ' / ',
                            (0, r.jsx)(n.code, { children: 'it()' })
                          ]
                        })
                      ]
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'Examples' }) }),
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'test.each()()' }) })
                      ]
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'Background' }) }),
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'beforeAll()' }) })
                      ]
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, { children: (0, r.jsx)(n.code, { children: 'Steps' }) }),
                        (0, r.jsxs)(n.td, {
                          children: [
                            'code statements and ',
                            (0, r.jsx)(n.code, { children: '//@STEP' }),
                            ' comments'
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            '\n',
            (0, r.jsx)(n.h2, {
              id: 'for-instance-these-two-are-the-perfect-match',
              children: 'for instance, these two are the perfect match'
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-Gherkin',
                children:
                  'Feature: Rounding methods of Math\n\nScenario Outline: Integer pattern\n  Given input number is <num>\n  When rounding with <method>\n  Then rounded number is <result>\n\nExamples:\n| num | method | result |\n| 1234.1 | "ceil" | 1235 |\n| 1234.9 | "ceil" | 1235 |\n| -1234.1 | "ceil" | -1234 |\n| -1234.9 | "ceil" | -1234 |\n| 1234.1 | "floor" | 1234 |\n| 1234.9 | "floor" | 1234 |\n| -1234.1 | "floor" | -1235 |\n| -1234.9 | "floor" | -1235 |\n| 1234.5 | "round" | 1235 |\n| 1234.4 | "round" | 1234 |\n| -1234.5 | "round" | -1234 |\n| -1234.6 | "round" | -1235 |\n'
              })
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "import { describe, test, it, expect } from '@jest/globals';\n\ndescribe('Fail With Math.f16Round', () => {\n  test.each([\n    { num: 1234.1, method: 'ceil', result: 1235 },\n    { num: 1234.9, method: 'ceil', result: 1235 },\n    { num: -1234.1, method: 'ceil', result: -1234 },\n    { num: -1234.9, method: 'ceil', result: -1234 },\n    { num: 1234.1, method: 'floor', result: 1234 },\n    { num: 1234.9, method: 'floor', result: 1234 },\n    { num: -1234.1, method: 'floor', result: -1235 },\n    { num: -1234.9, method: 'floor', result: -1235 },\n    { num: 1234.5, method: 'round', result: 1235 },\n    { num: 1234.4, method: 'round', result: 1234 },\n    { num: -1234.5, method: 'round', result: -1234 },\n    { num: -1234.6, method: 'round', result: -1235 }\n  ])('Integer pattern', async ({ num, method, result }) => {\n    //@Given input number is <num>\n    expect(typeof num).toBe('number');\n\n    //@When rounding with <method>\n    expect(Math).toHaveProperty(method);\n\n    //@Then rounded number is <result>\n    expect(Math[method](num)).toEqual(result);\n  });\n});\n\n\n"
              })
            })
          ]
        });
      }
      function a(e = {}) {
        const { wrapper: n } = { ...(0, s.R)(), ...e.components };
        return n ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(l, { ...e }) }) : l(e);
      }
    },
    5667: (e, n, t) => {
      t.d(n, { R: () => d, x: () => i });
      var r = t(5528);
      const s = {},
        o = r.createContext(s);
      function d(e) {
        const n = r.useContext(o);
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function i(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : d(e.components)),
          r.createElement(o.Provider, { value: n }, e.children)
        );
      }
    }
  }
]);
