import React from 'react';

import useToast from '../../../../utils/helpers/general/useToast';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setActiveFlightsModal,
  setCreateOrUpdateFlightApiData,
  setIsShowFlightsModal
} from '../../../../redux/slices/flights';
import AddOrUpdateFlightModal from '../../AddOrUpdateFlightModal';

const FlightsModalControl = () => {
  const toast = useToast();
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
        // handleSuccessAction={(data: any) => {
        //     if (createTenantApiData?.isEditTenantDetails) {
        //       handleUpdateTenantDetails({ ...createTenantApiData, ...data });
        //     } else {
        //       dispatch(setCreateTenantApiData({ ...createTenantApiData, ...data }));
        //       dispatch(setActiveTenantsModal('reviewScheduleModal'));
        //     }
        // }}
        // getAllRealtorPropertyPaginatedLoading={getAllRealtorPropertyPaginatedLoading}
        // handleChangePaymentAccount={() => {
        //   dispatch(setActiveTenantsModal('accountSetupModal'));
        // }}
        // updateTenantLoading={updateTenantLoading}
      />
    );

    switch (activeFlightsModal) {
      case 'addOrUpdateFlightsModal':
        return addOrUpdateFlightsModal;
      default:
        return null;
    }
  };

  return renderModal();
};

export default FlightsModalControl;
