'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [643],
  {
    5056: (e, t, a) => {
      a.r(t), a.d(t, { default: () => f });
      a(5528);
      var i = a(7286),
        n = a(341),
        s = a(7960),
        r = a(2489),
        l = a(5440),
        o = a(2431),
        g = a(1465),
        c = a(2388);
      function p(e) {
        var t = e.metadata,
          a = t.previousPage,
          i = t.nextPage;
        return (0, c.jsxs)('nav', {
          className: 'pagination-nav',
          'aria-label': (0, o.T)({
            id: 'theme.blog.paginator.navAriaLabel',
            message: 'Blog list page navigation',
            description: 'The ARIA label for the blog pagination'
          }),
          children: [
            a &&
              (0, c.jsx)(g.A, {
                permalink: a,
                title: (0, c.jsx)(o.A, {
                  id: 'theme.blog.paginator.newerEntries',
                  description: 'The label used to navigate to the newer blog posts page (previous page)',
                  children: 'Newer entries'
                })
              }),
            i &&
              (0, c.jsx)(g.A, {
                permalink: i,
                title: (0, c.jsx)(o.A, {
                  id: 'theme.blog.paginator.olderEntries',
                  description: 'The label used to navigate to the older blog posts page (next page)',
                  children: 'Older entries'
                }),
                isNext: !0
              })
          ]
        });
      }
      var d = a(7812),
        b = a(8864),
        j = a(4565);
      function x(e) {
        var t = e.items,
          a = e.component,
          i = void 0 === a ? j.A : a;
        return (0, c.jsx)(c.Fragment, {
          children: t.map(function (e) {
            var t = e.content;
            return (0, c.jsx)(
              b.in,
              { content: t, children: (0, c.jsx)(i, { children: (0, c.jsx)(t, {}) }) },
              t.metadata.permalink
            );
          })
        });
      }
      var h = a(5215);
      function u(e) {
        var t = (0, b.kJ)(e);
        return (0, c.jsx)(h.A, {
          children: (0, c.jsx)('script', { type: 'application/ld+json', children: JSON.stringify(t) })
        });
      }
      function m(e) {
        var t = e.metadata,
          a = (0, n.A)().siteConfig.title,
          i = t.blogDescription,
          r = t.blogTitle,
          l = '/' === t.permalink ? a : r;
        return (0, c.jsxs)(c.Fragment, {
          children: [
            (0, c.jsx)(s.be, { title: l, description: i }),
            (0, c.jsx)(d.A, { tag: 'blog_posts_list' })
          ]
        });
      }
      function v(e) {
        var t = e.metadata,
          a = e.items,
          i = e.sidebar;
        return (0, c.jsxs)(l.A, {
          sidebar: i,
          children: [(0, c.jsx)(x, { items: a }), (0, c.jsx)(p, { metadata: t })]
        });
      }
      function f(e) {
        return (0, c.jsxs)(s.e3, {
          className: (0, i.A)(r.G.wrapper.blogPages, r.G.page.blogListPage),
          children: [
            (0, c.jsx)(m, Object.assign({}, e)),
            (0, c.jsx)(u, Object.assign({}, e)),
            (0, c.jsx)(v, Object.assign({}, e))
          ]
        });
      }
    }
  }
]);
