import { PageHeader } from '@arco-design/web-react';
import { iconMapCategory } from '@/constants';

function getIconByCategory(category: string): JSX.Element {
  const icon = iconMapCategory[category];
  if (icon == null) return <></>;
  else {
    return (
      <span className='header__title__icon'>
      {icon}
    </span>
    );
  }
}

export function renderHeaderCategory(category: string): JSX.Element {
  return (
    <PageHeader
      title={(
        <div className='flex-container--center'>
          {getIconByCategory(category)}
          <span className='header__title__text'>
            {category}
          </span>
        </div>
      )}
      subTitle={`共9个插件包`}
    />
  );
}
