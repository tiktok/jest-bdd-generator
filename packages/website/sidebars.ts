import type {
  SidebarItemCategoryConfig,
  SidebarItemConfig
} from '@docusaurus/plugin-content-docs/src/sidebars/types.js';
const sidebars: { docsSidebar: Array<SidebarItemCategoryConfig | SidebarItemConfig> } = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      items: [
        'introduction/why',
        'introduction/comparison'
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
      items: ['generateTests', 'generateReports', 'testOracle']
    },

    {
      type: 'category',
      label: 'More Features',
      collapsible: false,
      items: ['generateComments', 'generateGherkins']
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
          items: ['demos/fullImplement', 'demos/generateTests', 'demos/generateComments']
        },
        {
          type: 'category',
          label: 'Test Oracle',
          collapsible: false,
          items: ['demos/oracleNumber', 'demos/oracleIntl']
        }
      ]
    },

    {
      type: 'link',
      label: 'API References',
      href: '/references/lib/transpiler.api'
    }
  ]
};

export default sidebars;
