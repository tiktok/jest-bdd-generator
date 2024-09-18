'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [899],
  {
    2243: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => c,
          contentTitle: () => a,
          default: () => h,
          frontMatter: () => r,
          metadata: () => o,
          toc: () => d
        });
      var i = t(2388),
        s = t(5667);
      const r = { id: 'introduction', title: 'Why Jest-BDD', sidebar_label: 'Why Jest-BDD' },
        a = 'Why Jest-BDD',
        o = {
          id: 'introduction',
          title: 'Why Jest-BDD',
          description:
            'There are two key difference between Cucumber and Jest, that make them contradictory in certain aspects:',
          source: '@site/docs/introduction.md',
          sourceDirName: '.',
          slug: '/introduction',
          permalink: '/jest-bdd-generator/introduction',
          draft: !1,
          unlisted: !1,
          editUrl:
            'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/docs/introduction.md',
          tags: [],
          version: 'current',
          frontMatter: { id: 'introduction', title: 'Why Jest-BDD', sidebar_label: 'Why Jest-BDD' },
          sidebar: 'docsSidebar',
          next: { title: 'Gherkin Jest comparison', permalink: '/jest-bdd-generator/mapping' }
        },
        c = {},
        d = [];
      function l(e) {
        const n = {
          a: 'a',
          code: 'code',
          h1: 'h1',
          header: 'header',
          li: 'li',
          ol: 'ol',
          p: 'p',
          strong: 'strong',
          ul: 'ul',
          ...(0, s.R)(),
          ...e.components
        };
        return (0, i.jsxs)(i.Fragment, {
          children: [
            (0, i.jsx)(n.header, {
              children: (0, i.jsx)(n.h1, { id: 'why-jest-bdd', children: 'Why Jest-BDD' })
            }),
            '\n',
            (0, i.jsxs)(n.p, {
              children: [
                'There are ',
                (0, i.jsx)(n.strong, { children: 'two key difference' }),
                ' between ',
                (0, i.jsx)(n.strong, { children: 'Cucumber' }),
                ' and ',
                (0, i.jsx)(n.strong, { children: 'Jest' }),
                ', that make them contradictory in certain aspects:'
              ]
            }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsx)(n.p, { children: (0, i.jsx)(n.strong, { children: 'context' }) }),
                    '\n',
                    (0, i.jsxs)(n.ol, {
                      children: [
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'Unit testing with Jest requires every ',
                            (0, i.jsx)(n.code, { children: 'test()' }),
                            ' to be self-contained and independent, or put in another way, context-free.'
                          ]
                        }),
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'In the contrast, it is an ',
                            (0, i.jsx)(n.strong, { children: 'anti-pattern' }),
                            ' for ',
                            (0, i.jsx)(n.code, { children: 'Cucumber' }),
                            ' to have steps that are scenario-specific. It emphasizes reusing across different scenarios, allowing tests to run in various real-world context.'
                          ]
                        }),
                        '\n'
                      ]
                    }),
                    '\n'
                  ]
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsx)(n.p, { children: (0, i.jsx)(n.strong, { children: 'Reusing' }) }),
                    '\n',
                    (0, i.jsxs)(n.ol, {
                      children: [
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'One of the powerful aspects of ',
                            (0, i.jsx)(n.code, { children: 'Cucumber' }),
                            ' and the ',
                            (0, i.jsx)(n.code, { children: 'BDD' }),
                            ' approach is the ability to reuse ',
                            (0, i.jsx)(n.code, { children: 'step' }),
                            ' definitions across multiple scenarios and features, allowing you to cover a wide range of test cases with a relatively small amount of code. This reuse is facilitated by writing generic step definitions that can be parameterized to handle different data and contexts.'
                          ]
                        }),
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'On the other hand in unit testing, over-reuse is an ',
                            (0, i.jsx)(n.strong, { children: 'anti-pattern' }),
                            ' sometimes referred as Utility-Abuse. It often hides important logic, reduce test readability, and introduces unnecessary coupling between tests.'
                          ]
                        }),
                        '\n'
                      ]
                    }),
                    '\n'
                  ]
                }),
                '\n'
              ]
            }),
            '\n',
            (0, i.jsxs)(n.p, {
              children: [
                (0, i.jsx)(n.strong, { children: 'Despite these differences, there are key similarities' }),
                ' that make Jest and BDD approaches resonate:'
              ]
            }),
            '\n',
            (0, i.jsxs)(n.ul, {
              children: [
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsxs)(n.p, {
                      children: [
                        (0, i.jsx)(n.code, { children: 'Triple-A' }),
                        ' pattern and ',
                        (0, i.jsx)(n.code, { children: 'Gherkin' }),
                        ':'
                      ]
                    }),
                    '\n',
                    (0, i.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, i.jsx)(n.li, {
                          children:
                            'Cucumber divides testing code into steps and runs them in sequence by the Scenarios defined.'
                        }),
                        '\n'
                      ]
                    }),
                    '\n',
                    (0, i.jsxs)(n.ol, {
                      children: [
                        '\n',
                        (0, i.jsx)(n.li, { children: 'Arrange (Given): Establish the context.' }),
                        '\n',
                        (0, i.jsx)(n.li, { children: 'Action (When): Simulate actions or events.' }),
                        '\n',
                        (0, i.jsx)(n.li, {
                          children: 'Assertion (Then): Verify outcomes against the expected results.'
                        }),
                        '\n'
                      ]
                    }),
                    '\n'
                  ]
                }),
                '\n',
                (0, i.jsxs)(n.li, {
                  children: [
                    '\n',
                    (0, i.jsxs)(n.p, {
                      children: [(0, i.jsx)(n.code, { children: 'Scenario' }), ' as a Unit']
                    }),
                    '\n',
                    (0, i.jsxs)(n.ul, {
                      children: [
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'In Gherkin, the ',
                            (0, i.jsx)(n.code, { children: 'Scenario' }),
                            " is an equivalent concept to Jest's ",
                            (0, i.jsx)(n.code, { children: 'test()' }),
                            '. Each Scenario represents a single path or example through a feature, describing a particular behavior of the application in a given situation.'
                          ]
                        }),
                        '\n',
                        (0, i.jsxs)(n.li, {
                          children: [
                            'Unlike the ',
                            (0, i.jsx)(n.code, { children: 'steps' }),
                            ' in Gherkin, a ',
                            (0, i.jsx)(n.code, { children: 'Scenario' }),
                            " do not rely on external context or state. This isolation ensures that tests are deterministic, meaning they will produce the same outcome every time they are run if the code hasn't changed. This characteristic is crucial for identifying and troubleshooting issues quickly and accurately."
                          ]
                        }),
                        '\n'
                      ]
                    }),
                    '\n'
                  ]
                }),
                '\n'
              ]
            }),
            '\n',
            (0, i.jsx)(n.p, {
              children:
                'In other words, combining the best of both Jest and BDD can create a powerful testing framework with broader capabilities and flexibility.'
            }),
            '\n',
            (0, i.jsx)(n.h1, {
              id: 'more-about-behaviour-driven-development-bdd',
              children: 'More about Behaviour-Driven Development (BDD)'
            }),
            '\n',
            (0, i.jsxs)(n.p, {
              children: [
                (0, i.jsx)(n.a, {
                  href: 'https://cucumber.io/docs/installation/javascript/',
                  children: 'CucumberJS'
                }),
                ' facilitates behavior-driven development by enabling automated acceptance tests written in plain language. The language, called ',
                (0, i.jsx)(n.a, { href: 'https://cucumber.io/docs/gherkin/reference/', children: 'Gherkin' }),
                ", bridges the gap between developers, QA engineers, and non-technical stakeholders, allowing them to collaborate on how the software should behave. Gherkin\u2019s natural, human-readable format describes features and expected behaviors, ensuring a shared understanding of the system's requirements."
              ]
            })
          ]
        });
      }
      function h(e = {}) {
        const { wrapper: n } = { ...(0, s.R)(), ...e.components };
        return n ? (0, i.jsx)(n, { ...e, children: (0, i.jsx)(l, { ...e }) }) : l(e);
      }
    },
    5667: (e, n, t) => {
      t.d(n, { R: () => a, x: () => o });
      var i = t(5528);
      const s = {},
        r = i.createContext(s);
      function a(e) {
        const n = i.useContext(r);
        return i.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function o(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : a(e.components)),
          i.createElement(r.Provider, { value: n }, e.children)
        );
      }
    }
  }
]);
