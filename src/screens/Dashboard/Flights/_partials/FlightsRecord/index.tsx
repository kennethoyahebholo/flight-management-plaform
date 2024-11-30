import React, { useState } from 'react';

import styles from './FlightsRecord.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { allColumn, tableTitles } from './FlightsRecord.data';
import { AppTable, StyledButton } from '../../../../../components';
import PlusIcon from '../../../../../assets/svg_component/PlusIcon';

const FlightsRecord = () => {
  const limit = 10;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const getQuery = (name: any) => new URLSearchParams(search).get(name);
  const searchs = getQuery('search') || '';
  const searchParams = new URLSearchParams(window.location.search);
  const [pageNumber, setPageNumber] = useState(1);

  const setPage = (pageNum: any) => {
    searchParams.set('page', pageNum);
    setPageNumber(pageNum);
    navigate(`/dashboard/flights/all?${searchParams.toString()}`);
  };

  const handleRowClick = (data: any) => {
    navigate(`/dashboard/flights/flight-details/${data?.id}`);
  };
  return (
    <div className={styles?.flightsRecordWrapper}>
      <div className={styles.flightsRecordWrapper__titleAndBtnWrapper}>
        <h4 className={styles.flightsRecordWrapper__title}>Flights</h4>
        <div className={styles.flightsRecordWrapper__buttonWrap}>
          <StyledButton
            title="Add Flights"
            className={styles.flightsRecordWrapper__leftButton}
            onClick={() => {
              //   dispatch(setIsShowTenantsModal(true));
              //   if (propertyLists?.length >= 1) {
              //     dispatch(setActiveTenantsModal('addTenantsModal'));
              //     return;
              //   }
              //   dispatch(setActiveTenantsModal('addPropertyRedirectModal'));
            }}
            icon={<PlusIcon stroke="white" />}
            rightIconBtnClassName={styles.flightsRecordWrapper__leftButtonIcon}
          />
        </div>
      </div>

      <div className={styles.flightsRecordWrapper__table}>
        <AppTable
          content={[]}
          allColumn={allColumn}
          tableTitles={tableTitles}
          page={pageNumber}
          pageSize={limit}
          count={0}
          setPage={setPage}
          loader={false}
          hasOnclick={handleRowClick}
          hasActionIcon
        />
      </div>
    </div>
  );
};

export default FlightsRecord;
