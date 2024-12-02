import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FlightsModalControl } from '../../../../modal_views/flights/_partials';
import { getFlightDetails } from '../../../../redux/slices/flights/features';
import { useAppDispatch } from '../../../../redux/hooks';
import { ERROR_OCCURRED_MESSAGE } from '../../../../utils/constant';
import useToast from '../../../../utils/helpers/general/useToast';
import {
  setActiveFlightsModal,
  setCreateOrUpdateFlightApiData,
  setIsShowFlightsModal
} from '../../../../redux/slices/flights';

import EditIconNew from '../../../../assets/svg_component/EditIconNew';
import ArrowHeadIcon from '../../../../assets/svg_component/ArrowHeadIcon';

import FlightDetailsStyles from './FlightDetails.module.scss';

const FlightDetails = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [flightData, setFlightData] = useState<{
    capacity: number;
    code: string;
    departureDate: string;
    id: string;
    img: string;
    status: string;
  }>();
  const { flightId } = useParams<{ flightId: string }>();

  const handleGetFlightData = async (id: string, dispatch: ReturnType<typeof useAppDispatch>) => {
    const actionResult = await dispatch(getFlightDetails({ flightId: id }));
    if (getFlightDetails.fulfilled.match(actionResult)) {
      setFlightData(actionResult.payload);
    } else if (getFlightDetails.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURRED_MESSAGE;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    handleGetFlightData(flightId as string, dispatch);
  }, []);

  const handleEditFlightDetails = () => {
    dispatch(setIsShowFlightsModal(true));
    dispatch(
      setCreateOrUpdateFlightApiData({
        code: flightData?.code,
        capacity: flightData?.capacity,
        departureDate: flightData?.departureDate,
        flightId: flightData?.id,
        isEditDetails: true
      })
    );
    dispatch(setActiveFlightsModal('addOrUpdateFlightsModal'));
  };

  const payload = [
    {
      id: 1,
      key: 'Code',
      value: flightData?.code || '*******'
    },
    {
      id: 2,
      key: 'Capacity',
      value: flightData?.capacity || '*******'
    },
    {
      id: 3,
      key: 'Departure Date',
      value: flightData?.departureDate || '*******'
    }
  ];

  return (
    <div className={FlightDetailsStyles.FlightDetails}>
      <FlightsModalControl />
      <div className={FlightDetailsStyles.FlightDetails__pageHeader}>
        <Link to="/dashboard/flights/all" className={FlightDetailsStyles.FlightDetails__backLink}>
          <ArrowHeadIcon />
          <span>Back to All Flights</span>
        </Link>

        <div
          className={FlightDetailsStyles.FlightDetails__editBtn}
          onClick={handleEditFlightDetails}>
          <span>Edit Details</span>
          <span className={FlightDetailsStyles.FlightDetails__editIcon}>
            <EditIconNew />
          </span>
        </div>
      </div>
      <div className={FlightDetailsStyles.FlightDetails__pageBody}>
        <div className={FlightDetailsStyles.FlightDetails__cardLabelAndTitle}>
          {payload?.map(({ id, key, value }) => (
            <div key={id} className={FlightDetailsStyles.FlightDetails__cardCover}>
              <div className={`${FlightDetailsStyles.FlightDetails__cardTitle}`}>{value}</div>
              <div className={FlightDetailsStyles.FlightDetails__cardLabel}>{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
