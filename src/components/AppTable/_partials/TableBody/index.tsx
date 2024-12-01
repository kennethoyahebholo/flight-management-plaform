import React, { ReactNode } from 'react';

import truncateData from '../../../../utils/helpers/general/truncateData';
import Styles from './TableBody.module.scss';
import { ContentType } from '../../AppTable.types';
interface ITableBody {
  allowKeyArr: string[];
  tableIndex: number;
  content: ContentType;
  hasOnclick?: (rowData: ContentType) => void;
  actionButton?: ReactNode;
  handleActionButtonClick?: (id: string) => void;
  hasActionButton?: boolean;
}
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
                  {truncateData(content?.[ele as keyof ContentType], 22)}
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
