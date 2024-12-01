import React from 'react';

import Styles from './TableHeader.module.scss';

interface ITableHeader {
  formatLabels: Record<string, string>;
  allowKeyArr: string[];
  hasActionButton?: boolean;
}
const TableHeader = ({ formatLabels, allowKeyArr, hasActionButton }: ITableHeader) => {
  return (
    <thead className={Styles.wrapper}>
      <tr>
        {allowKeyArr?.map((list, index: number) => {
          return (
            <th key={index}>
              <div
                className={Styles.wrapper__headerTitle}
                style={{ display: 'flex', alignItems: 'center' }}>
                {formatLabels[list]}
              </div>
            </th>
          );
        })}

        {hasActionButton && <th>Action</th>}
      </tr>
    </thead>
  );
};
export default TableHeader;
