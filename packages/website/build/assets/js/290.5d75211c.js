'use strict';
(self.webpackChunkwebsite = self.webpackChunkwebsite || []).push([
  [290],
  {
    7292: (e, t, i) => {
      i.d(t, { A: () => a });
      i(5528);
      var n = i(7286),
        s = i(2431),
        o = i(8528),
        r = i(2388);
      function a(e) {
        var t = e.className;
        return (0, r.jsx)('main', {
          className: (0, n.A)('container margin-vert--xl', t),
          children: (0, r.jsx)('div', {
            className: 'row',
            children: (0, r.jsxs)('div', {
              className: 'col col--6 col--offset-3',
              children: [
                (0, r.jsx)(o.A, {
                  as: 'h1',
                  className: 'hero__title',
                  children: (0, r.jsx)(s.A, {
                    id: 'theme.NotFound.title',
                    description: 'The title of the 404 page',
                    children: 'Page Not Found'
                  })
                }),
                (0, r.jsx)('p', {
                  children: (0, r.jsx)(s.A, {
                    id: 'theme.NotFound.p1',
                    description: 'The first paragraph of the 404 page',
                    children: 'We could not find what you were looking for.'
                  })
                }),
                (0, r.jsx)('p', {
                  children: (0, r.jsx)(s.A, {
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
    },
    4290: (e, t, i) => {
      i.r(t), i.d(t, { default: () => h });
      i(5528);
      var n = i(2431),
        s = i(7960),
        o = i(2055),
        r = i(7292),
        a = i(2388);
      function h() {
        var e = (0, n.T)({ id: 'theme.NotFound.title', message: 'Page Not Found' });
        return (0, a.jsxs)(a.Fragment, {
          children: [(0, a.jsx)(s.be, { title: e }), (0, a.jsx)(o.A, { children: (0, a.jsx)(r.A, {}) })]
        });
      }
    }
  }
]);
