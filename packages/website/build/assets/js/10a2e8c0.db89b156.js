'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [83],
  {
    7980: (e, t, n) => {
      n.r(t),
        n.d(t, {
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
          title: 'New Version 1.0.0',
          author: 'Eric Nakagawa',
          authorURL: 'http://twitter.com/ericnakagawa',
          authorFBID: 661277173
        },
        s = void 0,
        i = {
          permalink: '/jest-bdd-generator/blog/2017/10/24/new-version-1.0.0',
          source: '@site/blog/2017-10-24-new-version-1.0.0.md',
          title: 'New Version 1.0.0',
          description: 'This blog post will test file name parsing issues when periods are present.',
          date: '2017-10-24T00:00:00.000Z',
          tags: [],
          readingTime: 0.065,
          hasTruncateMarker: !1,
          authors: [{ name: 'Eric Nakagawa', url: 'http://twitter.com/ericnakagawa', key: null, page: null }],
          frontMatter: {
            title: 'New Version 1.0.0',
            author: 'Eric Nakagawa',
            authorURL: 'http://twitter.com/ericnakagawa',
            authorFBID: 661277173
          },
          unlisted: !1,
          nextItem: {
            title: 'Adding RSS Support',
            permalink: '/jest-bdd-generator/blog/2017/09/26/adding-rss'
          }
        },
        c = { authorsImageUrls: [void 0] },
        u = [];
      function l(e) {
        const t = { p: 'p', ...(0, a.R)(), ...e.components };
        return (0, r.jsx)(t.p, {
          children: 'This blog post will test file name parsing issues when periods are present.'
        });
      }
      function p(e = {}) {
        const { wrapper: t } = { ...(0, a.R)(), ...e.components };
        return t ? (0, r.jsx)(t, { ...e, children: (0, r.jsx)(l, { ...e }) }) : l(e);
      }
    },
    5667: (e, t, n) => {
      n.d(t, { R: () => s, x: () => i });
      var r = n(5528);
      const a = {},
        o = r.createContext(a);
      function s(e) {
        const t = r.useContext(o);
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(t) : { ...t, ...e };
          },
          [t, e]
        );
      }
      function i(e) {
        let t;
        return (
          (t = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(a)
              : e.components || a
            : s(e.components)),
          r.createElement(o.Provider, { value: t }, e.children)
        );
      }
    }
  }
]);
