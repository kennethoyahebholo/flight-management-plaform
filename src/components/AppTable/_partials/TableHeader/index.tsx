import React from 'react';

import Styles from './TableHeader.module.scss';

interface ITableHeader {
  formatLabels?: any;
  allowKeyArr?: any;
  hasActionIcon?: boolean;
}
const TableHeader = ({ formatLabels, allowKeyArr, hasActionIcon }: ITableHeader) => {
  return (
    <thead className={Styles.wrapper}>
      <tr>
        {allowKeyArr?.map((list: any, index: any) => {
          const getLabelThatHasLogo = Array?.isArray(list);
          return (
            <th key={index}>
              <div
                className={Styles.wrapper__headerTitle}
                style={{ display: 'flex', alignItems: 'center' }}>
                {getLabelThatHasLogo
                  ? list?.map((listOutInnerItems: any) => {
                      return formatLabels[listOutInnerItems] && formatLabels[listOutInnerItems];
                    })
                  : formatLabels[list]}
              </div>
            </th>
          );
        })}

        {hasActionIcon && <th>Action</th>}
      </tr>
    </thead>
  );
};
export default TableHeader;
