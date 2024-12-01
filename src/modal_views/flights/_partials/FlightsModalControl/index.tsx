import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setActiveFlightsModal,
  setCreateOrUpdateFlightApiData,
  setIsShowFlightsModal,
  setRefetchGetFlightsData
} from '../../../../redux/slices/flights';
import AddOrUpdateFlightModal from '../../AddOrUpdateFlightModal';
import { ResponseModal } from '../../../global';
import SuccessIcon from '../../../../assets/svg_component/SuccessIcon';
import DeleteFlightModal from '../../DeleteFlightModal';

const FlightsModalControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeFlightsModal, isShowFlightsModal, createOrUpdateFlightApiData } = useAppSelector(
    (state) => state.flights
  );

  const onModalClose = () => {
    dispatch(setIsShowFlightsModal(false));
    dispatch(setCreateOrUpdateFlightApiData({}));
    dispatch(setActiveFlightsModal(''));
  };

  const renderModal = () => {
    const addOrUpdateFlightsModal = (
      <AddOrUpdateFlightModal
        isShowAddOrUpdateFlightsModal={isShowFlightsModal}
        onCloseAddOrUpdateFlightsModal={onModalClose}
        onClickAwayAddOrUpdateFlightsModal={onModalClose}
        createOrUpdateFlightApiData={createOrUpdateFlightApiData}
      />
    );

    const addOrUpdateFlightsSuccessModal = (
      <ResponseModal
        isShow
        isShowCloseIcon={false}
        title={
          createOrUpdateFlightApiData?.isEditDetails
            ? 'Flight Successfully Updated! '
            : 'Flight Successfully Added!'
        }
        icon={<SuccessIcon />}
        subTitle={
          createOrUpdateFlightApiData?.isEditDetails
            ? 'The  flight has been updated successfully.'
            : 'The new flight has been added to the system and is now ready for management.'
        }
        btnTitle="Go to Flights"
        onClick={() => {
          navigate('/dashboard/flights/all?page=1');
          dispatch(setRefetchGetFlightsData(true));
          onModalClose();
        }}
      />
    );

    const deleteFlightModal = (
      <DeleteFlightModal
        showDeleteFlightModal={isShowFlightsModal}
        onClickAwayDeleteFlightModal={onModalClose}
        onCloseDeleteFlightModal={onModalClose}
        onCancelDeleteFlightModal={onModalClose}
        createOrUpdateFlightApiData={createOrUpdateFlightApiData}
      />
    );

    switch (activeFlightsModal) {
      case 'addOrUpdateFlightsModal':
        return addOrUpdateFlightsModal;
      case 'addOrUpdateFlightsSuccessModal':
        return addOrUpdateFlightsSuccessModal;
      case 'deleteFlightModal':
        return deleteFlightModal;
      default:
        return null;
    }
  };

  return renderModal();
};

export default FlightsModalControl;
