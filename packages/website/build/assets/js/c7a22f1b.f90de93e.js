'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [265],
  {
    2427: (t, e, n) => {
      n.r(e),
        n.d(e, {
          assets: () => c,
          contentTitle: () => s,
          default: () => l,
          frontMatter: () => o,
          metadata: () => i,
          toc: () => u
        });
      var r = n(2388),
        a = n(5667);
      const o = {
          title: 'Adding RSS Support - RSS Truncation Test',
          author: 'Eric Nakagawa',
          authorURL: 'http://twitter.com/ericnakagawa',
          authorFBID: 661277173
        },
        s = void 0,
        i = {
          permalink: '/jest-bdd-generator/blog/2017/09/25/testing-rss',
          source: '@site/blog/2017-09-25-testing-rss.md',
          title: 'Adding RSS Support - RSS Truncation Test',
          description:
            '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
          date: '2017-09-25T00:00:00.000Z',
          tags: [],
          readingTime: 0.065,
          hasTruncateMarker: !0,
          authors: [{ name: 'Eric Nakagawa', url: 'http://twitter.com/ericnakagawa', key: null, page: null }],
          frontMatter: {
            title: 'Adding RSS Support - RSS Truncation Test',
            author: 'Eric Nakagawa',
            authorURL: 'http://twitter.com/ericnakagawa',
            authorFBID: 661277173
          },
          unlisted: !1,
          prevItem: {
            title: 'Adding RSS Support',
            permalink: '/jest-bdd-generator/blog/2017/09/26/adding-rss'
          },
          nextItem: { title: 'New Blog Post', permalink: '/jest-bdd-generator/blog/2017/04/10/blog-post-two' }
        },
        c = { authorsImageUrls: [void 0] },
        u = [];
      function d(t) {
        const e = { p: 'p', ...(0, a.R)(), ...t.components };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(e.p, {
              children:
                '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
            }),
            '\n',
            (0, r.jsx)(e.p, { children: 'This should be truncated.' })
          ]
        });
      }
      function l(t = {}) {
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
