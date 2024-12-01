import React from 'react';

import { IAppTableComp } from './AppTable.types';
import Pagination from '../Pagination';
// import EmptyStateLoader from '../EmptyStateLoader';
// import EmptyTableRecord from '../EmptyTableRecord';
// import { ReactComponent as EmptyRentIcon } from '../../assets/images/empty-rent-icon.svg';

import Styles from './AppTable.module.scss';

import { useAppSelector } from '../../redux/hooks';
import { TableBody, TableHeader } from './_partials';
import SuspenseLoader from '../SuspenseLoader';
import EmptyTableRecord from './_partials/EmptyTableRecord';

const AppTable = ({
  content,
  allColumn,
  tableTitles,
  page,
  pageSize,
  count,
  setPage,
  loader,
  hasOnclick,
  actionIcon,
  emptyTableIcon,
  emptyTableTitle,
  emptyTableSubTitle,
  showActionBtn,
  onActionButtonPress,
  btnTitle,
  tableFrameMinHeight,
  limitValue,
  setLimitValue
}: IAppTableComp) => {
  //   const { search } = useAppSelector((data: any) => data?.globalSearch);
  const search = false;

  return loader ? (
    <div className={Styles.wrapper__emptyStateTableLoader}>
      <SuspenseLoader />
    </div>
  ) : (
    <div
      className={`${Styles.wrapper} table-responsive`}
      style={{ minHeight: tableFrameMinHeight || '590px' }}>
      {count ? (
        <div>
          <div className={Styles.wrapper__tableRootCotainer}>
            <table>
              <TableHeader allowKeyArr={allColumn} formatLabels={tableTitles} />
              {content?.map((list: any, index: any) => (
                <TableBody
                  tableIndex={index}
                  content={list}
                  key={index}
                  allowKeyArr={allColumn}
                  hasOnclick={hasOnclick}
                  actionIcon={actionIcon}
                />
              ))}
            </table>
          </div>

          {count > pageSize && (
            <div className={`${Styles.wrapper__paginationDivContainer} pagination_div_cover`}>
              <Pagination
                setPage={setPage}
                page={page}
                pageSize={pageSize}
                count={count}
                limitValue={limitValue}
                setLimitValue={setLimitValue}
              />
            </div>
          )}
        </div>
      ) : search ? (
        <EmptyTableRecord
          icon={emptyTableIcon}
          title="No Record Found"
          subtitle={`Your search “${search}” did not match any record`}
        />
      ) : (
        <EmptyTableRecord
          btnTitle={btnTitle}
          icon={emptyTableIcon}
          title={emptyTableTitle || 'No Record Found'}
          subtitle={emptyTableSubTitle || 'No flight record available'}
          showActionBtn={showActionBtn}
          onActionButtonPress={onActionButtonPress}
        />
      )}
    </div>
  );
};
export default AppTable;
