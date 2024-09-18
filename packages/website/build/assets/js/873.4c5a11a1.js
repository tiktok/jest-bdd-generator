(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [873],
  {
    5887: (e, n, t) => {
      'use strict';
      t.d(n, { A: () => _ });
      var a = t(5528),
        s = t(2388);
      function r(e) {
        var n,
          t = (function (e) {
            var n = a.Children.toArray(e),
              t = n.find(function (e) {
                return a.isValidElement(e) && 'mdxAdmonitionTitle' === e.type;
              }),
              r = n.filter(function (e) {
                return e !== t;
              });
            return {
              mdxAdmonitionTitle: null == t ? void 0 : t.props.children,
              rest: r.length > 0 ? (0, s.jsx)(s.Fragment, { children: r }) : null
            };
          })(e.children),
          r = t.mdxAdmonitionTitle,
          i = t.rest,
          c = null != (n = e.title) ? n : r;
        return Object.assign({}, e, c && { title: c }, { children: i });
      }
      var i = t(7286),
        c = t(2431),
        o = t(2489);
      const l = {
        admonition: 'admonition_N5Oq',
        admonitionHeading: 'admonitionHeading_SX6a',
        admonitionIcon: 'admonitionIcon_bW_O',
        admonitionContent: 'admonitionContent_bedf'
      };
      function d(e) {
        var n = e.type,
          t = e.className,
          a = e.children;
        return (0, s.jsx)('div', {
          className: (0, i.A)(o.G.common.admonition, o.G.common.admonitionType(n), l.admonition, t),
          children: a
        });
      }
      function u(e) {
        var n = e.icon,
          t = e.title;
        return (0, s.jsxs)('div', {
          className: l.admonitionHeading,
          children: [(0, s.jsx)('span', { className: l.admonitionIcon, children: n }), t]
        });
      }
      function m(e) {
        var n = e.children;
        return n ? (0, s.jsx)('div', { className: l.admonitionContent, children: n }) : null;
      }
      function h(e) {
        var n = e.type,
          t = e.icon,
          a = e.title,
          r = e.children,
          i = e.className;
        return (0, s.jsxs)(d, {
          type: n,
          className: i,
          children: [a || t ? (0, s.jsx)(u, { title: a, icon: t }) : null, (0, s.jsx)(m, { children: r })]
        });
      }
      function f(e) {
        return (0, s.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 14 16' }, e, {
            children: (0, s.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z'
            })
          })
        );
      }
      var p = {
        icon: (0, s.jsx)(f, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.note',
          description: 'The default label used for the Note admonition (:::note)',
          children: 'note'
        })
      };
      function g(e) {
        return (0, s.jsx)(
          h,
          Object.assign({}, p, e, {
            className: (0, i.A)('alert alert--secondary', e.className),
            children: e.children
          })
        );
      }
      function v(e) {
        return (0, s.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 12 16' }, e, {
            children: (0, s.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z'
            })
          })
        );
      }
      var j = {
        icon: (0, s.jsx)(v, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.tip',
          description: 'The default label used for the Tip admonition (:::tip)',
          children: 'tip'
        })
      };
      function b(e) {
        return (0, s.jsx)(
          h,
          Object.assign({}, j, e, {
            className: (0, i.A)('alert alert--success', e.className),
            children: e.children
          })
        );
      }
      function x(e) {
        return (0, s.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 14 16' }, e, {
            children: (0, s.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z'
            })
          })
        );
      }
      var N = {
        icon: (0, s.jsx)(x, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.info',
          description: 'The default label used for the Info admonition (:::info)',
          children: 'info'
        })
      };
      function y(e) {
        return (0, s.jsx)(
          h,
          Object.assign({}, N, e, {
            className: (0, i.A)('alert alert--info', e.className),
            children: e.children
          })
        );
      }
      function A(e) {
        return (0, s.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 16 16' }, e, {
            children: (0, s.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z'
            })
          })
        );
      }
      var k = {
        icon: (0, s.jsx)(A, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.warning',
          description: 'The default label used for the Warning admonition (:::warning)',
          children: 'warning'
        })
      };
      function C(e) {
        return (0, s.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 12 16' }, e, {
            children: (0, s.jsx)('path', {
              fillRule: 'evenodd',
              d: 'M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z'
            })
          })
        );
      }
      var w = {
        icon: (0, s.jsx)(C, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.danger',
          description: 'The default label used for the Danger admonition (:::danger)',
          children: 'danger'
        })
      };
      var B = {
        icon: (0, s.jsx)(A, {}),
        title: (0, s.jsx)(c.A, {
          id: 'theme.admonition.caution',
          description: 'The default label used for the Caution admonition (:::caution)',
          children: 'caution'
        })
      };
      var O = {
          note: g,
          tip: b,
          info: y,
          warning: function (e) {
            return (0, s.jsx)(
              h,
              Object.assign({}, k, e, {
                className: (0, i.A)('alert alert--warning', e.className),
                children: e.children
              })
            );
          },
          danger: function (e) {
            return (0, s.jsx)(
              h,
              Object.assign({}, w, e, {
                className: (0, i.A)('alert alert--danger', e.className),
                children: e.children
              })
            );
          }
        },
        T = {
          secondary: function (e) {
            return (0, s.jsx)(g, Object.assign({ title: 'secondary' }, e));
          },
          important: function (e) {
            return (0, s.jsx)(y, Object.assign({ title: 'important' }, e));
          },
          success: function (e) {
            return (0, s.jsx)(b, Object.assign({ title: 'success' }, e));
          },
          caution: function (e) {
            return (0, s.jsx)(
              h,
              Object.assign({}, B, e, {
                className: (0, i.A)('alert alert--warning', e.className),
                children: e.children
              })
            );
          }
        };
      const L = Object.assign({}, O, T);
      function _(e) {
        var n,
          t = r(e),
          a =
            ((n = t.type),
            L[n] ||
              (console.warn(
                'No admonition component found for admonition type "' + n + '". Using Info as fallback.'
              ),
              L.info));
        return (0, s.jsx)(a, Object.assign({}, t));
      }
    },
    2260: (e, n, t) => {
      'use strict';
      t.d(n, { A: () => j });
      t(5528);
      var a = t(7286),
        s = t(2431),
        r = t(2489),
        i = t(4345),
        c = t(6562);
      const o = { iconEdit: 'iconEdit_YzTR' };
      var l = t(2388),
        d = ['className'];
      function u(e) {
        var n = e.className,
          t = (0, c.A)(e, d);
        return (0, l.jsx)(
          'svg',
          Object.assign(
            {
              fill: 'currentColor',
              height: '20',
              width: '20',
              viewBox: '0 0 40 40',
              className: (0, a.A)(o.iconEdit, n),
              'aria-hidden': 'true'
            },
            t,
            {
              children: (0, l.jsx)('g', {
                children: (0, l.jsx)('path', {
                  d: 'm34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z'
                })
              })
            }
          )
        );
      }
      function m(e) {
        var n = e.editUrl;
        return (0, l.jsxs)(i.A, {
          to: n,
          className: r.G.common.editThisPage,
          children: [
            (0, l.jsx)(u, {}),
            (0, l.jsx)(s.A, {
              id: 'theme.common.editThisPage',
              description: 'The link label to edit the current page',
              children: 'Edit this page'
            })
          ]
        });
      }
      var h = t(5560);
      function f(e) {
        var n = e.lastUpdatedAt,
          t = new Date(n),
          a = (0, h.i)({ day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(t);
        return (0, l.jsx)(s.A, {
          id: 'theme.lastUpdated.atDate',
          description: 'The words used to describe on which date a page has been last updated',
          values: {
            date: (0, l.jsx)('b', {
              children: (0, l.jsx)('time', {
                dateTime: t.toISOString(),
                itemProp: 'dateModified',
                children: a
              })
            })
          },
          children: ' on {date}'
        });
      }
      function p(e) {
        var n = e.lastUpdatedBy;
        return (0, l.jsx)(s.A, {
          id: 'theme.lastUpdated.byUser',
          description: 'The words used to describe by who the page has been last updated',
          values: { user: (0, l.jsx)('b', { children: n }) },
          children: ' by {user}'
        });
      }
      function g(e) {
        var n = e.lastUpdatedAt,
          t = e.lastUpdatedBy;
        return (0, l.jsxs)('span', {
          className: r.G.common.lastUpdated,
          children: [
            (0, l.jsx)(s.A, {
              id: 'theme.lastUpdated.lastUpdatedAtBy',
              description: 'The sentence used to display when a page has been last updated, and by who',
              values: {
                atDate: n ? (0, l.jsx)(f, { lastUpdatedAt: n }) : '',
                byUser: t ? (0, l.jsx)(p, { lastUpdatedBy: t }) : ''
              },
              children: 'Last updated{atDate}{byUser}'
            }),
            !1
          ]
        });
      }
      const v = { lastUpdated: 'lastUpdated_fsNk' };
      function j(e) {
        var n = e.className,
          t = e.editUrl,
          s = e.lastUpdatedAt,
          r = e.lastUpdatedBy;
        return (0, l.jsxs)('div', {
          className: (0, a.A)('row', n),
          children: [
            (0, l.jsx)('div', { className: 'col', children: t && (0, l.jsx)(m, { editUrl: t }) }),
            (0, l.jsx)('div', {
              className: (0, a.A)('col', v.lastUpdated),
              children: (s || r) && (0, l.jsx)(g, { lastUpdatedAt: s, lastUpdatedBy: r })
            })
          ]
        });
      }
    },
    5505: (e, n, t) => {
      'use strict';
      t.d(n, { A: () => he });
      var a = t(5528),
        s = t(5667),
        r = t(5215),
        i = t(6562),
        c = t(4616),
        o = t(7286),
        l = t(15),
        d = t(6624);
      function u() {
        var e = (0, d.p)().prism,
          n = (0, l.G)().colorMode,
          t = e.theme,
          a = e.darkTheme || t;
        return 'dark' === n ? a : t;
      }
      var m = t(2489),
        h = t(5094),
        f = t(1269),
        p = t.n(f),
        g = (0, h.A)(/title=(["'])(.*?)\1/, { quote: 1, title: 2 }),
        v = (0, h.A)(/\{([\d,-]+)\}/, { range: 1 }),
        j = {
          js: { start: '\\/\\/', end: '' },
          jsBlock: { start: '\\/\\*', end: '\\*\\/' },
          jsx: { start: '\\{\\s*\\/\\*', end: '\\*\\/\\s*\\}' },
          bash: { start: '#', end: '' },
          html: { start: '\x3c!--', end: '--\x3e' }
        },
        b = Object.assign({}, j, {
          lua: { start: '--', end: '' },
          wasm: { start: '\\;\\;', end: '' },
          tex: { start: '%', end: '' },
          vb: { start: "['\u2018\u2019]", end: '' },
          vbnet: { start: "(?:_\\s*)?['\u2018\u2019]", end: '' },
          rem: { start: '[Rr][Ee][Mm]\\b', end: '' },
          f90: { start: '!', end: '' },
          ml: { start: '\\(\\*', end: '\\*\\)' },
          cobol: { start: '\\*>', end: '' }
        }),
        x = Object.keys(j);
      function N(e, n) {
        var t = e
          .map(function (e) {
            var t = b[e],
              a = t.start,
              s = t.end;
            return (
              '(?:' +
              a +
              '\\s*(' +
              n
                .flatMap(function (e) {
                  var n, t;
                  return [
                    e.line,
                    null == (n = e.block) ? void 0 : n.start,
                    null == (t = e.block) ? void 0 : t.end
                  ].filter(Boolean);
                })
                .join('|') +
              ')\\s*' +
              s +
              ')'
            );
          })
          .join('|');
        return new RegExp('^\\s*(?:' + t + ')\\s*$');
      }
      function y(e, n) {
        var t = e.replace(/\n$/, ''),
          a = n.language,
          s = n.magicComments,
          r = n.metastring;
        if (r && v.test(r)) {
          var i = r.match(v).groups.range;
          if (0 === s.length)
            throw new Error(
              "A highlight range has been given in code block's metastring (``` " +
                r +
                "), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges."
            );
          var c = s[0].className,
            o = p()(i)
              .filter(function (e) {
                return e > 0;
              })
              .map(function (e) {
                return [e - 1, [c]];
              });
          return { lineClassNames: Object.fromEntries(o), code: t };
        }
        if (void 0 === a) return { lineClassNames: {}, code: t };
        for (
          var l = (function (e, n) {
              switch (e) {
                case 'js':
                case 'javascript':
                case 'ts':
                case 'typescript':
                  return N(['js', 'jsBlock'], n);
                case 'jsx':
                case 'tsx':
                  return N(['js', 'jsBlock', 'jsx'], n);
                case 'html':
                  return N(['js', 'jsBlock', 'html'], n);
                case 'python':
                case 'py':
                case 'bash':
                  return N(['bash'], n);
                case 'markdown':
                case 'md':
                  return N(['html', 'jsx', 'bash'], n);
                case 'tex':
                case 'latex':
                case 'matlab':
                  return N(['tex'], n);
                case 'lua':
                case 'haskell':
                case 'sql':
                  return N(['lua'], n);
                case 'wasm':
                  return N(['wasm'], n);
                case 'vb':
                case 'vba':
                case 'visual-basic':
                  return N(['vb', 'rem'], n);
                case 'vbnet':
                  return N(['vbnet', 'rem'], n);
                case 'batch':
                  return N(['rem'], n);
                case 'basic':
                  return N(['rem', 'f90'], n);
                case 'fsharp':
                  return N(['js', 'ml'], n);
                case 'ocaml':
                case 'sml':
                  return N(['ml'], n);
                case 'fortran':
                  return N(['f90'], n);
                case 'cobol':
                  return N(['cobol'], n);
                default:
                  return N(x, n);
              }
            })(a, s),
            d = t.split('\n'),
            u = Object.fromEntries(
              s.map(function (e) {
                return [e.className, { start: 0, range: '' }];
              })
            ),
            m = Object.fromEntries(
              s
                .filter(function (e) {
                  return e.line;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.line, n];
                })
            ),
            h = Object.fromEntries(
              s
                .filter(function (e) {
                  return e.block;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.block.start, n];
                })
            ),
            f = Object.fromEntries(
              s
                .filter(function (e) {
                  return e.block;
                })
                .map(function (e) {
                  var n = e.className;
                  return [e.block.end, n];
                })
            ),
            g = 0;
          g < d.length;

        ) {
          var j = d[g].match(l);
          if (j) {
            var b = j.slice(1).find(function (e) {
              return void 0 !== e;
            });
            m[b]
              ? (u[m[b]].range += g + ',')
              : h[b]
                ? (u[h[b]].start = g)
                : f[b] && (u[f[b]].range += u[f[b]].start + '-' + (g - 1) + ','),
              d.splice(g, 1);
          } else g += 1;
        }
        t = d.join('\n');
        var y = {};
        return (
          Object.entries(u).forEach(function (e) {
            var n = e[0],
              t = e[1].range;
            p()(t).forEach(function (e) {
              null != y[e] || (y[e] = []), y[e].push(n);
            });
          }),
          { lineClassNames: y, code: t }
        );
      }
      const A = { codeBlockContainer: 'codeBlockContainer_WtLA' };
      var k = t(2388),
        C = ['as'];
      function w(e) {
        var n = e.as,
          t = (0, i.A)(e, C),
          a = (function (e) {
            var n = { color: '--prism-color', backgroundColor: '--prism-background-color' },
              t = {};
            return (
              Object.entries(e.plain).forEach(function (e) {
                var a = e[0],
                  s = e[1],
                  r = n[a];
                r && 'string' == typeof s && (t[r] = s);
              }),
              t
            );
          })(u());
        return (0, k.jsx)(
          n,
          Object.assign({}, t, {
            style: a,
            className: (0, o.A)(t.className, A.codeBlockContainer, m.G.common.codeBlock)
          })
        );
      }
      const B = {
        codeBlockContent: 'codeBlockContent_YYbl',
        codeBlockTitle: 'codeBlockTitle__f7Z',
        codeBlock: 'codeBlock_wLvC',
        codeBlockStandalone: 'codeBlockStandalone_eYTO',
        codeBlockLines: 'codeBlockLines_IeJo',
        codeBlockLinesWithNumbering: 'codeBlockLinesWithNumbering_8WiJ',
        buttonGroup: 'buttonGroup_zCDl'
      };
      function O(e) {
        var n = e.children,
          t = e.className;
        return (0, k.jsx)(w, {
          as: 'pre',
          tabIndex: 0,
          className: (0, o.A)(B.codeBlockStandalone, 'thin-scrollbar', t),
          children: (0, k.jsx)('code', { className: B.codeBlockLines, children: n })
        });
      }
      var T = t(6457),
        L = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
      function _(e, n) {
        var t = (0, a.useState)(),
          s = t[0],
          r = t[1],
          i = (0, a.useCallback)(
            function () {
              var n;
              r(null == (n = e.current) ? void 0 : n.closest('[role=tabpanel][hidden]'));
            },
            [e, r]
          );
        (0, a.useEffect)(
          function () {
            i();
          },
          [i]
        ),
          (function (e, n, t) {
            void 0 === t && (t = L);
            var s = (0, T._q)(n),
              r = (0, T.Be)(t);
            (0, a.useEffect)(
              function () {
                var n = new MutationObserver(s);
                return (
                  e && n.observe(e, r),
                  function () {
                    return n.disconnect();
                  }
                );
              },
              [e, s, r]
            );
          })(
            s,
            function (e) {
              e.forEach(function (e) {
                'attributes' === e.type && 'hidden' === e.attributeName && (n(), i());
              });
            },
            { attributes: !0, characterData: !1, childList: !1, subtree: !1 }
          );
      }
      var E = t(967);
      const S = {
        codeLine: 'codeLine_StM5',
        codeLineNumber: 'codeLineNumber_vNnr',
        codeLineContent: 'codeLineContent_TffR'
      };
      function U(e) {
        var n = e.line,
          t = e.classNames,
          a = e.showLineNumbers,
          s = e.getLineProps,
          r = e.getTokenProps;
        1 === n.length && '\n' === n[0].content && (n[0].content = '');
        var i = s({ line: n, className: (0, o.A)(t, a && S.codeLine) }),
          c = n.map(function (e, n) {
            return (0, k.jsx)('span', Object.assign({}, r({ token: e })), n);
          });
        return (0, k.jsxs)(
          'span',
          Object.assign({}, i, {
            children: [
              a
                ? (0, k.jsxs)(k.Fragment, {
                    children: [
                      (0, k.jsx)('span', { className: S.codeLineNumber }),
                      (0, k.jsx)('span', { className: S.codeLineContent, children: c })
                    ]
                  })
                : c,
              (0, k.jsx)('br', {})
            ]
          })
        );
      }
      var z = t(2431);
      function H(e) {
        return (0, k.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, k.jsx)('path', {
              fill: 'currentColor',
              d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'
            })
          })
        );
      }
      function I(e) {
        return (0, k.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, k.jsx)('path', {
              fill: 'currentColor',
              d: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'
            })
          })
        );
      }
      const M = {
        copyButtonCopied: 'copyButtonCopied_oRTa',
        copyButtonIcons: 'copyButtonIcons_SHWi',
        copyButtonIcon: 'copyButtonIcon_vITq',
        copyButtonSuccessIcon: 'copyButtonSuccessIcon_gisz'
      };
      function R(e) {
        var n = e.code,
          t = e.className,
          s = (0, a.useState)(!1),
          r = s[0],
          i = s[1],
          c = (0, a.useRef)(void 0),
          l = (0, a.useCallback)(
            function () {
              !(function (e, n) {
                var t = (void 0 === n ? {} : n).target,
                  a = void 0 === t ? document.body : t;
                if ('string' != typeof e)
                  throw new TypeError('Expected parameter `text` to be a `string`, got `' + typeof e + '`.');
                var s = document.createElement('textarea'),
                  r = document.activeElement;
                (s.value = e),
                  s.setAttribute('readonly', ''),
                  (s.style.contain = 'strict'),
                  (s.style.position = 'absolute'),
                  (s.style.left = '-9999px'),
                  (s.style.fontSize = '12pt');
                var i = document.getSelection(),
                  c = i.rangeCount > 0 && i.getRangeAt(0);
                a.append(s), s.select(), (s.selectionStart = 0), (s.selectionEnd = e.length);
                var o = !1;
                try {
                  o = document.execCommand('copy');
                } catch (l) {}
                s.remove(), c && (i.removeAllRanges(), i.addRange(c)), r && r.focus();
              })(n),
                i(!0),
                (c.current = window.setTimeout(function () {
                  i(!1);
                }, 1e3));
            },
            [n]
          );
        return (
          (0, a.useEffect)(function () {
            return function () {
              return window.clearTimeout(c.current);
            };
          }, []),
          (0, k.jsx)('button', {
            type: 'button',
            'aria-label': r
              ? (0, z.T)({
                  id: 'theme.CodeBlock.copied',
                  message: 'Copied',
                  description: 'The copied button label on code blocks'
                })
              : (0, z.T)({
                  id: 'theme.CodeBlock.copyButtonAriaLabel',
                  message: 'Copy code to clipboard',
                  description: 'The ARIA label for copy code blocks button'
                }),
            title: (0, z.T)({
              id: 'theme.CodeBlock.copy',
              message: 'Copy',
              description: 'The copy button label on code blocks'
            }),
            className: (0, o.A)('clean-btn', t, M.copyButton, r && M.copyButtonCopied),
            onClick: l,
            children: (0, k.jsxs)('span', {
              className: M.copyButtonIcons,
              'aria-hidden': 'true',
              children: [
                (0, k.jsx)(H, { className: M.copyButtonIcon }),
                (0, k.jsx)(I, { className: M.copyButtonSuccessIcon })
              ]
            })
          })
        );
      }
      function W(e) {
        return (0, k.jsx)(
          'svg',
          Object.assign({ viewBox: '0 0 24 24' }, e, {
            children: (0, k.jsx)('path', {
              fill: 'currentColor',
              d: 'M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z'
            })
          })
        );
      }
      const D = {
        wordWrapButtonIcon: 'wordWrapButtonIcon_vuQ6',
        wordWrapButtonEnabled: 'wordWrapButtonEnabled_asLj'
      };
      function V(e) {
        var n = e.className,
          t = e.onClick,
          a = e.isEnabled,
          s = (0, z.T)({
            id: 'theme.CodeBlock.wordWrapToggle',
            message: 'Toggle word wrap',
            description: 'The title attribute for toggle word wrapping button of code block lines'
          });
        return (0, k.jsx)('button', {
          type: 'button',
          onClick: t,
          className: (0, o.A)('clean-btn', n, a && D.wordWrapButtonEnabled),
          'aria-label': s,
          title: s,
          children: (0, k.jsx)(W, { className: D.wordWrapButtonIcon, 'aria-hidden': 'true' })
        });
      }
      function P(e) {
        var n,
          t,
          s,
          r,
          i,
          c,
          l,
          m,
          h,
          f,
          p,
          v = e.children,
          j = e.className,
          b = void 0 === j ? '' : j,
          x = e.metastring,
          N = e.title,
          A = e.showLineNumbers,
          C = e.language,
          O = (0, d.p)().prism,
          T = O.defaultLanguage,
          L = O.magicComments,
          S = (function (e) {
            return null == e ? void 0 : e.toLowerCase();
          })(
            null !=
              (n =
                null != C
                  ? C
                  : null ==
                      (t = b.split(' ').find(function (e) {
                        return e.startsWith('language-');
                      }))
                    ? void 0
                    : t.replace(/language-/, ''))
              ? n
              : T
          ),
          z = u(),
          H =
            ((s = (0, a.useState)(!1)),
            (r = s[0]),
            (i = s[1]),
            (c = (0, a.useState)(!1)),
            (l = c[0]),
            (m = c[1]),
            (h = (0, a.useRef)(null)),
            (f = (0, a.useCallback)(
              function () {
                var e = h.current.querySelector('code');
                r
                  ? e.removeAttribute('style')
                  : ((e.style.whiteSpace = 'pre-wrap'), (e.style.overflowWrap = 'anywhere')),
                  i(function (e) {
                    return !e;
                  });
              },
              [h, r]
            )),
            (p = (0, a.useCallback)(
              function () {
                var e = h.current,
                  n = e.scrollWidth > e.clientWidth || h.current.querySelector('code').hasAttribute('style');
                m(n);
              },
              [h]
            )),
            _(h, p),
            (0, a.useEffect)(
              function () {
                p();
              },
              [r, p]
            ),
            (0, a.useEffect)(
              function () {
                return (
                  window.addEventListener('resize', p, { passive: !0 }),
                  function () {
                    window.removeEventListener('resize', p);
                  }
                );
              },
              [p]
            ),
            { codeBlockRef: h, isEnabled: r, isCodeScrollable: l, toggle: f }),
          I =
            (function (e) {
              var n, t;
              return null != (n = null == e || null == (t = e.match(g)) ? void 0 : t.groups.title) ? n : '';
            })(x) || N,
          M = y(v, { metastring: x, language: S, magicComments: L }),
          W = M.lineClassNames,
          D = M.code,
          P =
            null != A
              ? A
              : (function (e) {
                  return Boolean(null == e ? void 0 : e.includes('showLineNumbers'));
                })(x);
        return (0, k.jsxs)(w, {
          as: 'div',
          className: (0, o.A)(b, S && !b.includes('language-' + S) && 'language-' + S),
          children: [
            I && (0, k.jsx)('div', { className: B.codeBlockTitle, children: I }),
            (0, k.jsxs)('div', {
              className: B.codeBlockContent,
              children: [
                (0, k.jsx)(E.f4, {
                  theme: z,
                  code: D,
                  language: null != S ? S : 'text',
                  children: function (e) {
                    var n = e.className,
                      t = e.style,
                      a = e.tokens,
                      s = e.getLineProps,
                      r = e.getTokenProps;
                    return (0, k.jsx)('pre', {
                      tabIndex: 0,
                      ref: H.codeBlockRef,
                      className: (0, o.A)(n, B.codeBlock, 'thin-scrollbar'),
                      style: t,
                      children: (0, k.jsx)('code', {
                        className: (0, o.A)(B.codeBlockLines, P && B.codeBlockLinesWithNumbering),
                        children: a.map(function (e, n) {
                          return (0, k.jsx)(
                            U,
                            {
                              line: e,
                              getLineProps: s,
                              getTokenProps: r,
                              classNames: W[n],
                              showLineNumbers: P
                            },
                            n
                          );
                        })
                      })
                    });
                  }
                }),
                (0, k.jsxs)('div', {
                  className: B.buttonGroup,
                  children: [
                    (H.isEnabled || H.isCodeScrollable) &&
                      (0, k.jsx)(V, {
                        className: B.codeButton,
                        onClick: function () {
                          return H.toggle();
                        },
                        isEnabled: H.isEnabled
                      }),
                    (0, k.jsx)(R, { className: B.codeButton, code: D })
                  ]
                })
              ]
            })
          ]
        });
      }
      var q = ['children'];
      function G(e) {
        var n = e.children,
          t = (0, i.A)(e, q),
          s = (0, c.A)(),
          r = (function (e) {
            return a.Children.toArray(e).some(function (e) {
              return (0, a.isValidElement)(e);
            })
              ? e
              : Array.isArray(e)
                ? e.join('')
                : e;
          })(n),
          o = 'string' == typeof r ? P : O;
        return (0, k.jsx)(o, Object.assign({}, t, { children: r }), String(s));
      }
      function Y(e) {
        return (0, k.jsx)('code', Object.assign({}, e));
      }
      var F = t(4345);
      var Z = t(1804),
        $ = t(5892);
      const J = {
        details: 'details_DjiC',
        isBrowser: 'isBrowser_yqmv',
        collapsibleContent: 'collapsibleContent_cHdb'
      };
      var X = ['summary', 'children'];
      function Q(e) {
        return !!e && ('SUMMARY' === e.tagName || Q(e.parentElement));
      }
      function K(e, n) {
        return !!e && (e === n || K(e.parentElement, n));
      }
      function ee(e) {
        var n = e.summary,
          t = e.children,
          s = (0, i.A)(e, X);
        (0, Z.A)().collectAnchor(s.id);
        var r = (0, c.A)(),
          l = (0, a.useRef)(null),
          d = (0, $.u)({ initialState: !s.open }),
          u = d.collapsed,
          m = d.setCollapsed,
          h = (0, a.useState)(s.open),
          f = h[0],
          p = h[1],
          g = a.isValidElement(n) ? n : (0, k.jsx)('summary', { children: null != n ? n : 'Details' });
        return (0, k.jsxs)(
          'details',
          Object.assign({}, s, {
            ref: l,
            open: f,
            'data-collapsed': u,
            className: (0, o.A)(J.details, r && J.isBrowser, s.className),
            onMouseDown: function (e) {
              Q(e.target) && e.detail > 1 && e.preventDefault();
            },
            onClick: function (e) {
              e.stopPropagation();
              var n = e.target;
              Q(n) && K(n, l.current) && (e.preventDefault(), u ? (m(!1), p(!0)) : m(!0));
            },
            children: [
              g,
              (0, k.jsx)($.N, {
                lazy: !1,
                collapsed: u,
                disableSSRStyle: !0,
                onCollapseTransitionEnd: function (e) {
                  m(e), p(!e);
                },
                children: (0, k.jsx)('div', { className: J.collapsibleContent, children: t })
              })
            ]
          })
        );
      }
      const ne = { details: 'details_XSUC' };
      var te = 'alert alert--info';
      function ae(e) {
        var n = Object.assign(
          {},
          ((function (e) {
            if (null == e) throw new TypeError('Cannot destructure ' + e);
          })(e),
          e)
        );
        return (0, k.jsx)(ee, Object.assign({}, n, { className: (0, o.A)(te, ne.details, n.className) }));
      }
      function se(e) {
        var n = a.Children.toArray(e.children),
          t = n.find(function (e) {
            return a.isValidElement(e) && 'summary' === e.type;
          }),
          s = (0, k.jsx)(k.Fragment, {
            children: n.filter(function (e) {
              return e !== t;
            })
          });
        return (0, k.jsx)(ae, Object.assign({}, e, { summary: t, children: s }));
      }
      var re = t(8528);
      function ie(e) {
        return (0, k.jsx)(re.A, Object.assign({}, e));
      }
      const ce = { containsTaskList: 'containsTaskList_UeYH' };
      function oe(e) {
        if (void 0 !== e)
          return (0, o.A)(e, (null == e ? void 0 : e.includes('contains-task-list')) && ce.containsTaskList);
      }
      const le = { img: 'img_d5Yy' };
      var de = t(5887),
        ue = t(4645);
      const me = {
        Head: r.A,
        details: se,
        Details: se,
        code: function (e) {
          return (function (e) {
            return (
              void 0 !== e.children &&
              a.Children.toArray(e.children).every(function (e) {
                return 'string' == typeof e && !e.includes('\n');
              })
            );
          })(e)
            ? (0, k.jsx)(Y, Object.assign({}, e))
            : (0, k.jsx)(G, Object.assign({}, e));
        },
        a: function (e) {
          return (0, k.jsx)(F.A, Object.assign({}, e));
        },
        pre: function (e) {
          return (0, k.jsx)(k.Fragment, { children: e.children });
        },
        ul: function (e) {
          return (0, k.jsx)('ul', Object.assign({}, e, { className: oe(e.className) }));
        },
        li: function (e) {
          return (0, Z.A)().collectAnchor(e.id), (0, k.jsx)('li', Object.assign({}, e));
        },
        img: function (e) {
          return (0, k.jsx)(
            'img',
            Object.assign({ decoding: 'async', loading: 'lazy' }, e, {
              className: ((n = e.className), (0, o.A)(n, le.img))
            })
          );
          var n;
        },
        h1: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h1' }, e));
        },
        h2: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h2' }, e));
        },
        h3: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h3' }, e));
        },
        h4: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h4' }, e));
        },
        h5: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h5' }, e));
        },
        h6: function (e) {
          return (0, k.jsx)(ie, Object.assign({ as: 'h6' }, e));
        },
        admonition: de.A,
        mermaid: ue.A
      };
      function he(e) {
        var n = e.children;
        return (0, k.jsx)(s.x, { components: me, children: n });
      }
    },
    1465: (e, n, t) => {
      'use strict';
      t.d(n, { A: () => i });
      t(5528);
      var a = t(7286),
        s = t(4345),
        r = t(2388);
      function i(e) {
        var n = e.permalink,
          t = e.title,
          i = e.subLabel,
          c = e.isNext;
        return (0, r.jsxs)(s.A, {
          className: (0, a.A)(
            'pagination-nav__link',
            c ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'
          ),
          to: n,
          children: [
            i && (0, r.jsx)('div', { className: 'pagination-nav__sublabel', children: i }),
            (0, r.jsx)('div', { className: 'pagination-nav__label', children: t })
          ]
        });
      }
    },
    9004: (e, n, t) => {
      'use strict';
      t.d(n, { A: () => d });
      t(5528);
      var a = t(7286),
        s = t(2431),
        r = t(4345);
      const i = { tag: 'tag_VhHY', tagRegular: 'tagRegular_bU8t', tagWithCount: 'tagWithCount_haHs' };
      var c = t(2388);
      function o(e) {
        var n = e.permalink,
          t = e.label,
          s = e.count,
          o = e.description;
        return (0, c.jsxs)(r.A, {
          href: n,
          title: o,
          className: (0, a.A)(i.tag, s ? i.tagWithCount : i.tagRegular),
          children: [t, s && (0, c.jsx)('span', { children: s })]
        });
      }
      const l = { tags: 'tags_zA9W', tag: 'tag_hN6U' };
      function d(e) {
        var n = e.tags;
        return (0, c.jsxs)(c.Fragment, {
          children: [
            (0, c.jsx)('b', {
              children: (0, c.jsx)(s.A, {
                id: 'theme.tags.tagsListLabel',
                description: 'The label alongside a tag list',
                children: 'Tags:'
              })
            }),
            (0, c.jsx)('ul', {
              className: (0, a.A)(l.tags, 'padding--none', 'margin-left--sm'),
              children: n.map(function (e) {
                return (0, c.jsx)(
                  'li',
                  { className: l.tag, children: (0, c.jsx)(o, Object.assign({}, e)) },
                  e.permalink
                );
              })
            })
          ]
        });
      }
    },
    5560: (e, n, t) => {
      'use strict';
      t.d(n, { i: () => s });
      var a = t(341);
      function s(e) {
        void 0 === e && (e = {});
        var n = (0, a.A)().i18n.currentLocale,
          t = (function () {
            var e = (0, a.A)().i18n,
              n = e.currentLocale;
            return e.localeConfigs[n].calendar;
          })();
        return new Intl.DateTimeFormat(n, Object.assign({ calendar: t }, e));
      }
    },
    1269: (e, n) => {
      function t(e) {
        let n,
          t = [];
        for (let a of e.split(',').map((e) => e.trim()))
          if (/^-?\d+$/.test(a)) t.push(parseInt(a, 10));
          else if ((n = a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))) {
            let [e, a, s, r] = n;
            if (a && r) {
              (a = parseInt(a)), (r = parseInt(r));
              const e = a < r ? 1 : -1;
              ('-' !== s && '..' !== s && '\u2025' !== s) || (r += e);
              for (let n = a; n !== r; n += e) t.push(n);
            }
          }
        return t;
      }
      (n.default = t), (e.exports = t);
    },
    5667: (e, n, t) => {
      'use strict';
      t.d(n, { R: () => i, x: () => c });
      var a = t(5528);
      const s = {},
        r = a.createContext(s);
      function i(e) {
        const n = a.useContext(r);
        return a.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e };
          },
          [n, e]
        );
      }
      function c(e) {
        let n;
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : i(e.components)),
          a.createElement(r.Provider, { value: n }, e.children)
        );
      }
    }
  }
]);
