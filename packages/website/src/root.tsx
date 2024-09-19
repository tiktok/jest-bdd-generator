import React from 'react';
import Layout from '@theme/Layout';

import DocSidebar from '@theme/DocSidebar';

import { default as sidebarItems } from '../sidebars';

export const CustomPageWrapper: React.FC<React.PropsWithChildren<{ path: string }>> = ({
  children,
  path
}) => {
  const sidebar = sidebarItems.docsSidebar.map((category) => {
    if (category.label === 'Demos') {
      return category;
    } else {
      return {
        type: 'link',
        label: category.label,
        href: `/${(category.items as any[])[0]}`
      };
    }
  });
  return (
    <Layout>
      <div className="row">
        <aside className="col col--3 theme-doc-sidebar-container padding-top--none">
          <DocSidebar path={path} sidebar={sidebar} />
        </aside>
        <main className="col col--9">{children}</main>
      </div>
    </Layout>
  );
};
