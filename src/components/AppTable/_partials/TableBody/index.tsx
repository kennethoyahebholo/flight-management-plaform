import React from 'react';

import truncateData from '../../../../utils/helpers/general/truncateData';
import { ContentType } from '../../AppTable.types';
import { ITableBody } from './TableBody.types';

import Styles from './TableBody.module.scss';

const TableBody = ({
  allowKeyArr,
  tableIndex,
  content,
  hasOnclick,
  hasActionButton,
  actionButton,
  handleActionButtonClick
}: ITableBody) => {
  const stripeTableColor = tableIndex % 2 === 0 ? Styles.wrapper__even : Styles.wrapper__odd;

  return (
    <tbody className={Styles.wrapper}>
      <tr className={stripeTableColor}>
        {allowKeyArr?.map((ele, index: number) => {
          const checkIfKeyIsStatus = ele === 'status';

          return (
            <td key={index} className={`${ele}`} onClick={() => hasOnclick?.(content)}>
              {checkIfKeyIsStatus ? (
                <p>{truncateData(content?.[ele], 22)}</p>
              ) : (
                <p className={`${content?.[ele as keyof ContentType]}`}>
                  {truncateData(content?.[ele as keyof ContentType] as string, 22)}
                </p>
              )}
            </td>
          );
        })}

        {hasActionButton && (
          <td className={Styles.wrapper__actionIconContainer}>
            <span onClick={() => handleActionButtonClick?.(content?.id)}>{actionButton}</span>
          </td>
        )}
      </tr>
    </tbody>
  );
};
export default TableBody;
