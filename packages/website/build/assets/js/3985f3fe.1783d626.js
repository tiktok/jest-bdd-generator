'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [572],
  {
    5565: (t, e, o) => {
      o.r(e),
        o.d(e, {
          assets: () => a,
          contentTitle: () => n,
          default: () => m,
          frontMatter: () => r,
          metadata: () => u,
          toc: () => l
        });
      var i = o(2388),
        s = o(5667);
      const r = {
          title: 'New Blog Post',
          author: 'Blog Author',
          authorURL: 'http://twitter.com/',
          authorFBID: 0x5af3c1e45b2b
        },
        n = void 0,
        u = {
          permalink: '/jest-bdd-generator/blog/2017/04/10/blog-post-two',
          source: '@site/blog/2017-04-10-blog-post-two.md',
          title: 'New Blog Post',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum massa eget nulla aliquet sagittis. Proin odio tortor, vulputate ut odio in, ultrices ultricies augue. Cras ornare ultrices lorem malesuada iaculis. Etiam sit amet libero tempor, pulvinar mauris sed, sollicitudin sapien.',
          date: '2017-04-10T00:00:00.000Z',
          tags: [],
          readingTime: 2.31,
          hasTruncateMarker: !0,
          authors: [{ name: 'Blog Author', url: 'http://twitter.com/', key: null, page: null }],
          frontMatter: {
            title: 'New Blog Post',
            author: 'Blog Author',
            authorURL: 'http://twitter.com/',
            authorFBID: 0x5af3c1e45b2b
          },
          unlisted: !1,
          prevItem: {
            title: 'Adding RSS Support - RSS Truncation Test',
            permalink: '/jest-bdd-generator/blog/2017/09/25/testing-rss'
          },
          nextItem: { title: 'Blog Title', permalink: '/jest-bdd-generator/blog/2016/03/11/blog-post' }
        },
        a = { authorsImageUrls: [void 0] },
        l = [];
      function c(t) {
        const e = { p: 'p', ...(0, s.R)(), ...t.components };
        return (0, i.jsx)(e.p, {
          children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum massa eget nulla aliquet sagittis. Proin odio tortor, vulputate ut odio in, ultrices ultricies augue. Cras ornare ultrices lorem malesuada iaculis. Etiam sit amet libero tempor, pulvinar mauris sed, sollicitudin sapien.'
        });
      }
      function m(t = {}) {
        const { wrapper: e } = { ...(0, s.R)(), ...t.components };
        return e ? (0, i.jsx)(e, { ...t, children: (0, i.jsx)(c, { ...t }) }) : c(t);
      }
    },
    5667: (t, e, o) => {
      o.d(e, { R: () => n, x: () => u });
      var i = o(5528);
      const s = {},
        r = i.createContext(s);
      function n(t) {
        const e = i.useContext(r);
        return i.useMemo(
          function () {
            return 'function' == typeof t ? t(e) : { ...e, ...t };
          },
          [e, t]
        );
      }
      function u(t) {
        let e;
        return (
          (e = t.disableParentContext
            ? 'function' == typeof t.components
              ? t.components(s)
              : t.components || s
            : n(t.components)),
          i.createElement(r.Provider, { value: e }, t.children)
        );
      }
    }
  }
]);
