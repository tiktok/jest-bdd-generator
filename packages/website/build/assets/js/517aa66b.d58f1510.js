'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [364],
  {
    2839: (t, e, n) => {
      n.r(e),
        n.d(e, {
          assets: () => c,
          contentTitle: () => s,
          default: () => p,
          frontMatter: () => o,
          metadata: () => i,
          toc: () => u
        });
      var r = n(2388),
        a = n(5667);
      const o = {
          title: 'Adding RSS Support',
          author: 'Eric Nakagawa',
          authorURL: 'http://twitter.com/ericnakagawa',
          authorFBID: 661277173
        },
        s = void 0,
        i = {
          permalink: '/jest-bdd-generator/blog/2017/09/26/adding-rss',
          source: '@site/blog/2017-09-26-adding-rss.md',
          title: 'Adding RSS Support',
          description: 'This is a test post.',
          date: '2017-09-26T00:00:00.000Z',
          tags: [],
          readingTime: 0.055,
          hasTruncateMarker: !1,
          authors: [{ name: 'Eric Nakagawa', url: 'http://twitter.com/ericnakagawa', key: null, page: null }],
          frontMatter: {
            title: 'Adding RSS Support',
            author: 'Eric Nakagawa',
            authorURL: 'http://twitter.com/ericnakagawa',
            authorFBID: 661277173
          },
          unlisted: !1,
          prevItem: {
            title: 'New Version 1.0.0',
            permalink: '/jest-bdd-generator/blog/2017/10/24/new-version-1.0.0'
          },
          nextItem: {
            title: 'Adding RSS Support - RSS Truncation Test',
            permalink: '/jest-bdd-generator/blog/2017/09/25/testing-rss'
          }
        },
        c = { authorsImageUrls: [void 0] },
        u = [];
      function d(t) {
        const e = { p: 'p', ...(0, a.R)(), ...t.components };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(e.p, { children: 'This is a test post.' }),
            '\n',
            (0, r.jsx)(e.p, { children: 'A whole bunch of other information.' })
          ]
        });
      }
      function p(t = {}) {
        const { wrapper: e } = { ...(0, a.R)(), ...t.components };
        return e ? (0, r.jsx)(e, { ...t, children: (0, r.jsx)(d, { ...t }) }) : d(t);
      }
    },
    5667: (t, e, n) => {
      n.d(e, { R: () => s, x: () => i });
      var r = n(5528);
      const a = {},
        o = r.createContext(a);
      function s(t) {
        const e = r.useContext(o);
        return r.useMemo(
          function () {
            return 'function' == typeof t ? t(e) : { ...e, ...t };
          },
          [e, t]
        );
      }
      function i(t) {
        let e;
        return (
          (e = t.disableParentContext
            ? 'function' == typeof t.components
              ? t.components(a)
              : t.components || a
            : s(t.components)),
          r.createElement(o.Provider, { value: e }, t.children)
        );
      }
    }
  }
]);
