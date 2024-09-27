import type { Config } from '@docusaurus/types';
import type {
  SidebarItemCategoryConfig,
  SidebarItemConfig
} from '@docusaurus/plugin-content-docs/src/sidebars/types.js';
const BASE_URL = '/jest-bdd-generator';
export default {
  title: 'Docusaurus',
  baseUrl: BASE_URL,
  // Set the production url of your site here
  url: 'https://tiktok.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tiktok', // Usually your GitHub org/user name.
  projectName: 'jest-bdd-generator', // Usually your repo name.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  themeConfig: {
    prism: {
      additionalLanguages: ['gherkin']
    }
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          breadcrumbs: false,
          editUrl: 'https://github.com/tiktok/jest-bdd-generator/tree/main/packages/website/'
        }
        /*
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        */
        // theme: {
        //   customCss: './src/css/custom.css'
        // }
      }
    ]
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: '../sdk/docs',
        routeBasePath: 'references',

        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = reverseSidebarItems(await defaultSidebarItemsGenerator(args));
          return [
            {
              type: 'link',
              label: 'Home',
              href: BASE_URL
            },
            ...sidebarItems
          ];
        }
      }
    ]
  ]
} satisfies Config;
function reverseSidebarItems(items) {
  const result = items.map((item) => {
    if (item.type === 'category') {
      return { ...item, items: reverseSidebarItems(item.items), collapsed: false };
    }
    return item;
  });
  result.reverse();
  return result;
}
