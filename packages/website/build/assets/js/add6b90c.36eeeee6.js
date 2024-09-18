'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [814],
  {
    5723: (n, e, t) => {
      t.r(e), t.d(e, { default: () => z });
      var r,
        o,
        i,
        a,
        u,
        s,
        l,
        c = t(5528),
        d = t(1838),
        f = t(6134),
        p = t(8297),
        v = t(2388),
        h = t(5433),
        x = t(9575);
      function m(n, e, t, r, o, i, a) {
        try {
          var u = n[i](a),
            s = u.value;
        } catch (l) {
          return void t(l);
        }
        u.done ? e(s) : Promise.resolve(s).then(r, o);
      }
      function g(n) {
        return function () {
          var e = this,
            t = arguments;
          return new Promise(function (r, o) {
            var i = n.apply(e, t);
            function a(n) {
              m(i, r, o, a, u, 'next', n);
            }
            function u(n) {
              m(i, r, o, a, u, 'throw', n);
            }
            a(void 0);
          });
        };
      }
      function b(n, e, t) {
        return (
          e in n
            ? Object.defineProperty(n, e, { value: t, enumerable: !0, configurable: !0, writable: !0 })
            : (n[e] = t),
          n
        );
      }
      function y(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(t);
          'function' == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(t).filter(function (n) {
                return Object.getOwnPropertyDescriptor(t, n).enumerable;
              })
            )),
            r.forEach(function (e) {
              b(n, e, t[e]);
            });
        }
        return n;
      }
      var j = ['#000', '#dfe', '#fe2c55', '#FFF', '#faffde', '#048'],
        w = 1,
        k = j[1],
        A = (0, h.Ay)('section')(r || (r = (0, p.A)(['\n  background: ', ';\n  width: 50em;\n'])), k),
        S = (0, h.Ay)('div')(
          o ||
            (o = (0, p.A)([
              '\n  display: flex;\n  color: ',
              ';\n  button {\n    background: ',
              ';\n    border: solid 1px ',
              ';\n    border-radius: 0.2em;\n    margin-left: 0.5em;\n    font-size: 18px;\n    padding: 0.2em 0.7em;\n  }\n  div {\n    display: inline-flex;\n    flex-direction: column;\n    justify-content: center;\n    font-size: 12px;\n    input {\n      margin: 0;\n    }\n  }\n'
            ])),
          j[5],
          j[1],
          j[5]
        ),
        N = (0, h.Ay)('div')(
          i ||
            (i = (0, p.A)([
              '\n  > div {\n    border-bottom: solid 1px ',
              ";\n    font-size: 12px;\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    line-height: 1.6em;\n    > label {\n      flex: 1 1 0;\n      text-align: right;\n      overflow: hidden;\n    }\n    > input[type='button'] {\n      background: transparent;\n    }\n    > input,\n    > textarea {\n      text-indent: 0.2em;\n    }\n    > input,\n    > select,\n    > textarea {\n      font-size: 12px;\n      flex: 2 1 0;\n      height: 2em;\n      margin: 1px;\n      padding: 0 0.8em;\n      border: solid 1px ",
              ';\n      border-radius: 0.4em;\n    }\n    > textarea {\n      min-height: 4em;\n      padding: 0.4em 0.8em;\n    }\n    > input.empty,\n    > select.empty,\n    > textarea.empty {\n      background: #ccc;\n      color: ',
              ';\n    }\n    > input::placeholder,\n    > textarea::placeholder {\n      color: ',
              ';\n    }\n  }\n'
            ])),
          j[3],
          j[5],
          j[5],
          j[5]
        ),
        O = (0, h.Ay)('div')(
          a ||
            (a = (0, p.A)([
              '\n  padding: 5em 0;\n  margin: 1em;\n  text-align: center;\n  align-items: stretch;\n  border: dashed;\n  background: rgba(255, 255, 255, 0.5);\n  &:focus {\n    background: #aa6;\n  }\n  em,\n  i,\n  b {\n    float: left;\n    padding: 0 1em;\n  }\n  i {\n    text-decoration: line-through;\n    color: #a88;\n  }\n  em {\n    color: #888;\n  }\n'
            ]))
        ),
        C = (0, h.Ay)('span')(
          u || (u = (0, p.A)(['\n  text-align: right;\n  background: ', ';\n  height: 1.5em;\n'])),
          j[3]
        ),
        D = (0, h.Ay)('label')(
          s ||
            (s = (0, p.A)([
              '\n  transition: all 0.3s;\n  display: inline-flex;\n  min-height: 0.6em;\n  cursor: pointer;\n  justify-content: end;\n  > * {\n    flex: 1 1 10em;\n    border: solid 1px transparent;\n    transition: all 0.3s;\n    height: 1.5em;\n  }\n'
            ]))
        ),
        M = (0, h.Ay)('article')(
          l ||
            (l = (0, p.A)([
              '\n  font-size: 10px;\n  width: 100%;\n  position: relative;\n  background: ',
              ';\n  display: flex;\n  align-items: end;\n  overflow: auto;\n\n  > aside {\n    overflow: visible;\n    color: ',
              ';\n    display: table;\n    > label {\n      display: table-row;\n      > a {\n        display: table-cell;\n        white-space: nowrap;\n      }\n    }\n  }\n  > section::-webkit-scrollbar {\n    display: none;\n  }\n  > section {\n    overflow: auto;\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n    > div {\n      display: table;\n      > div {\n        color: ',
              ';\n        display: table-row;\n        > span {\n          transition: all 0.3s;\n          border: solid 1px transparent;\n          display: table-cell;\n          height: 1.5em;\n          min-width: 10em;\n          white-space: nowrap;\n          > label {\n            display: flex;\n            flex-direction: column;\n            > * {\n              flex: 0 1 1.5em;\n            }\n          }\n        }\n      }\n    }\n  }\n\n  .highlight {\n    background: ',
              ';\n    color: ',
              ';\n    span {\n      background: ',
              ';\n    }\n    .highlight {\n      background: #ffa;\n    }\n  }\n'
            ])),
          j[4],
          j[5],
          j[5],
          j[1],
          j[0],
          j[1]
        );
      function E(n) {
        return (n + 100).toFixed().substring(1);
      }
      function P(n, e) {
        return F(n, e) === n;
      }
      function F(n, e) {
        var t, r;
        return Array.isArray(n)
          ? 'object' != typeof n[0] || n[0] instanceof Date
            ? n.find(function (n) {
                return P(n, e);
              })
            : null ===
                  (t = n.find(function (n) {
                    return P(n.value, e);
                  })) || void 0 === t
              ? void 0
              : t.value
          : 'number' == typeof n
            ? 'string' == typeof e
              ? ((r = e.match(/((\.)|(\de)|(^0[xb]))$/) ? Number(e + '0') : Number(e)), isNaN(r) ? void 0 : r)
              : e
            : 'boolean' == typeof n
              ? Boolean(e)
              : n instanceof Date
                ? e
                  ? new Date(e)
                  : void 0
                : e;
      }
      function I(n) {
        var e = n.name,
          t = n.data,
          r = n.selections,
          o = n.focused,
          i = n.onPaste,
          a = n.onChange,
          u = (0, c.useState)(),
          s = u[0],
          l = u[1],
          d = (0, c.useRef)(null),
          f = (0, c.useCallback)(
            function (n) {
              null == a || a(n);
            },
            [e, t]
          );
        (0, c.useEffect)(
          function () {
            var n = t[e];
            l(
              '' === n || void 0 === n
                ? ''
                : function (e) {
                    return F(r, e) === n ? e : F(r, n);
                  }
            );
          },
          [t, e, t[e]]
        ),
          (0, c.useEffect)(
            function () {
              var n;
              null === (n = d.current) || void 0 === n || n.focus();
            },
            [o]
          );
        var p,
          h,
          x,
          m,
          g = function (n) {
            if (t) {
              var o = n.target;
              if ('' === o.value) delete t[e], l(void 0);
              else {
                var i = Array.isArray(r) ? r[Number(o.value)] : F(r, o.value);
                (t[e] = i), l(void 0 !== i ? o.value : '');
              }
              f(n);
            }
          };
        return Array.isArray(r)
          ? (0, v.jsxs)('select', {
              ref: d,
              name: e.toString(),
              value: r.findIndex(function (n) {
                return n === s;
              }),
              onInput: g,
              onPaste: i,
              className: void 0 === t[e] ? 'empty' : '',
              children: [
                (0, v.jsx)('option', { value: '', children: '-none' }),
                r.map(function (n, e) {
                  return (0, v.jsx)('option', { value: e, children: null == n ? void 0 : n.toString() }, e);
                })
              ]
            })
          : 'note' === e
            ? (0, v.jsx)('textarea', {
                ref: d,
                name: e.toString(),
                onInput: g,
                value: null !== (p = null == s ? void 0 : s.toString()) && void 0 !== p ? p : '',
                onPaste: i,
                placeholder: '-none',
                className: void 0 === t[e] ? 'empty' : ''
              })
            : r instanceof Date
              ? (0, v.jsx)('input', {
                  type: 'datetime-local',
                  ref: d,
                  name: e.toString(),
                  autoFocus: o,
                  onChange: g,
                  value: s
                    ? ((x = s),
                      (m = x instanceof Date ? x : F(new Date(), x)),
                      m.getFullYear() +
                        '-' +
                        E(m.getMonth() + 1) +
                        '-' +
                        E(m.getDate()) +
                        'T' +
                        E(m.getHours()) +
                        ':' +
                        E(m.getMinutes()) +
                        ':' +
                        E(m.getSeconds()))
                    : void 0,
                  onPaste: i,
                  placeholder: '-none',
                  className: void 0 === t[e] ? 'empty' : ''
                })
              : (0, v.jsx)('input', {
                  ref: d,
                  name: e.toString(),
                  autoFocus: o,
                  onInput: g,
                  value: null !== (h = null == s ? void 0 : s.toString()) && void 0 !== h ? h : '',
                  onPaste: i,
                  placeholder: '-none',
                  className: void 0 === t[e] ? 'empty' : ''
                });
      }
      function H(n) {
        var e = n.colSetting,
          t = n.colHead,
          r = n.insertBefore,
          o = n.deleting,
          i = n.insertAfter,
          a = n.focused,
          u = n.onPaste,
          s = n.onChange,
          l = (0, c.useReducer)(function (n) {
            return n + 1;
          }, 0)[1],
          d = e
            ? Object.keys(e).sort(function (n, e) {
                return 'note' === e ? -1 : 1;
              })
            : [],
          f = function (n) {
            return null == s ? void 0 : s(n);
          };
        return (0, v.jsx)(N, {
          onPaste: u,
          children: t
            ? (0, v.jsxs)(v.Fragment, {
                children: [
                  (0, v.jsxs)('div', {
                    children: [
                      (0, v.jsx)('input', { type: 'button', value: 'InsertBefore', onClick: r }),
                      (0, v.jsx)('input', { type: 'button', value: 'Delete', onClick: o }),
                      (0, v.jsx)('input', { type: 'button', value: 'InsertAfter', onClick: i })
                    ]
                  })
                ].concat(
                  d.map(function (n, r) {
                    var o = e[n],
                      i = o,
                      u = f;
                    if (Array.isArray(o) && 'object' == typeof o[0] && !(o[0] instanceof Date)) {
                      var c = o;
                      (i = c.map(function (n) {
                        return n.value;
                      })),
                        (u = function (n) {
                          var e = n.target.value,
                            r = c[parseInt(e)];
                          return (
                            r &&
                              (Object.keys(r).forEach(function (n) {
                                'value' !== n && (t.expression[n] = r[n]);
                              }),
                              l()),
                            null == s ? void 0 : s(n)
                          );
                        });
                    }
                    return (0, v.jsxs)(
                      'div',
                      {
                        children: [
                          (0, v.jsxs)('label', { children: [n, '\xa0:\xa0'] }),
                          (0, v.jsx)(I, {
                            selections: i,
                            onChange: u,
                            name: n,
                            data: t.expression,
                            focused: a === n
                          })
                        ]
                      },
                      r
                    );
                  })
                )
              })
            : (0, v.jsx)(v.Fragment, {})
        });
      }
      function J(n) {
        var e = n.colHead,
          t = n.onClick,
          r = n.isEditing,
          o = n.style,
          i = n.className,
          a = n.titles,
          u = n.getTrigger,
          s = n.targeted,
          l = n.children,
          d = n.onMouseMove,
          f = null != a ? a : Object.keys(e.expression),
          p = r ? k : '',
          h = (0, c.useState)([]),
          x = h[0],
          m = h[1],
          g = (0, c.useReducer)(
            function (n) {
              var t = null != a ? a : Object.keys(e.expression),
                r = t.map(function (t, r) {
                  return n[r] === e.expression[t] ? (t === s ? k : p) : '#faa';
                });
              return (
                m(r),
                t.map(function (n) {
                  return e.expression[n];
                })
              );
            },
            f.map(function (n) {
              return e.expression[n];
            })
          )[1],
          b = function (n) {
            var e = f.map(function (n) {
              return n === s ? k : p;
            });
            m(e);
          };
        return (
          null == u || u(g),
          (0, v.jsxs)(D, {
            style: y({ background: p }, o),
            className: i,
            title: JSON.stringify(e.expression),
            onMouseMove: d,
            children: [
              l,
              (0 === f.length ? [void 0] : f).map(function (n, r) {
                var o,
                  i = n ? e.expression[n] : void 0;
                return (
                  (o =
                    void 0 === i
                      ? '-empty-'
                      : i === 1 / 0
                        ? 'Infinity'
                        : 'number' == typeof i && isNaN(i)
                          ? 'NaN'
                          : JSON.stringify(i)),
                  (0, v.jsx)(
                    'a',
                    {
                      onClick: function () {
                        return t(e, n);
                      },
                      onTransitionEnd: b,
                      style: { background: x[r], color: 'note' === n ? '#996' : 'inherit' },
                      children: o
                    },
                    r
                  )
                );
              })
            ]
          })
        );
      }
      function R(n) {
        var e = n.defaultCols,
          t = n.defaultRows,
          r = n.colSelections,
          o = n.execute,
          i = n.sort,
          a = (0, c.useState)([]),
          u = a[0],
          s = a[1],
          l = (0, c.useState)([]),
          f = l[0],
          p = l[1],
          h = (0, c.useState)(),
          m = h[0],
          b = h[1],
          N = (0, c.useState)(1),
          E = N[0],
          P = N[1],
          I = (0, c.useState)(),
          R = I[0],
          T = I[1],
          z = R,
          B = (0, c.useState)(),
          G = B[0],
          U = B[1],
          X = (0, c.useState)(),
          L = X[0],
          q = X[1],
          K = y({ note: '' }, r),
          Y = (0, c.useState)(K),
          $ = Y[0],
          Q = Y[1],
          V = (0, c.useState)(),
          W = V[0],
          Z = V[1],
          _ = (0, c.useState)(),
          nn = _[0],
          en = _[1],
          tn = (0, c.useState)(),
          rn = tn[0],
          on = tn[1],
          an = (0, c.useState)(),
          un = an[0],
          sn = an[1],
          ln = (0, c.useState)([]),
          cn = ln[0],
          dn = ln[1],
          fn = (0, c.useState)(!1),
          pn = fn[0],
          vn = fn[1],
          hn = (0, c.useState)('gherkin'),
          xn = hn[0],
          mn = hn[1],
          gn = new Array(f.length),
          bn = new Array(u.length),
          yn = btoa(
            String.fromCharCode.apply(
              null,
              x.Kc(
                JSON.stringify([u, f], function (n, e) {
                  return 'number' == typeof r[n]
                    ? e === 1 / 0
                      ? 'Infinity'
                      : isNaN(e)
                        ? 'NaN'
                        : Number(e)
                    : e;
                })
              )
            )
          );
        (0, c.useEffect)(
          function () {
            var n = (function (n) {
                var e, t;
                if (
                  !(null === (t = window) || void 0 === t || null === (e = t.location) || void 0 === e
                    ? void 0
                    : e.hash)
                )
                  return [[], [], ''];
                var r = window.location.hash.substring(1);
                if (!r) return [[], [], ''];
                var o = x.UD(
                    new Uint8Array(
                      [].concat(atob(r)).map(function (n) {
                        return n.charCodeAt(0);
                      })
                    ),
                    { to: 'string' }
                  ),
                  i = o
                    ? JSON.parse(o, function (e, t) {
                        return void 0 !== (null == n ? void 0 : n[e]) ? F(n[e], t) : t;
                      })
                    : [[], []];
                return [i[0], i[1], r];
              })(r),
              o = n[0],
              i = n[1];
            i.length
              ? p(i)
              : p(
                  t.map(function (n) {
                    return { expression: n };
                  })
                ),
              o.length
                ? s(o)
                : s(
                    e.map(function (n) {
                      return { expression: n };
                    })
                  );
          },
          [e, t]
        ),
          (0, c.useEffect)(
            function () {
              var n, e;
              void 0 !==
                (null === (e = window) || void 0 === e || null === (n = e.location) || void 0 === n
                  ? void 0
                  : n.hash) && (window.location.hash = yn);
            },
            [yn]
          );
        var jn,
          wn = function (n) {
            var e = n.clipboardData.getData('text/plain');
            if (e && G) {
              var t = e.split(/\r?\n/),
                r = $[G];
              if (r) {
                var o = [];
                t.forEach(function (n, e) {
                  var t, i;
                  if (
                    ((o[e] = (0, v.jsx)('em', { children: n })),
                    e >= f.length && f.push({ expression: {} }),
                    (o[e] = (0, v.jsx)('i', { children: n })),
                    n)
                  ) {
                    var a;
                    if (null === (t = r[0]) || void 0 === t ? void 0 : t.value) {
                      var u = r.find(function (e) {
                        return e.value === F(e.value, n);
                      });
                      (a = null == u ? void 0 : u.value),
                        u &&
                          Object.keys(u).forEach(function (n) {
                            'value' !== n && (f[e].expression[n] = u[n]);
                          });
                    } else a = F(r, n);
                    (f[e].expression[G] = a),
                      null === (i = gn[e]) || void 0 === i || i.call(gn),
                      void 0 !== a && (o[e] = (0, v.jsx)('b', { children: JSON.stringify(a) }));
                  }
                }),
                  p(f.slice(0, t.length)),
                  en((0, v.jsxs)(v.Fragment, { children: [].concat(o) }));
              }
            }
          },
          kn = function () {
            var n = f.findIndex(function (n) {
              return n === R;
            });
            if (-1 !== n) return [n, f, p];
            var e = u.findIndex(function (n) {
              return n === R;
            });
            if (-1 !== e) return [e, u, s];
            throw new Error('not found');
          },
          An = {},
          Sn =
            ((jn = g(function (n, e) {
              return (
                void 0 === n && (n = f),
                void 0 === e && (e = u),
                (0, d.A)().mark(function t() {
                  return (0, d.A)().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return t.abrupt(
                            'return',
                            Promise.all(
                              n.map(
                                (function () {
                                  var n = g(
                                    (0, d.A)().mark(function n(t) {
                                      return (0, d.A)().wrap(function (n) {
                                        for (;;)
                                          switch ((n.prev = n.next)) {
                                            case 0:
                                              return (
                                                (n.next = 2),
                                                Promise.all(
                                                  e.map(
                                                    (function () {
                                                      var n = g(
                                                        (0, d.A)().mark(function n(e) {
                                                          var r, i, a;
                                                          return (0, d.A)().wrap(
                                                            function (n) {
                                                              for (;;)
                                                                switch ((n.prev = n.next)) {
                                                                  case 0:
                                                                    return (
                                                                      (n.prev = 0),
                                                                      (r = Object.assign(
                                                                        {},
                                                                        t.expression,
                                                                        e.expression
                                                                      )),
                                                                      n.abrupt(
                                                                        'return',
                                                                        o(r).catch(function (n) {
                                                                          return (0, v.jsx)('s', {
                                                                            title: n.toString(),
                                                                            children: 'Error'
                                                                          });
                                                                        })
                                                                      )
                                                                    );
                                                                  case 5:
                                                                    return (
                                                                      (n.prev = 5),
                                                                      (n.t0 = n.catch(0)),
                                                                      n.abrupt(
                                                                        'return',
                                                                        null !==
                                                                          (a =
                                                                            null !== (i = n.t0.message) &&
                                                                            void 0 !== i
                                                                              ? i
                                                                              : null === n.t0 ||
                                                                                  void 0 === n.t0
                                                                                ? void 0
                                                                                : n.t0.toString()) &&
                                                                          void 0 !== a
                                                                          ? a
                                                                          : n.t0
                                                                      )
                                                                    );
                                                                  case 8:
                                                                  case 'end':
                                                                    return n.stop();
                                                                }
                                                            },
                                                            n,
                                                            null,
                                                            [[0, 5]]
                                                          );
                                                        })
                                                      );
                                                      return function (e) {
                                                        return n.apply(this, arguments);
                                                      };
                                                    })()
                                                  )
                                                )
                                              );
                                            case 2:
                                              return n.abrupt('return', n.sent);
                                            case 3:
                                            case 'end':
                                              return n.stop();
                                          }
                                      }, n);
                                    })
                                  );
                                  return function (e) {
                                    return n.apply(this, arguments);
                                  };
                                })()
                              )
                            )
                          );
                        case 1:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })()
              );
            })),
            function () {
              return jn.apply(this, arguments);
            }),
          Nn = (function () {
            var n = g(
              (0, d.A)().mark(function n() {
                var e;
                return (0, d.A)().wrap(function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return (n.next = 2), Sn(f, u);
                      case 2:
                        (e = n.sent), q(e);
                      case 4:
                      case 'end':
                        return n.stop();
                    }
                }, n);
              })
            );
            return function () {
              return n.apply(this, arguments);
            };
          })(),
          On = function () {
            if (z) {
              var n,
                e,
                t = u.indexOf(z),
                r = f.indexOf(z);
              null === (n = gn[r]) || void 0 === n || n.call(gn),
                null === (e = bn[t]) || void 0 === e || e.call(bn),
                -1 === r &&
                  -1 === t &&
                  gn.forEach(function (n) {
                    return null == n ? void 0 : n();
                  });
            }
          },
          Cn = function (n, e) {
            return cn.findIndex(function (t) {
              return t[0] === n && t[1] === e;
            });
          },
          Dn = function (n, e) {
            cn.push([n, e]);
          },
          Mn = function (n, e) {
            var t,
              r = null !== (t = cn[0]) && void 0 !== t ? t : [null != n ? n : 0, null != e ? e : 0],
              o = r[0],
              i = r[1];
            cn.splice(1, cn.length - 2);
            var a = null != n ? n : f.length - 1,
              s = null != e ? e : u.length - 1;
            a < o && ((a = o), (o = n)), s < i && ((s = i), (i = e));
            for (var l = o; l <= a; l++) for (var c = i; c <= s; c++) Dn(l, c);
          },
          En = function (n) {
            dn([[rn, un]]), n.preventDefault(), vn(!0);
          },
          Pn = function (n) {
            vn(!1), dn([].concat(cn));
          },
          Fn = function (n, e) {
            Q(K), U(null != e ? e : Object.keys(r)[0]), On(), T(n), (z = n), On();
          },
          In = (function () {
            var n = g(
              (0, d.A)().mark(function n(e) {
                var t, r, o;
                return (0, d.A)().wrap(function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        if (i) {
                          n.next = 2;
                          break;
                        }
                        return n.abrupt('return', Fn(e));
                      case 2:
                        return (
                          P((t = m === e ? -E : 1)), b(e), (n.next = 7), i(null == e ? void 0 : e.expression)
                        );
                      case 7:
                        if ((r = n.sent)) {
                          n.next = 10;
                          break;
                        }
                        return n.abrupt('return', Fn(e));
                      case 10:
                        (o = f.sort(function (n, e) {
                          return t * (r(n) - r(e));
                        })),
                          p(
                            o.map(function (n) {
                              return y({}, n);
                            })
                          ),
                          q([]);
                      case 13:
                      case 'end':
                        return n.stop();
                    }
                }, n);
              })
            );
            return function (e) {
              return n.apply(this, arguments);
            };
          })(),
          Hn = function (n) {
            return n.reduce(function (n, e) {
              var t = e.expression,
                r = Object.keys(t);
              return n.concat(r).filter(function (n, e, t) {
                return t.indexOf(n) === e;
              });
            }, []);
          },
          Jn = (function () {
            var n = g(
              (0, d.A)().mark(function n() {
                var e, t, r, o, i, a, s;
                return (0, d.A)().wrap(function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return (
                          (e = []),
                          (t = []),
                          cn.length
                            ? cn.forEach(function (n) {
                                var r = n[0],
                                  o = n[1];
                                e.includes(f[r]) || e.push(f[r]), t.includes(u[o]) || t.push(u[o]);
                              })
                            : (e.push.apply(e, f), t.push.apply(t, u)),
                          (n.next = 5),
                          Sn(e, t)
                        );
                      case 5:
                        return (
                          (r = n.sent),
                          (o = Hn(e)),
                          (i = [].concat(
                            o,
                            t.map(function (n, e) {
                              return Object.values(n.expression).join(';');
                            })
                          )),
                          (a = r.map(function (n, t) {
                            return [].concat(
                              o.map(function (n) {
                                var r;
                                return null !== (r = e[t].expression[n]) && void 0 !== r ? r : '';
                              }),
                              n
                            );
                          })),
                          (s = [i]
                            .concat(a)
                            .map(function (n) {
                              return n.join('gherkin' === xn ? ' | ' : '\t');
                            })
                            .join('\n')),
                          (n.next = 12),
                          navigator.clipboard.writeText(s)
                        );
                      case 12:
                      case 'end':
                        return n.stop();
                    }
                }, n);
              })
            );
            return function () {
              return n.apply(this, arguments);
            };
          })(),
          Rn = function (n, e) {
            on(n), sn(e);
          };
        return (0, v.jsxs)(v.Fragment, {
          children: [
            (0, v.jsxs)(S, {
              children: [
                (0, v.jsx)('button', { type: 'button', onClick: Nn, children: 'run' }),
                (0, v.jsx)('button', { type: 'button', onClick: Jn, children: 'copy' }),
                (0, v.jsxs)('div', {
                  children: [
                    (0, v.jsxs)('label', {
                      htmlFor: 'rbtGherkin',
                      title: 'separator: "|"',
                      children: [
                        (0, v.jsx)('input', {
                          id: 'rbtGherkin',
                          type: 'radio',
                          value: 'Gherkin',
                          name: 'format',
                          checked: 'gherkin' === xn,
                          onChange: function () {
                            return mn('gherkin');
                          }
                        }),
                        'Gherkin'
                      ]
                    }),
                    (0, v.jsxs)('label', {
                      htmlFor: 'rbtXls',
                      title: 'separator: "\\t"',
                      children: [
                        (0, v.jsx)('input', {
                          id: 'rbtXls',
                          type: 'radio',
                          value: 'xls',
                          name: 'format',
                          checked: 'xls' === xn,
                          onChange: function () {
                            return mn('xls');
                          }
                        }),
                        'XLS'
                      ]
                    })
                  ]
                })
              ]
            }),
            (0, v.jsxs)(M, {
              onMouseUp: Pn,
              children: [
                (0, v.jsxs)('aside', {
                  children: [
                    (0, v.jsx)(D, {
                      style: { width: '100%', textAlign: 'center' },
                      children: Hn(f).map(function (n, e) {
                        return (0, v.jsx)(
                          'a',
                          {
                            onClick: function () {
                              return (function (n) {
                                var e,
                                  t = r[n],
                                  o = (((e = {})[n] = t), e);
                                Q(o), U(n), en(void 0), On(), T((z = { expression: {} })), Z(z), On();
                              })(n);
                            },
                            style: 1 === Object.keys($).length && G === n ? { background: k } : {},
                            children: n.replace('formatOption', 'opt')
                          },
                          e
                        );
                      })
                    }),
                    f.map(function (n, e) {
                      return (0, v.jsx)(
                        J,
                        {
                          className: rn === e ? 'highlight' : '',
                          onMouseMove: function () {
                            return Rn(e, -1);
                          },
                          titles: Hn(f),
                          getTrigger: function (n) {
                            gn[e] = n;
                          },
                          onClick: Fn,
                          colHead: n,
                          isEditing: R === n,
                          targeted: R === n || 1 === Object.keys($).length ? G : void 0
                        },
                        e
                      );
                    })
                  ]
                }),
                (0, v.jsx)('section', {
                  children: (0, v.jsxs)('div', {
                    onMouseLeave: Pn,
                    children: [
                      (0, v.jsx)('div', {
                        style: An,
                        onMouseDown: function (n) {
                          dn([]), n.preventDefault();
                        },
                        children: u.map(function (n, e) {
                          return (0, v.jsx)(
                            'span',
                            {
                              children: (0, v.jsx)(J, {
                                colHead: n,
                                className: un === e ? 'highlight' : '',
                                getTrigger: function (n) {
                                  bn[e] = n;
                                },
                                onClick: In,
                                onMouseMove: function (n) {
                                  n.buttons === w && (Mn(void 0, e), dn([].concat(cn)), n.preventDefault());
                                },
                                isEditing: R === n,
                                style: { textAlign: 'center' },
                                children: (0, v.jsx)('i', {
                                  children: m === n ? (1 === E ? '\u2193' : '\u2191') : void 0
                                })
                              })
                            },
                            e
                          );
                        })
                      }),
                      f.map(function (n, e) {
                        return (0, v.jsx)(
                          'div',
                          {
                            onMouseDown: En,
                            style: An,
                            className: rn === e ? 'highlight' : '',
                            children: u.map(function (n, t) {
                              var r, o;
                              return (0, v.jsx)(
                                C,
                                {
                                  style:
                                    -1 !== Cn(e, t)
                                      ? { borderColor: j[5] + ' ' + j[2] + ' ' + j[2] + ' ' + j[5] }
                                      : {},
                                  onMouseMove: function (n) {
                                    return (
                                      Rn(e, t),
                                      (function (n) {
                                        void 0 !== un &&
                                          void 0 !== rn &&
                                          pn &&
                                          n.buttons === w &&
                                          (n.preventDefault(), Mn(rn, un), dn([].concat(cn)));
                                      })(n)
                                    );
                                  },
                                  className: un === t ? 'highlight' : '',
                                  children:
                                    null !==
                                      (o =
                                        null == L || null === (r = L[e]) || void 0 === r ? void 0 : r[t]) &&
                                    void 0 !== o
                                      ? o
                                      : '--'
                                },
                                t
                              );
                            })
                          },
                          e
                        );
                      })
                    ]
                  })
                })
              ]
            }),
            (0, v.jsxs)(A, {
              children: [
                (0, v.jsx)(H, {
                  onPaste: wn,
                  colSetting: $,
                  colHead: R,
                  focused: G,
                  insertAfter: function () {
                    var n = kn(),
                      e = n[0],
                      t = n[1],
                      r = n[2];
                    t.splice(e + 1, 0, { expression: {} }), r([].concat(t));
                  },
                  deleting: function () {
                    var n = kn(),
                      e = n[0],
                      t = n[1],
                      r = n[2];
                    t.splice(e, 1), T(void 0), r([].concat(t));
                  },
                  insertBefore: function () {
                    var n = kn(),
                      e = n[0],
                      t = n[1],
                      r = n[2];
                    t.splice(e, 0, { expression: {} }), r([].concat(t));
                  },
                  onChange: function () {
                    (null == W ? void 0 : W.expression) && R === W
                      ? Object.keys(W.expression).forEach(function (n) {
                          var e = n,
                            t = W.expression[e];
                          f.forEach(function (n, r) {
                            var o;
                            n.expression[e] !== t && (delete W.expression[e], (n.expression[e] = t)),
                              null === (o = gn[r]) || void 0 === o || o.call(gn);
                          });
                        })
                      : On();
                  }
                }),
                W && W === R
                  ? (0, v.jsx)(O, {
                      onPaste: wn,
                      children: (0, v.jsx)('span', { children: nn || 'paste multiple lines here' })
                    })
                  : (0, v.jsx)(v.Fragment, {})
              ]
            })
          ]
        });
      }
      function T() {
        return (0, v.jsx)(R, {
          defaultRows: [
            { num: 9.1, note: '+0.1' },
            { num: -9.1, note: '-0.1' },
            { num: 9.9, note: '+0.9' },
            { num: -9.9, note: '-0.9' },
            { num: 9.5, note: '+0.5' },
            { num: -9.5, note: '-0.5' },
            { num: 9.4, note: '+0.4' },
            { num: -9.4, note: '-0.4' },
            { num: 9.6, note: '+0.6' },
            { num: -9.6, note: '-0.6' }
          ],
          defaultCols: [
            { method: 'ceil' },
            { method: 'floor' },
            { method: 'round' },
            { method: 'fround' },
            { method: 'f16round' }
          ],
          colSelections: { num: Number.NaN, method: ['ceil', 'floor', 'round', 'fround', 'f16round'] },
          execute: (function () {
            var n = (0, f.A)(
              (0, d.A)().mark(function n(e) {
                var t, r;
                return (0, d.A)().wrap(function (n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        return n.abrupt(
                          'return',
                          e.method
                            ? JSON.stringify(
                                null == (t = Math[e.method])
                                  ? void 0
                                  : t.call(Math, null != (r = e.num) ? r : NaN)
                              )
                            : 'Method Required'
                        );
                      case 1:
                      case 'end':
                        return n.stop();
                    }
                }, n);
              })
            );
            return function (e) {
              return n.apply(this, arguments);
            };
          })()
        });
      }
      function z() {
        return (0, v.jsx)(T, {});
      }
    }
  }
]);
