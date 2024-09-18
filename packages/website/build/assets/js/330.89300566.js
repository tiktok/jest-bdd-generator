'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [330],
  {
    8864: (e, t, a) => {
      a.d(t, {
        in: () => c,
        OU: () => y,
        Ki: () => k,
        kJ: () => f,
        x: () => l,
        e7: () => u,
        J_: () => x,
        Gx: () => A
      });
      var r = a(5528),
        n = a(6457),
        s = a(4734),
        i = a(2388);
      function l() {
        var e,
          t = (0, s.A)(),
          a = null == t || null == (e = t.data) ? void 0 : e.blogMetadata;
        if (!a)
          throw new Error(
            "useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context"
          );
        return a;
      }
      var o = r.createContext(null);
      function c(e) {
        var t = e.children,
          a = e.content,
          n = e.isBlogPostPage,
          s = (function (e) {
            var t = e.content,
              a = e.isBlogPostPage;
            return (0, r.useMemo)(
              function () {
                return {
                  metadata: t.metadata,
                  frontMatter: t.frontMatter,
                  assets: t.assets,
                  toc: t.toc,
                  isBlogPostPage: a
                };
              },
              [t, a]
            );
          })({ content: a, isBlogPostPage: void 0 !== n && n });
        return (0, i.jsx)(o.Provider, { value: s, children: t });
      }
      function u() {
        var e = (0, r.useContext)(o);
        if (null === e) throw new n.dV('BlogPostProvider');
        return e;
      }
      var m = a(6942),
        d = a(341),
        h = function (e) {
          return new Date(e).toISOString();
        };
      function g(e) {
        var t = e.map(p);
        return { author: 1 === t.length ? t[0] : t };
      }
      function v(e, t, a) {
        return e
          ? {
              image:
                ((r = { imageUrl: t(e, { absolute: !0 }), caption: 'title image for the blog post: ' + a }),
                (n = r.imageUrl),
                (s = r.caption),
                { '@type': 'ImageObject', '@id': n, url: n, contentUrl: n, caption: s })
            }
          : {};
        var r, n, s;
      }
      function f(e) {
        var t = (0, d.A)().siteConfig,
          a = (0, m.hH)().withBaseUrl,
          r = e.metadata,
          n = r.blogDescription,
          s = r.blogTitle,
          i = r.permalink,
          l = '' + t.url + i;
        return {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': l,
          mainEntityOfPage: l,
          headline: s,
          description: n,
          blogPost: e.items.map(function (e) {
            return (function (e, t, a) {
              var r,
                n,
                s = e.assets,
                i = e.frontMatter,
                l = e.metadata,
                o = l.date,
                c = l.title,
                u = l.description,
                m = l.lastUpdatedAt,
                d = null != (r = s.image) ? r : i.image,
                f = null != (n = i.keywords) ? n : [],
                x = '' + t.url + l.permalink,
                p = m ? h(m) : void 0;
              return Object.assign(
                {
                  '@type': 'BlogPosting',
                  '@id': x,
                  mainEntityOfPage: x,
                  url: x,
                  headline: c,
                  name: c,
                  description: u,
                  datePublished: o
                },
                p ? { dateModified: p } : {},
                g(l.authors),
                v(d, a, c),
                f ? { keywords: f } : {}
              );
            })(e.content, t, a);
          })
        };
      }
      function x() {
        var e,
          t,
          a = l(),
          r = u(),
          n = r.assets,
          s = r.metadata,
          i = (0, d.A)().siteConfig,
          o = (0, m.hH)().withBaseUrl,
          c = s.date,
          f = s.title,
          x = s.description,
          p = s.frontMatter,
          j = s.lastUpdatedAt,
          b = null != (e = n.image) ? e : p.image,
          w = null != (t = p.keywords) ? t : [],
          N = j ? h(j) : void 0,
          A = '' + i.url + s.permalink;
        return Object.assign(
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': A,
            mainEntityOfPage: A,
            url: A,
            headline: f,
            name: f,
            description: x,
            datePublished: c
          },
          N ? { dateModified: N } : {},
          g(s.authors),
          v(b, o, f),
          w ? { keywords: w } : {},
          { isPartOf: { '@type': 'Blog', '@id': '' + i.url + a.blogBasePath, name: a.blogTitle } }
        );
      }
      function p(e) {
        return Object.assign(
          { '@type': 'Person' },
          e.name ? { name: e.name } : {},
          e.title ? { description: e.title } : {},
          e.url ? { url: e.url } : {},
          e.email ? { email: e.email } : {},
          e.imageURL ? { image: e.imageURL } : {}
        );
      }
      var j = a(123),
        b = a(4345),
        w = a(9756),
        N = a(2487);
      function A(e) {
        var t = (0, j.zy)().pathname;
        return (0, r.useMemo)(
          function () {
            return e.filter(function (e) {
              return (function (e, t) {
                return !(e.unlisted && !(0, N.ys)(e.permalink, t));
              })(e, t);
            });
          },
          [e, t]
        );
      }
      function k(e) {
        var t = (0, w.$z)(e, function (e) {
            return '' + new Date(e.date).getFullYear();
          }),
          a = Object.entries(t);
        return a.reverse(), a;
      }
      function y(e) {
        var t = e.items,
          a = e.ulClassName,
          r = e.liClassName,
          n = e.linkClassName,
          s = e.linkActiveClassName;
        return (0, i.jsx)('ul', {
          className: a,
          children: t.map(function (e) {
            return (0, i.jsx)(
              'li',
              {
                className: r,
                children: (0, i.jsx)(b.A, {
                  isNavLink: !0,
                  to: e.permalink,
                  className: n,
                  activeClassName: s,
                  children: e.title
                })
              },
              e.permalink
            );
          })
        });
      }
    },
    5440: (e, t, a) => {
      a.d(t, { A: () => U });
      var r = a(6562),
        n = a(5528),
        s = a(7286),
        i = a(2055),
        l = a(3867),
        o = a(2431),
        c = a(8864),
        u = a(6624),
        m = a(8528),
        d = a(2388);
      function h(e) {
        var t = e.year,
          a = e.yearGroupHeadingClassName,
          r = e.children;
        return (0, d.jsxs)('div', {
          role: 'group',
          children: [(0, d.jsx)(m.A, { as: 'h3', className: a, children: t }), r]
        });
      }
      function g(e) {
        var t = e.items,
          a = e.yearGroupHeadingClassName,
          r = e.ListComponent;
        if ((0, u.p)().blog.sidebar.groupByYear) {
          var n = (0, c.Ki)(t);
          return (0, d.jsx)(d.Fragment, {
            children: n.map(function (e) {
              var t = e[0],
                n = e[1];
              return (0, d.jsx)(
                h,
                { year: t, yearGroupHeadingClassName: a, children: (0, d.jsx)(r, { items: n }) },
                t
              );
            })
          });
        }
        return (0, d.jsx)(r, { items: t });
      }
      const v = (0, n.memo)(g),
        f = 'sidebar_FJcF',
        x = 'sidebarItemTitle_QtPV',
        p = 'sidebarItemList_y2CM',
        j = 'sidebarItem_Xfo9',
        b = 'sidebarItemLink_xa5p',
        w = 'sidebarItemLinkActive_h9bN',
        N = 'yearGroupHeading_lcVz';
      var A = function (e) {
        var t = e.items;
        return (0, d.jsx)(c.OU, {
          items: t,
          ulClassName: (0, s.A)(p, 'clean-list'),
          liClassName: j,
          linkClassName: b,
          linkActiveClassName: w
        });
      };
      function k(e) {
        var t = e.sidebar,
          a = (0, c.Gx)(t.items);
        return (0, d.jsx)('aside', {
          className: 'col col--3',
          children: (0, d.jsxs)('nav', {
            className: (0, s.A)(f, 'thin-scrollbar'),
            'aria-label': (0, o.T)({
              id: 'theme.blog.sidebar.navAriaLabel',
              message: 'Blog recent posts navigation',
              description: 'The ARIA label for recent posts in the blog sidebar'
            }),
            children: [
              (0, d.jsx)('div', { className: (0, s.A)(x, 'margin-bottom--md'), children: t.title }),
              (0, d.jsx)(v, { items: a, ListComponent: A, yearGroupHeadingClassName: N })
            ]
          })
        });
      }
      const y = (0, n.memo)(k);
      var M = a(2338);
      const C = { yearGroupHeading: 'yearGroupHeading_ky9X' };
      var _ = function (e) {
        var t = e.items;
        return (0, d.jsx)(c.OU, {
          items: t,
          ulClassName: 'menu__list',
          liClassName: 'menu__list-item',
          linkClassName: 'menu__link',
          linkActiveClassName: 'menu__link--active'
        });
      };
      function P(e) {
        var t = e.sidebar,
          a = (0, c.Gx)(t.items);
        return (0, d.jsx)(v, { items: a, ListComponent: _, yearGroupHeadingClassName: C.yearGroupHeading });
      }
      function O(e) {
        return (0, d.jsx)(M.GX, { component: P, props: e });
      }
      const B = (0, n.memo)(O);
      function L(e) {
        var t = e.sidebar,
          a = (0, l.l)();
        return null != t && t.items.length
          ? 'mobile' === a
            ? (0, d.jsx)(B, { sidebar: t })
            : (0, d.jsx)(y, { sidebar: t })
          : null;
      }
      var T = ['sidebar', 'toc', 'children'];
      function U(e) {
        var t = e.sidebar,
          a = e.toc,
          n = e.children,
          l = (0, r.A)(e, T),
          o = t && t.items.length > 0;
        return (0, d.jsx)(
          i.A,
          Object.assign({}, l, {
            children: (0, d.jsx)('div', {
              className: 'container margin-vert--lg',
              children: (0, d.jsxs)('div', {
                className: 'row',
                children: [
                  (0, d.jsx)(L, { sidebar: t }),
                  (0, d.jsx)('main', {
                    className: (0, s.A)('col', { 'col--7': o, 'col--9 col--offset-1': !o }),
                    children: n
                  }),
                  a && (0, d.jsx)('div', { className: 'col col--2', children: a })
                ]
              })
            })
          })
        );
      }
    },
    4565: (e, t, a) => {
      a.d(t, { A: () => W });
      var r = a(5528),
        n = a(7286),
        s = a(8864),
        i = a(2388);
      function l(e) {
        var t = e.children,
          a = e.className;
        return (0, i.jsx)('article', { className: a, children: t });
      }
      var o = a(4345);
      const c = { title: 'title_hJ7a' };
      function u(e) {
        var t = e.className,
          a = (0, s.e7)(),
          r = a.metadata,
          l = a.isBlogPostPage,
          u = r.permalink,
          m = r.title,
          d = l ? 'h1' : 'h2';
        return (0, i.jsx)(d, {
          className: (0, n.A)(c.title, t),
          children: l ? m : (0, i.jsx)(o.A, { to: u, children: m })
        });
      }
      var m = a(2431),
        d = a(341),
        h = ['zero', 'one', 'two', 'few', 'many', 'other'];
      function g(e) {
        return h.filter(function (t) {
          return e.includes(t);
        });
      }
      var v = {
        locale: 'en',
        pluralForms: g(['one', 'other']),
        select: function (e) {
          return 1 === e ? 'one' : 'other';
        }
      };
      function f() {
        var e = (0, d.A)().i18n.currentLocale;
        return (0, r.useMemo)(
          function () {
            try {
              return (
                (t = e),
                (a = new Intl.PluralRules(t)),
                {
                  locale: t,
                  pluralForms: g(a.resolvedOptions().pluralCategories),
                  select: function (e) {
                    return a.select(e);
                  }
                }
              );
            } catch (r) {
              return (
                console.error(
                  'Failed to use Intl.PluralRules for locale "' +
                    e +
                    '".\nDocusaurus will fallback to the default (English) implementation.\nError: ' +
                    r.message +
                    '\n'
                ),
                v
              );
            }
            var t, a;
          },
          [e]
        );
      }
      function x() {
        var e = f();
        return {
          selectMessage: function (t, a) {
            return (function (e, t, a) {
              var r = e.split('|');
              if (1 === r.length) return r[0];
              r.length > a.pluralForms.length &&
                console.error(
                  'For locale=' +
                    a.locale +
                    ', a maximum of ' +
                    a.pluralForms.length +
                    ' plural forms are expected (' +
                    a.pluralForms.join(',') +
                    '), but the message contains ' +
                    r.length +
                    ': ' +
                    e
                );
              var n = a.select(t),
                s = a.pluralForms.indexOf(n);
              return r[Math.min(s, r.length - 1)];
            })(a, t, e);
          }
        };
      }
      var p = a(5560);
      const j = { container: 'container_UMZs' };
      function b(e) {
        var t,
          a = e.readingTime,
          r =
            ((t = x().selectMessage),
            function (e) {
              var a = Math.ceil(e);
              return t(
                a,
                (0, m.T)(
                  {
                    id: 'theme.blog.post.readingTime.plurals',
                    description:
                      'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
                    message: 'One min read|{readingTime} min read'
                  },
                  { readingTime: a }
                )
              );
            });
        return (0, i.jsx)(i.Fragment, { children: r(a) });
      }
      function w(e) {
        var t = e.date,
          a = e.formattedDate;
        return (0, i.jsx)('time', { dateTime: t, children: a });
      }
      function N() {
        return (0, i.jsx)(i.Fragment, { children: ' \xb7 ' });
      }
      function A(e) {
        var t,
          a = e.className,
          r = (0, s.e7)().metadata,
          l = r.date,
          o = r.readingTime,
          c = (0, p.i)({ day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
        return (0, i.jsxs)('div', {
          className: (0, n.A)(j.container, 'margin-vert--md', a),
          children: [
            (0, i.jsx)(w, { date: l, formattedDate: ((t = l), c.format(new Date(t))) }),
            void 0 !== o &&
              (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)(N, {}), (0, i.jsx)(b, { readingTime: o })] })
          ]
        });
      }
      const k = 'githubSvg_ZSDa';
      const y = 'xSvg_Zl8C';
      const M = function (e) {
          return (0, i.jsxs)(
            'svg',
            Object.assign(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '1em',
                height: '1em',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
              },
              e,
              {
                children: [
                  (0, i.jsx)('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
                  (0, i.jsx)('path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' }),
                  (0, i.jsx)('path', { d: 'M3.6 9h16.8' }),
                  (0, i.jsx)('path', { d: 'M3.6 15h16.8' }),
                  (0, i.jsx)('path', { d: 'M11.5 3a17 17 0 0 0 0 18' }),
                  (0, i.jsx)('path', { d: 'M12.5 3a17 17 0 0 1 0 18' })
                ]
              }
            )
          );
        },
        C = {
          authorSocials: 'authorSocials_j13y',
          authorSocialLink: 'authorSocialLink_DKMT',
          authorSocialIcon: 'authorSocialIcon_h0nX'
        };
      var _ = {
        twitter: {
          Icon: function (e) {
            return (0, i.jsx)(
              'svg',
              Object.assign(
                {
                  viewBox: '0 0 256 209',
                  width: '1em',
                  height: '1em',
                  xmlns: 'http://www.w3.org/2000/svg',
                  preserveAspectRatio: 'xMidYMid'
                },
                e,
                {
                  children: (0, i.jsx)('path', {
                    d: 'M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45',
                    fill: '#55acee'
                  })
                }
              )
            );
          },
          label: 'Twitter'
        },
        github: {
          Icon: function (e) {
            return (0, i.jsx)(
              'svg',
              Object.assign({ viewBox: '0 0 256 250', width: '1em', height: '1em' }, e, {
                className: (0, n.A)(e.className, k),
                xmlns: 'http://www.w3.org/2000/svg',
                style: { '--dark': '#000', '--light': '#fff' },
                preserveAspectRatio: 'xMidYMid',
                children: (0, i.jsx)('path', {
                  d: 'M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z'
                })
              })
            );
          },
          label: 'GitHub'
        },
        stackoverflow: {
          Icon: function (e) {
            return (0, i.jsxs)(
              'svg',
              Object.assign(
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  viewBox: '0 0 169.61 200',
                  width: '1em',
                  height: '1em'
                },
                e,
                {
                  children: [
                    (0, i.jsx)('path', {
                      d: 'M140.44 178.38v-48.65h21.61V200H0v-70.27h21.61v48.65z',
                      fill: '#bcbbbb'
                    }),
                    (0, i.jsx)('path', {
                      d: 'M124.24 140.54l4.32-16.22-86.97-17.83-3.78 17.83zM49.7 82.16L130.72 120l7.56-16.22-81.02-37.83zm22.68-40l68.06 57.3 11.35-13.51-68.6-57.3-11.35 13.51zM116.14 0l-14.59 10.81 53.48 71.89 14.58-10.81zM37.81 162.16h86.43v-16.21H37.81z',
                      fill: '#f48024'
                    })
                  ]
                }
              )
            );
          },
          label: 'Stack Overflow'
        },
        linkedin: {
          Icon: function (e) {
            return (0, i.jsx)(
              'svg',
              Object.assign(
                {
                  width: '1em',
                  height: '1em',
                  xmlns: 'http://www.w3.org/2000/svg',
                  preserveAspectRatio: 'xMidYMid',
                  viewBox: '0 0 256 256'
                },
                e,
                {
                  children: (0, i.jsx)('path', {
                    d: 'M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453',
                    fill: '#0A66C2'
                  })
                }
              )
            );
          },
          label: 'LinkedIn'
        },
        x: {
          Icon: function (e) {
            return (0, i.jsx)(
              'svg',
              Object.assign(
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '1em',
                  height: '1em',
                  fill: 'none',
                  viewBox: '0 0 1200 1227'
                },
                e,
                {
                  className: (0, n.A)(e.className, y),
                  style: { '--dark': '#000', '--light': '#fff' },
                  children: (0, i.jsx)('path', {
                    d: 'M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z'
                  })
                }
              )
            );
          },
          label: 'X'
        }
      };
      function P(e) {
        var t,
          a,
          r = e.platform,
          s = e.link,
          l = null != (a = _[(t = r)]) ? a : { Icon: M, label: t },
          c = l.Icon,
          u = l.label;
        return (0, i.jsx)(o.A, {
          className: C.authorSocialLink,
          href: s,
          title: u,
          children: (0, i.jsx)(c, { className: (0, n.A)(C.authorSocialLink) })
        });
      }
      function O(e) {
        var t,
          a = e.author,
          r = Object.entries(null != (t = a.socials) ? t : {});
        return (0, i.jsx)('div', {
          className: C.authorSocials,
          children: r.map(function (e) {
            var t = e[0],
              a = e[1];
            return (0, i.jsx)(P, { platform: t, link: a }, t);
          })
        });
      }
      var B = a(8528);
      const L = {
        authorImage: 'authorImage_P4u8',
        'author-as-h1': 'author-as-h1_6KK8',
        'author-as-h2': 'author-as-h2_Ynmw',
        authorDetails: 'authorDetails_ekoD',
        authorName: 'authorName_ciJx',
        authorTitle: 'authorTitle_Hwis',
        authorBlogPostCount: 'authorBlogPostCount_LjqH'
      };
      function T(e) {
        return e.href
          ? (0, i.jsx)(o.A, Object.assign({}, e))
          : (0, i.jsx)(i.Fragment, { children: e.children });
      }
      function U(e) {
        var t = e.title;
        return (0, i.jsx)('small', { className: L.authorTitle, title: t, children: t });
      }
      function I(e) {
        var t = e.name,
          a = e.as;
        return a
          ? (0, i.jsx)(B.A, { as: a, className: L.authorName, children: t })
          : (0, i.jsx)('span', { className: L.authorName, children: t });
      }
      function H(e) {
        var t = e.count;
        return (0, i.jsx)('span', { className: (0, n.A)(L.authorBlogPostCount), children: t });
      }
      function R(e) {
        var t = e.as,
          a = e.author,
          r = e.className,
          s = e.count,
          l = a.name,
          o = a.title,
          c = a.url,
          u = a.imageURL,
          m = a.email,
          d = a.page,
          h = (null == d ? void 0 : d.permalink) || c || (m && 'mailto:' + m) || void 0;
        return (0, i.jsxs)('div', {
          className: (0, n.A)('avatar margin-bottom--sm', r, L['author-as-' + t]),
          children: [
            u &&
              (0, i.jsx)(T, {
                href: h,
                className: 'avatar__photo-link',
                children: (0, i.jsx)('img', {
                  className: (0, n.A)('avatar__photo', L.authorImage),
                  src: u,
                  alt: l
                })
              }),
            (l || o) &&
              (0, i.jsxs)('div', {
                className: (0, n.A)('avatar__intro', L.authorDetails),
                children: [
                  (0, i.jsxs)('div', {
                    className: 'avatar__name',
                    children: [
                      l && (0, i.jsx)(T, { href: h, children: (0, i.jsx)(I, { name: l, as: t }) }),
                      s && (0, i.jsx)(H, { count: s })
                    ]
                  }),
                  !!o && (0, i.jsx)(U, { title: o }),
                  (0, i.jsx)(O, { author: a })
                ]
              })
          ]
        });
      }
      const F = {
        authorCol: 'authorCol_ucQ6',
        imageOnlyAuthorRow: 'imageOnlyAuthorRow_hc5E',
        imageOnlyAuthorCol: 'imageOnlyAuthorCol_AR9m'
      };
      function G(e) {
        var t = e.className,
          a = (0, s.e7)(),
          r = a.metadata.authors,
          l = a.assets;
        if (0 === r.length) return null;
        var o = r.every(function (e) {
            return !e.name;
          }),
          c = 1 === r.length;
        return (0, i.jsx)('div', {
          className: (0, n.A)('margin-top--md margin-bottom--sm', o ? F.imageOnlyAuthorRow : 'row', t),
          children: r.map(function (e, t) {
            var a;
            return (0, i.jsx)(
              'div',
              {
                className: (0, n.A)(
                  !o && (c ? 'col col--12' : 'col col--6'),
                  o ? F.imageOnlyAuthorCol : F.authorCol
                ),
                children: (0, i.jsx)(R, {
                  author: Object.assign({}, e, {
                    imageURL: null != (a = l.authorsImageUrls[t]) ? a : e.imageURL
                  })
                })
              },
              t
            );
          })
        });
      }
      function Z() {
        return (0, i.jsxs)('header', { children: [(0, i.jsx)(u, {}), (0, i.jsx)(A, {}), (0, i.jsx)(G, {})] });
      }
      var S = a(2245),
        D = a(5505);
      function z(e) {
        var t = e.children,
          a = e.className,
          r = (0, s.e7)().isBlogPostPage;
        return (0, i.jsx)('div', {
          id: r ? S.LU : void 0,
          className: (0, n.A)('markdown', a),
          children: (0, i.jsx)(D.A, { children: t })
        });
      }
      var E = a(2489),
        V = a(2260),
        Y = a(9004),
        J = a(6562),
        K = ['blogPostTitle'];
      function X() {
        return (0, i.jsx)('b', {
          children: (0, i.jsx)(m.A, {
            id: 'theme.blog.post.readMore',
            description: 'The label used in blog post item excerpts to link to full blog posts',
            children: 'Read more'
          })
        });
      }
      function Q(e) {
        var t = e.blogPostTitle,
          a = (0, J.A)(e, K);
        return (0, i.jsx)(
          o.A,
          Object.assign(
            {
              'aria-label': (0, m.T)(
                {
                  message: 'Read more about {title}',
                  id: 'theme.blog.post.readMoreLabel',
                  description: 'The ARIA label for the link to full blog posts from excerpts'
                },
                { title: t }
              )
            },
            a,
            { children: (0, i.jsx)(X, {}) }
          )
        );
      }
      function q() {
        var e = (0, s.e7)(),
          t = e.metadata,
          a = e.isBlogPostPage,
          r = t.tags,
          l = t.title,
          o = t.editUrl,
          c = t.hasTruncateMarker,
          u = t.lastUpdatedBy,
          m = t.lastUpdatedAt,
          d = !a && c,
          h = r.length > 0;
        if (!(h || d || o)) return null;
        if (a) {
          var g = !!(o || m || u);
          return (0, i.jsxs)('footer', {
            className: 'docusaurus-mt-lg',
            children: [
              h &&
                (0, i.jsx)('div', {
                  className: (0, n.A)('row', 'margin-top--sm', E.G.blog.blogFooterEditMetaRow),
                  children: (0, i.jsx)('div', { className: 'col', children: (0, i.jsx)(Y.A, { tags: r }) })
                }),
              g &&
                (0, i.jsx)(V.A, {
                  className: (0, n.A)('margin-top--sm', E.G.blog.blogFooterEditMetaRow),
                  editUrl: o,
                  lastUpdatedAt: m,
                  lastUpdatedBy: u
                })
            ]
          });
        }
        return (0, i.jsxs)('footer', {
          className: 'row docusaurus-mt-lg',
          children: [
            h &&
              (0, i.jsx)('div', {
                className: (0, n.A)('col', { 'col--9': d }),
                children: (0, i.jsx)(Y.A, { tags: r })
              }),
            d &&
              (0, i.jsx)('div', {
                className: (0, n.A)('col text--right', { 'col--3': h }),
                children: (0, i.jsx)(Q, { blogPostTitle: l, to: t.permalink })
              })
          ]
        });
      }
      function W(e) {
        var t = e.children,
          a = e.className,
          r = (0, s.e7)().isBlogPostPage ? void 0 : 'margin-bottom--xl';
        return (0, i.jsxs)(l, {
          className: (0, n.A)(r, a),
          children: [(0, i.jsx)(Z, {}), (0, i.jsx)(z, { children: t }), (0, i.jsx)(q, {})]
        });
      }
    }
  }
]);
