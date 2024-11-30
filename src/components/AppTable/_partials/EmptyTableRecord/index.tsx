import React from 'react';

import { IEmptyTableRecord } from './EmptyTableRecord.types';

import EmptyTableRecordStyle from './EmptyTableRecord.module.scss';
import StyledButton from '../../../StyledButton';

const EmptyTableRecord = ({
  icon,
  title,
  subtitle,
  btnTitle,
  showActionBtn,
  onActionButtonPress
}: IEmptyTableRecord) => {
  return (
    <div className={EmptyTableRecordStyle.emptyTable}>
      <div className={EmptyTableRecordStyle.emptyTable__content}>
        <div className={EmptyTableRecordStyle.emptyTable__icon}>{icon}</div>
        {title && <h4 className={EmptyTableRecordStyle.emptyTable__title}>{title}</h4>}
        {subtitle && <h6 className={EmptyTableRecordStyle.emptyTable__subtitle}>{subtitle}</h6>}
        {showActionBtn && (
          <div className={EmptyTableRecordStyle.emptyTable__button}>
            {btnTitle && (
              <StyledButton
                onClick={onActionButtonPress}
                className={EmptyTableRecordStyle.emptyTable__buttonItem}
                title={btnTitle}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default EmptyTableRecord;
