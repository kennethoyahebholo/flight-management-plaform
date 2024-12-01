import React from 'react';

import { ContentType, IAppTableComp } from './AppTable.types';
import Pagination from '../Pagination';

import { TableBody, TableHeader } from './_partials';
import SuspenseLoader from '../SuspenseLoader';
import EmptyTableRecord from './_partials/EmptyTableRecord';

import Styles from './AppTable.module.scss';
import EmptyStateIcon from '../../assets/svg_component/EmptyStateIcon';

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
  handleActionButtonClick,
  hasActionButton,
  actionButton
}: IAppTableComp) => {
  return loader ? (
    <div className={Styles.wrapper__emptyStateTableLoader}>
      <SuspenseLoader />
    </div>
  ) : (
    <div className={`${Styles.wrapper} table-responsive`} style={{ minHeight: '590px' }}>
      {count ? (
        <div>
          <div className={Styles.wrapper__tableRootCotainer}>
            <table>
              <TableHeader
                allowKeyArr={allColumn}
                formatLabels={tableTitles}
                hasActionButton={hasActionButton}
              />
              {content?.map((list: ContentType, index: number) => (
                <TableBody
                  tableIndex={index}
                  content={list}
                  key={index}
                  allowKeyArr={allColumn}
                  hasOnclick={hasOnclick}
                  actionButton={actionButton}
                  hasActionButton={hasActionButton}
                  handleActionButtonClick={handleActionButtonClick}
                />
              ))}
            </table>
          </div>

          {count > pageSize && (
            <div className={`${Styles.wrapper__paginationDivContainer} pagination_div_cover`}>
              <Pagination
                setPage={setPage}
                page={page as number}
                pageSize={pageSize}
                count={count}
              />
            </div>
          )}
        </div>
      ) : (
        <EmptyTableRecord
          icon={<EmptyStateIcon />}
          title={'No Record Found'}
          subtitle={'No flight record available'}
        />
      )}
    </div>
  );
};
export default AppTable;
