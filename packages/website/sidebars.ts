import type { SidebarItemCategoryConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types.js';
const sidebars: { docsSidebar: SidebarItemCategoryConfig[] } = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      items: [
        'why',
        'comparison'
        // {
        //   type: 'doc',
        //   label: 'introduction',
        //   id: 'introduction'
        // }
      ]
    },
    {
      type: 'category',
      label: 'Key Features',
      collapsible: false,
      items: ['generateTests', 'generateComments', 'generateGherkins', 'testOracle']
    },
    {
      type: 'category',
      label: 'Demos',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Test Generation',
          collapsible: false,
          items: [
            {
              type: 'link',
              label: 'Complete Testing-codes',
              href: '/fullImplement'
            },
            {
              type: 'link',
              label: 'Missing step comments',
              href: '/genComments'
            },
            {
              type: 'link',
              label: 'Missing step implementations',
              href: '/genTestings'
            }
          ]
        },
        {
          type: 'category',
          label: 'Test Oracle',
          collapsible: false,
          items: [
            {
              type: 'link',
              label: 'Number[<rounding methods>]',
              href: '/oracleNumber'
            },
            {
              type: 'link',
              label: 'Intl.PluralRule',
              href: '/oracleIntl'
            }
          ]
        }
      ]
    }
  ]
};

export default sidebars;
