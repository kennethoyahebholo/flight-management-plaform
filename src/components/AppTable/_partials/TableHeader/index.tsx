import React from 'react';

import { ITableHeader } from './TableHeader.types';

import Styles from './TableHeader.module.scss';

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
