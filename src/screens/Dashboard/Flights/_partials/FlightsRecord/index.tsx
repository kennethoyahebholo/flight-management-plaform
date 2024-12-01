import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { allColumn, tableTitles } from './FlightsRecord.data';
import { AppTable, InputField, StyledButton } from '../../../../../components';
import {
  setActiveFlightsModal,
  setCreateOrUpdateFlightApiData,
  setIsShowFlightsModal,
  setRefetchGetFlightsData
} from '../../../../../redux/slices/flights';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getFlights } from '../../../../../redux/slices/flights/features';
import { ERROR_OCCURED_MESSAGE } from '../../../../../utils/constant';
import { ContentType } from '../../../../../components/AppTable/AppTable.types';
import useToast from '../../../../../utils/helpers/general/useToast';

import PlusIcon from '../../../../../assets/svg_component/PlusIcon';

import styles from './FlightsRecord.module.scss';

const FlightsRecord = () => {
  const limit = 10;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { refetchGetFlightsData, isGettingFlights, createOrUpdateFlightApiData } = useAppSelector(
    (state) => state.flights
  );
  const { search } = useLocation();
  const getQuery = (name: string): string | null => new URLSearchParams(search).get(name);
  const searchQuery = getQuery('search') || '';
  const searchParams = new URLSearchParams(window.location.search);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [flightData, setFlightData] = useState<{
    count: number;
    resources: ContentType[];
    total: number;
  }>();

  const setPage = (pageNum: number): void => {
    searchParams.set('page', pageNum.toString());
    setPageNumber(pageNum);
    navigate(`/dashboard/flights/all?${searchParams.toString()}`);
  };

  const handleGetFlightData = async (
    page: number,
    pageSize: number,
    search: string,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const actionResult = await dispatch(getFlights({ page, pageSize, code: search }));
    if (getFlights.fulfilled.match(actionResult)) {
      setFlightData(actionResult.payload);
    } else if (getFlights.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURED_MESSAGE;
      toast.error(errorMessage);
    }

    return () => {
      dispatch(setRefetchGetFlightsData(false));
    };
  };

  useEffect(() => {
    handleGetFlightData(pageNumber, limit, searchTerm, dispatch);
  }, [pageNumber, searchTerm, limit, refetchGetFlightsData]);

  const handleRowClick = (data: { id: string }) => {
    navigate(`/dashboard/flights/flight-details/${data?.id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Reset to first page when searching
    setPageNumber(1);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('search', value);
    searchParams.set('page', '1');
    navigate(`/dashboard/flights/all?${searchParams.toString()}`);
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
      {(flightData?.resources ?? []).length > 0 && (
        <div className={styles.flightsRecordWrapper__searchInput}>
          <InputField
            type="text"
            placeholder="Search by code..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only alphabets (uppercase and lowercase)
              if (/^[a-zA-Z]*$/.test(value)) {
                handleSearch(e);
              }
            }}
            hidePlaceholderAnimation
          />
        </div>
      )}

      <div className={styles.flightsRecordWrapper__table}>
        <AppTable
          content={flightData?.resources as ContentType[]}
          allColumn={allColumn}
          tableTitles={tableTitles}
          page={pageNumber}
          pageSize={limit}
          count={flightData?.count}
          setPage={setPage}
          loader={isGettingFlights}
          hasOnclick={handleRowClick}
          handleActionButtonClick={(id: string) => {
            dispatch(setActiveFlightsModal('deleteFlightModal'));
            dispatch(setIsShowFlightsModal(true));
            dispatch(
              setCreateOrUpdateFlightApiData({ ...createOrUpdateFlightApiData, flightId: id })
            );
          }}
          hasActionButton
          actionButton={
            <StyledButton
              type="button"
              title="Delete"
              className={styles.flightsRecordWrapper__tableActionBtn}
            />
          }
        />
      </div>
    </div>
  );
};

export default FlightsRecord;
