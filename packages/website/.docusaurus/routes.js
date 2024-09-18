import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/jest-bdd-generator/__docusaurus/debug/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/', '3e2'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/config/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/config/', '21d'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/content/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/content/', '3f9'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/globalData/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/globalData/', 'ed4'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/metadata/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/metadata/', '815'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/registry/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/registry/', '837'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/__docusaurus/debug/routes/',
    component: ComponentCreator('/jest-bdd-generator/__docusaurus/debug/routes/', '3ff'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/',
    component: ComponentCreator('/jest-bdd-generator/blog/', 'c18'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/2016/03/11/blog-post/',
    component: ComponentCreator('/jest-bdd-generator/blog/2016/03/11/blog-post/', '409'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/2017/04/10/blog-post-two/',
    component: ComponentCreator('/jest-bdd-generator/blog/2017/04/10/blog-post-two/', '9b2'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/2017/09/25/testing-rss/',
    component: ComponentCreator('/jest-bdd-generator/blog/2017/09/25/testing-rss/', '7ec'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/2017/09/26/adding-rss/',
    component: ComponentCreator('/jest-bdd-generator/blog/2017/09/26/adding-rss/', '6ed'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/2017/10/24/new-version-1.0.0/',
    component: ComponentCreator('/jest-bdd-generator/blog/2017/10/24/new-version-1.0.0/', '330'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/blog/archive/',
    component: ComponentCreator('/jest-bdd-generator/blog/archive/', '8cc'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/genTestings/',
    component: ComponentCreator('/jest-bdd-generator/genTestings/', '662'),
    exact: true
  },
  {
    path: '/jest-bdd-generator/',
    component: ComponentCreator('/jest-bdd-generator/', 'cc3'),
    routes: [
      {
        path: '/jest-bdd-generator/',
        component: ComponentCreator('/jest-bdd-generator/', '0a2'),
        routes: [
          {
            path: '/jest-bdd-generator/',
            component: ComponentCreator('/jest-bdd-generator/', 'c0b'),
            routes: [
              {
                path: '/jest-bdd-generator/genComments/',
                component: ComponentCreator('/jest-bdd-generator/genComments/', 'd32'),
                exact: true,
                sidebar: 'docsSidebar'
              },
              {
                path: '/jest-bdd-generator/genGherkins/',
                component: ComponentCreator('/jest-bdd-generator/genGherkins/', '6c8'),
                exact: true,
                sidebar: 'docsSidebar'
              },
              {
                path: '/jest-bdd-generator/genTests/',
                component: ComponentCreator('/jest-bdd-generator/genTests/', '221'),
                exact: true,
                sidebar: 'docsSidebar'
              },
              {
                path: '/jest-bdd-generator/introduction/',
                component: ComponentCreator('/jest-bdd-generator/introduction/', '18f'),
                exact: true,
                sidebar: 'docsSidebar'
              },
              {
                path: '/jest-bdd-generator/mapping/',
                component: ComponentCreator('/jest-bdd-generator/mapping/', 'a12'),
                exact: true,
                sidebar: 'docsSidebar'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
