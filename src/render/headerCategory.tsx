import { PageHeader } from '@arco-design/web-react';
import { iconMapCategory } from '@/constants';

function getIconByCategory(category: string): JSX.Element {
  const icon = iconMapCategory[category];
  if (icon == null) return <></>;
  else {
    return <span style={{ marginRight: '6px' }}>
      {icon}
    </span>;
  }
}

export function renderHeaderCategory(category: string): JSX.Element {
  return (
    <PageHeader
      title={(
        <div>
          {getIconByCategory(category)}
          {category}
        </div>
      )}
      subTitle={`共9个插件包`}
    />
  );
}
