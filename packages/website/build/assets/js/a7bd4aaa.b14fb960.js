'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [98],
  {
    9782: (e, n, s) => {
      s.r(n), s.d(n, { default: () => d });
      s(5528);
      var r = s(7960);
      function t(e, n) {
        return 'docs-' + e + '-' + n;
      }
      var i = s(2655),
        o = s(6815),
        a = s(7812),
        c = s(2388);
      function u(e) {
        var n = e.version;
        return (0, c.jsxs)(c.Fragment, {
          children: [
            (0, c.jsx)(a.A, { version: n.version, tag: t(n.pluginId, n.version) }),
            (0, c.jsx)(r.be, {
              children: n.noIndex && (0, c.jsx)('meta', { name: 'robots', content: 'noindex, nofollow' })
            })
          ]
        });
      }
      function l(e) {
        var n = e.version,
          s = e.route;
        return (0, c.jsx)(r.e3, {
          className: n.className,
          children: (0, c.jsx)(i.n, { version: n, children: (0, o.v)(s.routes) })
        });
      }
      function d(e) {
        return (0, c.jsxs)(c.Fragment, {
          children: [(0, c.jsx)(u, Object.assign({}, e)), (0, c.jsx)(l, Object.assign({}, e))]
        });
      }
    }
  }
]);
