import React, { useState } from 'react';

import styles from './FlightsRecord.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { allColumn, flightData, tableTitles } from './FlightsRecord.data';
import { AppTable, StyledButton } from '../../../../../components';
import PlusIcon from '../../../../../assets/svg_component/PlusIcon';
import { setActiveFlightsModal, setIsShowFlightsModal } from '../../../../../redux/slices/flights';
import { useAppDispatch } from '../../../../../redux/hooks';

const FlightsRecord = () => {
  const limit = 10;
  const dispatch = useAppDispatch();
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
              dispatch(setIsShowFlightsModal(true));
              dispatch(setActiveFlightsModal('addOrUpdateFlightsModal'));
            }}
            icon={<PlusIcon stroke="white" />}
            rightIconBtnClassName={styles.flightsRecordWrapper__leftButtonIcon}
          />
        </div>
      </div>

      <div className={styles.flightsRecordWrapper__table}>
        <AppTable
          content={flightData?.resources}
          allColumn={allColumn}
          tableTitles={tableTitles}
          page={pageNumber}
          pageSize={limit}
          count={flightData?.count}
          setPage={setPage}
          loader={false}
          hasOnclick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default FlightsRecord;
