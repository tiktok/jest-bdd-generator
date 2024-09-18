'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [249],
  {
    6195: (e, n, t) => {
      t.r(n), t.d(n, { default: () => b });
      t(5528);
      var i = t(7286),
        a = t(7960),
        r = t(2489),
        s = t(8864),
        l = t(5440),
        o = t(4565),
        c = t(2431),
        d = t(1465),
        u = t(2388);
      function m(e) {
        var n = e.nextItem,
          t = e.prevItem;
        return (0, u.jsxs)('nav', {
          className: 'pagination-nav docusaurus-mt-lg',
          'aria-label': (0, c.T)({
            id: 'theme.blog.post.paginator.navAriaLabel',
            message: 'Blog post page navigation',
            description: 'The ARIA label for the blog posts pagination'
          }),
          children: [
            t &&
              (0, u.jsx)(
                d.A,
                Object.assign({}, t, {
                  subLabel: (0, u.jsx)(c.A, {
                    id: 'theme.blog.post.paginator.newerPost',
                    description: 'The blog post button label to navigate to the newer/previous post',
                    children: 'Newer post'
                  })
                })
              ),
            n &&
              (0, u.jsx)(
                d.A,
                Object.assign({}, n, {
                  subLabel: (0, u.jsx)(c.A, {
                    id: 'theme.blog.post.paginator.olderPost',
                    description: 'The blog post button label to navigate to the older/next post',
                    children: 'Older post'
                  }),
                  isNext: !0
                })
              )
          ]
        });
      }
      function f() {
        var e,
          n = (0, s.e7)(),
          t = n.assets,
          i = n.metadata,
          r = i.title,
          l = i.description,
          o = i.date,
          c = i.tags,
          d = i.authors,
          m = i.frontMatter,
          f = m.keywords,
          v = null != (e = t.image) ? e : m.image;
        return (0, u.jsxs)(a.be, {
          title: r,
          description: l,
          keywords: f,
          image: v,
          children: [
            (0, u.jsx)('meta', { property: 'og:type', content: 'article' }),
            (0, u.jsx)('meta', { property: 'article:published_time', content: o }),
            d.some(function (e) {
              return e.url;
            }) &&
              (0, u.jsx)('meta', {
                property: 'article:author',
                content: d
                  .map(function (e) {
                    return e.url;
                  })
                  .filter(Boolean)
                  .join(',')
              }),
            c.length > 0 &&
              (0, u.jsx)('meta', {
                property: 'article:tag',
                content: c
                  .map(function (e) {
                    return e.label;
                  })
                  .join(',')
              })
          ]
        });
      }
      var v = t(5215);
      function g() {
        var e = (0, s.J_)();
        return (0, u.jsx)(v.A, {
          children: (0, u.jsx)('script', { type: 'application/ld+json', children: JSON.stringify(e) })
        });
      }
      var h = t(5232),
        p = t(763);
      function x(e) {
        var n = e.sidebar,
          t = e.children,
          i = (0, s.e7)(),
          a = i.metadata,
          r = i.toc,
          c = a.nextItem,
          d = a.prevItem,
          f = a.frontMatter,
          v = f.hide_table_of_contents,
          g = f.toc_min_heading_level,
          x = f.toc_max_heading_level;
        return (0, u.jsxs)(l.A, {
          sidebar: n,
          toc:
            !v && r.length > 0 ? (0, u.jsx)(h.A, { toc: r, minHeadingLevel: g, maxHeadingLevel: x }) : void 0,
          children: [
            (0, u.jsx)(p.A, { metadata: a }),
            (0, u.jsx)(o.A, { children: t }),
            (c || d) && (0, u.jsx)(m, { nextItem: c, prevItem: d })
          ]
        });
      }
      function b(e) {
        var n = e.content;
        return (0, u.jsx)(s.in, {
          content: e.content,
          isBlogPostPage: !0,
          children: (0, u.jsxs)(a.e3, {
            className: (0, i.A)(r.G.wrapper.blogPages, r.G.page.blogPostPage),
            children: [
              (0, u.jsx)(f, {}),
              (0, u.jsx)(g, {}),
              (0, u.jsx)(x, { sidebar: e.sidebar, children: (0, u.jsx)(n, {}) })
            ]
          })
        });
      }
    },
    763: (e, n, t) => {
      t.d(n, { A: () => p });
      t(5528);
      var i = t(7286),
        a = t(2431),
        r = t(5215),
        s = t(2388);
      function l() {
        return (0, s.jsx)(a.A, {
          id: 'theme.contentVisibility.unlistedBanner.title',
          description: 'The unlisted content banner title',
          children: 'Unlisted page'
        });
      }
      function o() {
        return (0, s.jsx)(a.A, {
          id: 'theme.contentVisibility.unlistedBanner.message',
          description: 'The unlisted content banner message',
          children:
            'This page is unlisted. Search engines will not index it, and only users having a direct link can access it.'
        });
      }
      function c() {
        return (0, s.jsx)(r.A, {
          children: (0, s.jsx)('meta', { name: 'robots', content: 'noindex, nofollow' })
        });
      }
      function d() {
        return (0, s.jsx)(a.A, {
          id: 'theme.contentVisibility.draftBanner.title',
          description: 'The draft content banner title',
          children: 'Draft page'
        });
      }
      function u() {
        return (0, s.jsx)(a.A, {
          id: 'theme.contentVisibility.draftBanner.message',
          description: 'The draft content banner message',
          children:
            'This page is a draft. It will only be visible in dev and be excluded from the production build.'
        });
      }
      var m = t(2489),
        f = t(5887);
      function v(e) {
        var n = e.className;
        return (0, s.jsx)(f.A, {
          type: 'caution',
          title: (0, s.jsx)(d, {}),
          className: (0, i.A)(n, m.G.common.draftBanner),
          children: (0, s.jsx)(u, {})
        });
      }
      function g(e) {
        var n = e.className;
        return (0, s.jsx)(f.A, {
          type: 'caution',
          title: (0, s.jsx)(l, {}),
          className: (0, i.A)(n, m.G.common.unlistedBanner),
          children: (0, s.jsx)(o, {})
        });
      }
      function h(e) {
        return (0, s.jsxs)(s.Fragment, {
          children: [(0, s.jsx)(c, {}), (0, s.jsx)(g, Object.assign({}, e))]
        });
      }
      function p(e) {
        var n = e.metadata,
          t = n.unlisted,
          i = n.frontMatter;
        return (0, s.jsxs)(s.Fragment, {
          children: [(t || i.unlisted) && (0, s.jsx)(h, {}), i.draft && (0, s.jsx)(v, {})]
        });
      }
    },
    5232: (e, n, t) => {
      t.d(n, { A: () => u });
      var i = t(6562),
        a = (t(5528), t(7286)),
        r = t(1392);
      const s = { tableOfContents: 'tableOfContents_mIgf', docItemContainer: 'docItemContainer_Keui' };
      var l = t(2388),
        o = ['className'],
        c = 'table-of-contents__link toc-highlight',
        d = 'table-of-contents__link--active';
      function u(e) {
        var n = e.className,
          t = (0, i.A)(e, o);
        return (0, l.jsx)('div', {
          className: (0, a.A)(s.tableOfContents, 'thin-scrollbar', n),
          children: (0, l.jsx)(r.A, Object.assign({}, t, { linkClassName: c, linkActiveClassName: d }))
        });
      }
    },
    1392: (e, n, t) => {
      t.d(n, { A: () => x });
      var i = t(6562),
        a = t(5528),
        r = t(6624),
        s = ['parentIndex'];
      function l(e) {
        var n = e.map(function (e) {
            return Object.assign({}, e, { parentIndex: -1, children: [] });
          }),
          t = Array(7).fill(-1);
        n.forEach(function (e, n) {
          var i = t.slice(2, e.level);
          (e.parentIndex = Math.max.apply(Math, i)), (t[e.level] = n);
        });
        var a = [];
        return (
          n.forEach(function (e) {
            var t = e.parentIndex,
              r = (0, i.A)(e, s);
            t >= 0 ? n[t].children.push(r) : a.push(r);
          }),
          a
        );
      }
      function o(e) {
        var n = e.toc,
          t = e.minHeadingLevel,
          i = e.maxHeadingLevel;
        return n.flatMap(function (e) {
          var n = o({ toc: e.children, minHeadingLevel: t, maxHeadingLevel: i });
          return (function (e) {
            return e.level >= t && e.level <= i;
          })(e)
            ? [Object.assign({}, e, { children: n })]
            : n;
        });
      }
      function c(e) {
        var n = e.getBoundingClientRect();
        return n.top === n.bottom ? c(e.parentNode) : n;
      }
      function d(e, n) {
        var t,
          i,
          a = n.anchorTopOffset,
          r = e.find(function (e) {
            return c(e).top >= a;
          });
        return r
          ? (function (e) {
              return e.top > 0 && e.bottom < window.innerHeight / 2;
            })(c(r))
            ? r
            : null != (i = e[e.indexOf(r) - 1])
              ? i
              : null
          : null != (t = e[e.length - 1])
            ? t
            : null;
      }
      function u() {
        var e = (0, a.useRef)(0),
          n = (0, r.p)().navbar.hideOnScroll;
        return (
          (0, a.useEffect)(
            function () {
              e.current = n ? 0 : document.querySelector('.navbar').clientHeight;
            },
            [n]
          ),
          e
        );
      }
      function m(e) {
        var n = (0, a.useRef)(void 0),
          t = u();
        (0, a.useEffect)(
          function () {
            if (!e) return function () {};
            var i = e.linkClassName,
              a = e.linkActiveClassName,
              r = e.minHeadingLevel,
              s = e.maxHeadingLevel;
            function l() {
              var e = (function (e) {
                  return Array.from(document.getElementsByClassName(e));
                })(i),
                l = (function (e) {
                  for (var n = e.minHeadingLevel, t = e.maxHeadingLevel, i = [], a = n; a <= t; a += 1)
                    i.push('h' + a + '.anchor');
                  return Array.from(document.querySelectorAll(i.join()));
                })({ minHeadingLevel: r, maxHeadingLevel: s }),
                o = d(l, { anchorTopOffset: t.current }),
                c = e.find(function (e) {
                  return (
                    o &&
                    o.id ===
                      (function (e) {
                        return decodeURIComponent(e.href.substring(e.href.indexOf('#') + 1));
                      })(e)
                  );
                });
              e.forEach(function (e) {
                !(function (e, t) {
                  t
                    ? (n.current && n.current !== e && n.current.classList.remove(a),
                      e.classList.add(a),
                      (n.current = e))
                    : e.classList.remove(a);
                })(e, e === c);
              });
            }
            return (
              document.addEventListener('scroll', l),
              document.addEventListener('resize', l),
              l(),
              function () {
                document.removeEventListener('scroll', l), document.removeEventListener('resize', l);
              }
            );
          },
          [e, t]
        );
      }
      var f = t(4345),
        v = t(2388);
      function g(e) {
        var n = e.toc,
          t = e.className,
          i = e.linkClassName,
          a = e.isChild;
        return n.length
          ? (0, v.jsx)('ul', {
              className: a ? void 0 : t,
              children: n.map(function (e) {
                return (0, v.jsxs)(
                  'li',
                  {
                    children: [
                      (0, v.jsx)(f.A, {
                        to: '#' + e.id,
                        className: null != i ? i : void 0,
                        dangerouslySetInnerHTML: { __html: e.value }
                      }),
                      (0, v.jsx)(g, { isChild: !0, toc: e.children, className: t, linkClassName: i })
                    ]
                  },
                  e.id
                );
              })
            })
          : null;
      }
      const h = a.memo(g);
      var p = [
        'toc',
        'className',
        'linkClassName',
        'linkActiveClassName',
        'minHeadingLevel',
        'maxHeadingLevel'
      ];
      function x(e) {
        var n = e.toc,
          t = e.className,
          s = void 0 === t ? 'table-of-contents table-of-contents__left-border' : t,
          c = e.linkClassName,
          d = void 0 === c ? 'table-of-contents__link' : c,
          u = e.linkActiveClassName,
          f = void 0 === u ? void 0 : u,
          g = e.minHeadingLevel,
          x = e.maxHeadingLevel,
          b = (0, i.A)(e, p),
          j = (0, r.p)(),
          A = null != g ? g : j.tableOfContents.minHeadingLevel,
          L = null != x ? x : j.tableOfContents.maxHeadingLevel,
          N = (function (e) {
            var n = e.toc,
              t = e.minHeadingLevel,
              i = e.maxHeadingLevel;
            return (0, a.useMemo)(
              function () {
                return o({ toc: l(n), minHeadingLevel: t, maxHeadingLevel: i });
              },
              [n, t, i]
            );
          })({ toc: n, minHeadingLevel: A, maxHeadingLevel: L });
        return (
          m(
            (0, a.useMemo)(
              function () {
                if (d && f)
                  return { linkClassName: d, linkActiveClassName: f, minHeadingLevel: A, maxHeadingLevel: L };
              },
              [d, f, A, L]
            )
          ),
          (0, v.jsx)(h, Object.assign({ toc: N, className: s, linkClassName: d }, b))
        );
      }
    }
  }
]);
