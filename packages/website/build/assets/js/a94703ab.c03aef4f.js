'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [48],
  {
    793: (e, t, n) => {
      n.r(t), n.d(t, { default: () => fe });
      var a = n(5528),
        i = n(7286),
        o = n(7960),
        r = n(2489),
        s = n(4314),
        l = n(8215),
        c = n(2431),
        d = n(1042),
        u = n(1908);
      const m = { backToTopButton: 'backToTopButton_elWS', backToTopButtonShow: 'backToTopButtonShow_V9c6' };
      var b = n(2388);
      function h() {
        var e = (function (e) {
            var t = e.threshold,
              n = (0, a.useState)(!1),
              i = n[0],
              o = n[1],
              r = (0, a.useRef)(!1),
              s = (0, d.gk)(),
              l = s.startScroll,
              c = s.cancelScroll;
            return (
              (0, d.Mq)(function (e, n) {
                var a = e.scrollY,
                  i = null == n ? void 0 : n.scrollY;
                i &&
                  (r.current
                    ? (r.current = !1)
                    : a >= i
                      ? (c(), o(!1))
                      : a < t
                        ? o(!1)
                        : a + window.innerHeight < document.documentElement.scrollHeight && o(!0));
              }),
              (0, u.$)(function (e) {
                e.location.hash && ((r.current = !0), o(!1));
              }),
              {
                shown: i,
                scrollToTop: function () {
                  return l(0);
                }
              }
            );
          })({ threshold: 300 }),
          t = e.shown,
          n = e.scrollToTop;
        return (0, b.jsx)('button', {
          'aria-label': (0, c.T)({
            id: 'theme.BackToTopButton.buttonAriaLabel',
            message: 'Scroll back to top',
            description: 'The ARIA label for the back to top button'
          }),
          className: (0, i.A)(
            'clean-btn',
            r.G.common.backToTopButton,
            m.backToTopButton,
            t && m.backToTopButtonShow
          ),
          type: 'button',
          onClick: n
        });
      }
      var p = n(3759),
        x = n(123),
        v = n(3867),
        f = n(6624),
        j = n(9790);
      function g(e) {
        return (0, b.jsx)(
          'svg',
          Object.assign({ width: '20', height: '20', 'aria-hidden': 'true' }, e, {
            children: (0, b.jsxs)('g', {
              fill: '#7a7a7a',
              children: [
                (0, b.jsx)('path', {
                  d: 'M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0'
                }),
                (0, b.jsx)('path', {
                  d: 'M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0'
                })
              ]
            })
          })
        );
      }
      const A = {
        collapseSidebarButton: 'collapseSidebarButton_kNW_',
        collapseSidebarButtonIcon: 'collapseSidebarButtonIcon_LuOQ'
      };
      function _(e) {
        var t = e.onClick;
        return (0, b.jsx)('button', {
          type: 'button',
          title: (0, c.T)({
            id: 'theme.docs.sidebar.collapseButtonTitle',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar'
          }),
          'aria-label': (0, c.T)({
            id: 'theme.docs.sidebar.collapseButtonAriaLabel',
            message: 'Collapse sidebar',
            description: 'The title attribute for collapse button of doc sidebar'
          }),
          className: (0, i.A)('button button--secondary button--outline', A.collapseSidebarButton),
          onClick: t,
          children: (0, b.jsx)(g, { className: A.collapseSidebarButtonIcon })
        });
      }
      var C = n(9071),
        k = n(6562),
        S = n(6457),
        T = Symbol('EmptyContext'),
        I = a.createContext(T);
      function N(e) {
        var t = e.children,
          n = (0, a.useState)(null),
          i = n[0],
          o = n[1],
          r = (0, a.useMemo)(
            function () {
              return { expandedItem: i, setExpandedItem: o };
            },
            [i]
          );
        return (0, b.jsx)(I.Provider, { value: r, children: t });
      }
      var B = n(5892),
        y = n(2487),
        w = n(4345),
        L = n(4616),
        E = ['item', 'onItemClick', 'activePath', 'level', 'index'];
      function H(e) {
        var t = e.collapsed,
          n = e.categoryLabel,
          a = e.onClick;
        return (0, b.jsx)('button', {
          'aria-label': t
            ? (0, c.T)(
                {
                  id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                  message: "Expand sidebar category '{label}'",
                  description: 'The ARIA label to expand the sidebar category'
                },
                { label: n }
              )
            : (0, c.T)(
                {
                  id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                  message: "Collapse sidebar category '{label}'",
                  description: 'The ARIA label to collapse the sidebar category'
                },
                { label: n }
              ),
          'aria-expanded': !t,
          type: 'button',
          className: 'clean-btn menu__caret',
          onClick: a
        });
      }
      function M(e) {
        var t = e.item,
          n = e.onItemClick,
          o = e.activePath,
          l = e.level,
          c = e.index,
          d = (0, k.A)(e, E),
          u = t.items,
          m = t.label,
          h = t.collapsible,
          p = t.className,
          x = t.href,
          v = (0, f.p)().docs.sidebar.autoCollapseCategories,
          j = (function (e) {
            var t = (0, L.A)();
            return (0, a.useMemo)(
              function () {
                return e.href && !e.linkUnlisted ? e.href : !t && e.collapsible ? (0, s.Nr)(e) : void 0;
              },
              [e, t]
            );
          })(t),
          g = (0, s.w8)(t, o),
          A = (0, y.ys)(x, o),
          _ = (0, B.u)({
            initialState: function () {
              return !!h && !g && t.collapsed;
            }
          }),
          C = _.collapsed,
          N = _.setCollapsed,
          M = (function () {
            var e = (0, a.useContext)(I);
            if (e === T) throw new S.dV('DocSidebarItemsExpandedStateProvider');
            return e;
          })(),
          W = M.expandedItem,
          O = M.setExpandedItem,
          G = function (e) {
            void 0 === e && (e = !C), O(e ? null : c), N(e);
          };
        return (
          (function (e) {
            var t = e.isActive,
              n = e.collapsed,
              i = e.updateCollapsed,
              o = (0, S.ZC)(t);
            (0, a.useEffect)(
              function () {
                t && !o && n && i(!1);
              },
              [t, o, n, i]
            );
          })({ isActive: g, collapsed: C, updateCollapsed: G }),
          (0, a.useEffect)(
            function () {
              h && null != W && W !== c && v && N(!0);
            },
            [h, W, c, N, v]
          ),
          (0, b.jsxs)('li', {
            className: (0, i.A)(
              r.G.docs.docSidebarItemCategory,
              r.G.docs.docSidebarItemCategoryLevel(l),
              'menu__list-item',
              { 'menu__list-item--collapsed': C },
              p
            ),
            children: [
              (0, b.jsxs)('div', {
                className: (0, i.A)('menu__list-item-collapsible', {
                  'menu__list-item-collapsible--active': A
                }),
                children: [
                  (0, b.jsx)(
                    w.A,
                    Object.assign(
                      {
                        className: (0, i.A)('menu__link', {
                          'menu__link--sublist': h,
                          'menu__link--sublist-caret': !x && h,
                          'menu__link--active': g
                        }),
                        onClick: h
                          ? function (e) {
                              null == n || n(t), x ? G(!1) : (e.preventDefault(), G());
                            }
                          : function () {
                              null == n || n(t);
                            },
                        'aria-current': A ? 'page' : void 0,
                        role: h && !x ? 'button' : void 0,
                        'aria-expanded': h && !x ? !C : void 0,
                        href: h ? (null != j ? j : '#') : j
                      },
                      d,
                      { children: m }
                    )
                  ),
                  x &&
                    h &&
                    (0, b.jsx)(H, {
                      collapsed: C,
                      categoryLabel: m,
                      onClick: function (e) {
                        e.preventDefault(), G();
                      }
                    })
                ]
              }),
              (0, b.jsx)(B.N, {
                lazy: !0,
                as: 'ul',
                className: 'menu__list',
                collapsed: C,
                children: (0, b.jsx)(q, {
                  items: u,
                  tabIndex: C ? -1 : 0,
                  onItemClick: n,
                  activePath: o,
                  level: l + 1
                })
              })
            ]
          })
        );
      }
      var W = n(7759),
        O = n(3225);
      const G = { menuExternalLink: 'menuExternalLink_GB5s' };
      var P = ['item', 'onItemClick', 'activePath', 'level', 'index'];
      function R(e) {
        var t = e.item,
          n = e.onItemClick,
          a = e.activePath,
          o = e.level,
          l = (e.index, (0, k.A)(e, P)),
          c = t.href,
          d = t.label,
          u = t.className,
          m = t.autoAddBaseUrl,
          h = (0, s.w8)(t, a),
          p = (0, W.A)(c);
        return (0, b.jsx)(
          'li',
          {
            className: (0, i.A)(
              r.G.docs.docSidebarItemLink,
              r.G.docs.docSidebarItemLinkLevel(o),
              'menu__list-item',
              u
            ),
            children: (0, b.jsxs)(
              w.A,
              Object.assign(
                {
                  className: (0, i.A)('menu__link', !p && G.menuExternalLink, { 'menu__link--active': h }),
                  autoAddBaseUrl: m,
                  'aria-current': h ? 'page' : void 0,
                  to: c
                },
                p && {
                  onClick: n
                    ? function () {
                        return n(t);
                      }
                    : void 0
                },
                l,
                { children: [d, !p && (0, b.jsx)(O.A, {})] }
              )
            )
          },
          d
        );
      }
      const D = { menuHtmlItem: 'menuHtmlItem__WWx' };
      function F(e) {
        var t = e.item,
          n = e.level,
          a = e.index,
          o = t.value,
          s = t.defaultStyle,
          l = t.className;
        return (0, b.jsx)(
          'li',
          {
            className: (0, i.A)(
              r.G.docs.docSidebarItemLink,
              r.G.docs.docSidebarItemLinkLevel(n),
              s && [D.menuHtmlItem, 'menu__list-item'],
              l
            ),
            dangerouslySetInnerHTML: { __html: o }
          },
          a
        );
      }
      var V = ['item'];
      function z(e) {
        var t = e.item,
          n = (0, k.A)(e, V);
        switch (t.type) {
          case 'category':
            return (0, b.jsx)(M, Object.assign({ item: t }, n));
          case 'html':
            return (0, b.jsx)(F, Object.assign({ item: t }, n));
          default:
            return (0, b.jsx)(R, Object.assign({ item: t }, n));
        }
      }
      var U = ['items'];
      function Y(e) {
        var t = e.items,
          n = (0, k.A)(e, U),
          a = (0, s.Y)(t, n.activePath);
        return (0, b.jsx)(N, {
          children: a.map(function (e, t) {
            return (0, b.jsx)(z, Object.assign({ item: e, index: t }, n), t);
          })
        });
      }
      const q = (0, a.memo)(Y),
        J = { menu: 'menu_vgZw', menuWithAnnouncementBar: 'menuWithAnnouncementBar_cH_b' };
      function Z(e) {
        var t = e.path,
          n = e.sidebar,
          o = e.className,
          s = (function () {
            var e = (0, C.M)().isActive,
              t = (0, a.useState)(e),
              n = t[0],
              i = t[1];
            return (
              (0, d.Mq)(
                function (t) {
                  var n = t.scrollY;
                  e && i(0 === n);
                },
                [e]
              ),
              e && n
            );
          })();
        return (0, b.jsx)('nav', {
          'aria-label': (0, c.T)({
            id: 'theme.docs.sidebar.navAriaLabel',
            message: 'Docs sidebar',
            description: 'The ARIA label for the sidebar navigation'
          }),
          className: (0, i.A)('menu thin-scrollbar', J.menu, s && J.menuWithAnnouncementBar, o),
          children: (0, b.jsx)('ul', {
            className: (0, i.A)(r.G.docs.docSidebarMenu, 'menu__list'),
            children: (0, b.jsx)(q, { items: n, activePath: t, level: 1 })
          })
        });
      }
      const K = 'sidebar_KqHC',
        Q = 'sidebarWithHideableNavbar_ZOok',
        X = 'sidebarHidden_SJ3o',
        $ = 'sidebarLogo_rWsR';
      function ee(e) {
        var t = e.path,
          n = e.sidebar,
          a = e.onCollapse,
          o = e.isHidden,
          r = (0, f.p)(),
          s = r.navbar.hideOnScroll,
          l = r.docs.sidebar.hideable;
        return (0, b.jsxs)('div', {
          className: (0, i.A)(K, s && Q, o && X),
          children: [
            s && (0, b.jsx)(j.A, { tabIndex: -1, className: $ }),
            (0, b.jsx)(Z, { path: t, sidebar: n }),
            l && (0, b.jsx)(_, { onClick: a })
          ]
        });
      }
      const te = a.memo(ee);
      var ne = n(2338),
        ae = n(7838),
        ie = function (e) {
          var t = e.sidebar,
            n = e.path,
            a = (0, ae.M)();
          return (0, b.jsx)('ul', {
            className: (0, i.A)(r.G.docs.docSidebarMenu, 'menu__list'),
            children: (0, b.jsx)(q, {
              items: t,
              activePath: n,
              onItemClick: function (e) {
                'category' === e.type && e.href && a.toggle(), 'link' === e.type && a.toggle();
              },
              level: 1
            })
          });
        };
      function oe(e) {
        return (0, b.jsx)(ne.GX, { component: ie, props: e });
      }
      const re = a.memo(oe);
      function se(e) {
        var t = (0, v.l)(),
          n = 'desktop' === t || 'ssr' === t,
          a = 'mobile' === t;
        return (0, b.jsxs)(b.Fragment, {
          children: [n && (0, b.jsx)(te, Object.assign({}, e)), a && (0, b.jsx)(re, Object.assign({}, e))]
        });
      }
      const le = { expandButton: 'expandButton_eC14', expandButtonIcon: 'expandButtonIcon_QdAO' };
      function ce(e) {
        var t = e.toggleSidebar;
        return (0, b.jsx)('div', {
          className: le.expandButton,
          title: (0, c.T)({
            id: 'theme.docs.sidebar.expandButtonTitle',
            message: 'Expand sidebar',
            description: 'The ARIA label and title attribute for expand button of doc sidebar'
          }),
          'aria-label': (0, c.T)({
            id: 'theme.docs.sidebar.expandButtonAriaLabel',
            message: 'Expand sidebar',
            description: 'The ARIA label and title attribute for expand button of doc sidebar'
          }),
          tabIndex: 0,
          role: 'button',
          onKeyDown: t,
          onClick: t,
          children: (0, b.jsx)(g, { className: le.expandButtonIcon })
        });
      }
      const de = {
        docSidebarContainer: 'docSidebarContainer_XFBJ',
        docSidebarContainerHidden: 'docSidebarContainerHidden_RNmP',
        sidebarViewport: 'sidebarViewport_l1MI'
      };
      function ue(e) {
        var t,
          n = e.children,
          i = (0, l.t)();
        return (0, b.jsx)(
          a.Fragment,
          { children: n },
          null != (t = null == i ? void 0 : i.name) ? t : 'noSidebar'
        );
      }
      function me(e) {
        var t = e.sidebar,
          n = e.hiddenSidebarContainer,
          o = e.setHiddenSidebarContainer,
          s = (0, x.zy)().pathname,
          l = (0, a.useState)(!1),
          c = l[0],
          d = l[1],
          u = (0, a.useCallback)(
            function () {
              c && d(!1),
                !c && (0, p.O)() && d(!0),
                o(function (e) {
                  return !e;
                });
            },
            [o, c]
          );
        return (0, b.jsx)('aside', {
          className: (0, i.A)(
            r.G.docs.docSidebarContainer,
            de.docSidebarContainer,
            n && de.docSidebarContainerHidden
          ),
          onTransitionEnd: function (e) {
            e.currentTarget.classList.contains(de.docSidebarContainer) && n && d(!0);
          },
          children: (0, b.jsx)(ue, {
            children: (0, b.jsxs)('div', {
              className: (0, i.A)(de.sidebarViewport, c && de.sidebarViewportHidden),
              children: [
                (0, b.jsx)(se, { sidebar: t, path: s, onCollapse: u, isHidden: c }),
                c && (0, b.jsx)(ce, { toggleSidebar: u })
              ]
            })
          })
        });
      }
      const be = {
        docMainContainer: 'docMainContainer_lbTn',
        docMainContainerEnhanced: 'docMainContainerEnhanced_EpBh',
        docItemWrapperEnhanced: 'docItemWrapperEnhanced_RDGk'
      };
      function he(e) {
        var t = e.hiddenSidebarContainer,
          n = e.children,
          a = (0, l.t)();
        return (0, b.jsx)('main', {
          className: (0, i.A)(be.docMainContainer, (t || !a) && be.docMainContainerEnhanced),
          children: (0, b.jsx)('div', {
            className: (0, i.A)(
              'container padding-top--md padding-bottom--lg',
              be.docItemWrapper,
              t && be.docItemWrapperEnhanced
            ),
            children: n
          })
        });
      }
      const pe = { docRoot: 'docRoot_es5J', docsWrapper: 'docsWrapper_fOtn' };
      function xe(e) {
        var t = e.children,
          n = (0, l.t)(),
          i = (0, a.useState)(!1),
          o = i[0],
          r = i[1];
        return (0, b.jsxs)('div', {
          className: pe.docsWrapper,
          children: [
            (0, b.jsx)(h, {}),
            (0, b.jsxs)('div', {
              className: pe.docRoot,
              children: [
                n &&
                  (0, b.jsx)(me, {
                    sidebar: n.items,
                    hiddenSidebarContainer: o,
                    setHiddenSidebarContainer: r
                  }),
                (0, b.jsx)(he, { hiddenSidebarContainer: o, children: t })
              ]
            })
          ]
        });
      }
      var ve = n(7292);
      function fe(e) {
        var t = (0, s.B5)(e);
        if (!t) return (0, b.jsx)(ve.A, {});
        var n = t.docElement,
          a = t.sidebarName,
          c = t.sidebarItems;
        return (0, b.jsx)(o.e3, {
          className: (0, i.A)(r.G.page.docsDocPage),
          children: (0, b.jsx)(l.V, { name: a, items: c, children: (0, b.jsx)(xe, { children: n }) })
        });
      }
    },
    7292: (e, t, n) => {
      n.d(t, { A: () => s });
      n(5528);
      var a = n(7286),
        i = n(2431),
        o = n(8528),
        r = n(2388);
      function s(e) {
        var t = e.className;
        return (0, r.jsx)('main', {
          className: (0, a.A)('container margin-vert--xl', t),
          children: (0, r.jsx)('div', {
            className: 'row',
            children: (0, r.jsxs)('div', {
              className: 'col col--6 col--offset-3',
              children: [
                (0, r.jsx)(o.A, {
                  as: 'h1',
                  className: 'hero__title',
                  children: (0, r.jsx)(i.A, {
                    id: 'theme.NotFound.title',
                    description: 'The title of the 404 page',
                    children: 'Page Not Found'
                  })
                }),
                (0, r.jsx)('p', {
                  children: (0, r.jsx)(i.A, {
                    id: 'theme.NotFound.p1',
                    description: 'The first paragraph of the 404 page',
                    children: 'We could not find what you were looking for.'
                  })
                }),
                (0, r.jsx)('p', {
                  children: (0, r.jsx)(i.A, {
                    id: 'theme.NotFound.p2',
                    description: 'The 2nd paragraph of the 404 page',
                    children:
                      'Please contact the owner of the site that linked you to the original URL and let them know their link is broken.'
                  })
                })
              ]
            })
          })
        });
      }
    }
  }
]);
