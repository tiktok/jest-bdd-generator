import type { Config } from '@docusaurus/types';
export default {
  title: 'Docusaurus',
  baseUrl: '/jest-bdd-generator',
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
  ]
} satisfies Config;
