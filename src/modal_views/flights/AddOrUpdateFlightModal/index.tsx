import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';

import { IAddOrUpdateFlightModal, IFormData } from './AddOrUpdateFlightModal.types';
import { AddOrUpdateFlightsModalValidationSchema } from './AddOrUpdateFlightsModal.validation';

import AddOrUpdateFlightModalStyles from './AddOrUpdateFlightModal.module.scss';
import useToast from '../../../utils/helpers/general/useToast';
import { InputField, Modal, StyledButton } from '../../../components';

const AddOrUpdateFlightModal = ({
  isShowAddOrUpdateFlightsModal,
  onClickAwayAddOrUpdateFlightsModal,
  onCloseAddOrUpdateFlightsModal,
  createOrUpdateFlightApiData
  //   handleSuccessAction,
  //   setSelectedPropertyName,
  //   getAllRealtorPropertyPaginatedLoading,
  //   transformedData,
  //   handleChangePaymentAccount,
  //   updateTenantLoading
}: IAddOrUpdateFlightModal) => {
  const Toast = useToast();

  const addTenantsFormik = useFormik<IFormData>({
    validationSchema: AddOrUpdateFlightsModalValidationSchema,
    initialValues: {
      code: '',
      capacity: '',
      departureDate: '',
      files: [{ name: '', file: null }]
    },
    onSubmit: async (values) => {
      const variables = {
        code: values?.code,
        capacity: values?.capacity,
        departureDate: values?.departureDate,
        files: values?.files
      };
      //   setSelectedPropertyName(selectedProperty?.name);

      //   handleSuccessAction?.({ ...variables });
    }
  });

  const resetFormField = (argName: string, value: any) => {
    if (value) addTenantsFormik.setFieldValue(argName, value);
  };

  useEffect(() => {
    resetFormField('code', createOrUpdateFlightApiData?.code);
    resetFormField('capacity', createOrUpdateFlightApiData?.capacity);
    resetFormField(
      'departureDate',
      createOrUpdateFlightApiData?.departureDate
        ? moment(new Date(createOrUpdateFlightApiData?.departureDate)).format('YYYY-MM-DD')
        : ''
    );
  }, [createOrUpdateFlightApiData]);

  return (
    <Modal
      isShow={isShowAddOrUpdateFlightsModal}
      onClickAway={onClickAwayAddOrUpdateFlightsModal}
      onClose={onCloseAddOrUpdateFlightsModal}
      className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal}
      contentClassName={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__content}
      isShowBottomLogo={false}>
      <h4 className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__title}>
        {createOrUpdateFlightApiData?.isEditTenantDetails ? 'Flight Details' : 'Flight Information'}
      </h4>
      <p className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__subtitle}>
        {createOrUpdateFlightApiData?.isEditTenantDetails
          ? 'Please see the details of your flight below to make your changes'
          : 'Please see the details of your flight below to add them'}
      </p>
      <form
        className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__form}
        onSubmit={addTenantsFormik.handleSubmit}>
        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__input}>
          <InputField
            type="text"
            label="Code"
            name="code"
            value={addTenantsFormik?.values?.code}
            placeholder="Code"
            onChange={addTenantsFormik.handleChange}
            error={addTenantsFormik.submitCount > 0 && addTenantsFormik.errors.code}
          />
        </div>
        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__input}>
          <InputField
            type="text"
            label="capacity"
            name="capacity"
            value={addTenantsFormik?.values?.capacity}
            placeholder="Capacity"
            onChange={addTenantsFormik.handleChange}
            error={addTenantsFormik.submitCount > 0 && addTenantsFormik.errors.capacity}
          />
        </div>
        {/* <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__input}>
          <DateInput
            label="Departure Date"
            name="departureDate"
            value={addTenantsFormik?.values?.departureDate}
            placeholder="Departure Date"
            onChange={(value: any) => {
              addTenantsFormik.setFieldValue('departureDate', moment(value)?.format('YYYY-MM-DD'));
            }}
            error={addTenantsFormik.submitCount > 0 && addTenantsFormik.errors.departureDate}
          />
        </div> */}

        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__buttons}>
          <StyledButton
            title={
              createOrUpdateFlightApiData?.isEditTenantDetails
                ? 'Save Changes'
                : 'Review Your Schedule'
            }
            color="primary"
            borderRadius="8px"
            padding="12px 24px"
            type="submit"
            // disabled={updateTenantLoading}
            // isLoading={updateTenantLoading}
          />
          <StyledButton
            title="Cancel"
            // color="secondary"
            type="button"
            borderRadius="8px"
            padding="12px 24px"
            // backgroundColor="#eff0f1"
            onClick={onCloseAddOrUpdateFlightsModal}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddOrUpdateFlightModal;
