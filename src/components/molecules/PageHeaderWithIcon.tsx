import React from "react";
import {PageHeader} from "@arco-design/web-react";

interface Props {
  title: string
  icon?: React.ReactElement
  subTitle?: React.ReactElement | string
}

export const PageHeaderWithIcon = ({title, icon, subTitle}: Props) => {
  return (
    <PageHeader
      title={icon ? (
        <div className='flex-container--center'>
          {
            <span
              className='header__title__icon'
            >
                {icon}
              </span>
          }
          <span className='header__title__text'>
                {title}
              </span>
        </div>
      ) : title}
      subTitle={subTitle}
    />
  )
}
