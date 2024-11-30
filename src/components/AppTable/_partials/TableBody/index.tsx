import React, { useState } from 'react';

import truncateData from '../../../../utils/helpers/general/truncateData';
import Styles from './TableBody.module.scss';

interface ITableBody {
  content: any;
  allowKeyArr: any;
  hasActionIcon?: boolean;
  hasOnclick?: any;
  actionIcon?: any;
  tableIndex?: any;
}
const TableBody = ({
  content,
  allowKeyArr,
  hasActionIcon,
  hasOnclick,
  actionIcon,
  tableIndex
}: ITableBody) => {
  // const checkIfActionIconIsArray = Array?.isArray(actionIcon);

  const stripeTableColor = tableIndex % 2 === 0 ? Styles.wrapper__even : Styles.wrapper__odd;

  const [isOpenDropdown, setIsOpenDropdown] = useState(null);

  return (
    <tbody className={Styles.wrapper}>
      <tr className={stripeTableColor}>
        {allowKeyArr?.map((ele: any, index: number) => {
          const checkIfEleIsArray = Array?.isArray(ele);

          const checkIfKeyIsStatus = ele === 'status';

          return (
            <td key={index} className={`${ele}`} onClick={() => hasOnclick?.(content)}>
              {checkIfEleIsArray ? (
                <div>
                  {ele?.map((eleWithLogo, key: number) => {
                    const text = content?.[eleWithLogo];

                    const isLogo =
                      text?.includes('logo') ||
                      text?.includes('.png') ||
                      text?.includes('.jpg') ||
                      text?.includes('.jpeg');
                    const isLogoCamelCase = text?.includes('Logo');

                    return (
                      <div key={key}>
                        {isLogo && (
                          <p
                            style={{
                              height: '24px',
                              width: '24px',
                              marginRight: '10px',
                              borderRadius: '100%',
                              objectFit: 'cover'
                            }}>
                            <img
                              src={content?.[eleWithLogo]}
                              alt="logo"
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </p>
                        )}
                        {isLogoCamelCase && (
                          <p
                            style={{
                              height: '24px',
                              width: '24px',
                              marginRight: '10px',
                              borderRadius: '100%',
                              border: '1px solid silver'
                            }}
                          />
                        )}
                        {!isLogo ? (
                          isLogoCamelCase ? (
                            ''
                          ) : (
                            <p className={`${content?.[eleWithLogo]}`}>
                              {truncateData(content?.[eleWithLogo], 22)}
                            </p>
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : checkIfKeyIsStatus ? (
                <p>
                  {' '}
                  hi
                  {/* <TableStatus status={truncateData(content?.[ele], 22)} />{' '} */}
                </p>
              ) : (
                <p className={`${content?.[ele]}`}>{truncateData(content?.[ele], 22)}</p>
              )}
            </td>
          );
        })}

        {hasActionIcon && (
          <td className={Styles.wrapper__actionIconContainer}>
            <span
              data-tooltip-id="actionIcon-tooltip"
              onClick={() => setIsOpenDropdown(content?.id)}>
              {actionIcon}
            </span>
            {/* {dropdownValues && isOpenDropdown === content?.id && (
              <TableActionDropdown
                data={dropdownValues}
                onClose={() => setIsOpenDropdown(null)}
                key={content?.id}
                onSelect={(selectedValue: any) => {
                  onDropdownSelect(selectedValue, content);
                  setIsOpenDropdown(null);
                }}
              />
            )} */}
          </td>
        )}
      </tr>
    </tbody>
  );
};
export default TableBody;
