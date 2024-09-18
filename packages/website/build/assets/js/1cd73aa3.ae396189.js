'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [956],
  {
    9918: (e, t, n) => {
      n.r(t),
        n.d(t, {
          assets: () => c,
          contentTitle: () => i,
          default: () => h,
          frontMatter: () => o,
          metadata: () => a,
          toc: () => d
        });
      var r = n(2388),
        s = n(5667);
      const o = { id: 'genGherkins', title: 'Gherkin *.feature generation' },
        i = 'Generate Gherkin Document from Tests',
        a = {
          id: 'genGherkins',
          title: 'Gherkin *.feature generation',
          description: 'Generate a Gherkin document from test cases:',
          source: '@site/docs/genGherkins.md',
          sourceDirName: '.',
          slug: '/genGherkins',
          permalink: '/jest-bdd-generator/genGherkins',
          draft: !1,
          unlisted: !1,
          editUrl:
            'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/genGherkins.md',
          tags: [],
          version: 'current',
          frontMatter: { id: 'genGherkins', title: 'Gherkin *.feature generation' },
          sidebar: 'docsSidebar',
          previous: { title: '//@step comments Generation', permalink: '/jest-bdd-generator/genComments' }
        },
        c = {},
        d = [];
      function u(e) {
        const t = {
          code: 'code',
          h1: 'h1',
          header: 'header',
          p: 'p',
          pre: 'pre',
          ...(0, s.R)(),
          ...e.components
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(t.header, {
              children: (0, r.jsx)(t.h1, {
                id: 'generate-gherkin-document-from-tests',
                children: 'Generate Gherkin Document from Tests'
              })
            }),
            '\n',
            (0, r.jsx)(t.p, { children: 'Generate a Gherkin document from test cases:' }),
            '\n',
            (0, r.jsx)(t.pre, {
              children: (0, r.jsx)(t.code, {
                className: 'language-bash',
                children:
                  'npx gen-doc pathTestsInput=./tests/failWithF16Round.test.ts pathOutput=./docs/features/generatedFeature.feature\n'
              })
            })
          ]
        });
      }
      function h(e = {}) {
        const { wrapper: t } = { ...(0, s.R)(), ...e.components };
        return t ? (0, r.jsx)(t, { ...e, children: (0, r.jsx)(u, { ...e }) }) : u(e);
      }
    },
    5667: (e, t, n) => {
      n.d(t, { R: () => i, x: () => a });
      var r = n(5528);
      const s = {},
        o = r.createContext(s);
      function i(e) {
        const t = r.useContext(o);
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e]
        );
      }
      function a(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : i(e.components)),
          r.createElement(o.Provider, { value: t }, e.children)
        );
      }
    }
  }
]);
