import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';

import { IAddOrUpdateFlightModal, IFormData } from './AddOrUpdateFlightModal.types';
import { AddOrUpdateFlightsModalValidationSchema } from './AddOrUpdateFlightsModal.validation';

import AddOrUpdateFlightModalStyles from './AddOrUpdateFlightModal.module.scss';
import useToast from '../../../utils/helpers/general/useToast';
import { DateInput, InputField, Modal, StyledButton } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  createFlight,
  createFlightWithPhoto,
  updateFlightDetails
} from '../../../redux/slices/flights/features';
import { ERROR_OCCURED_MESSAGE } from '../../../utils/constant';
import { setActiveFlightsModal } from '../../../redux/slices/flights';

const AddOrUpdateFlightModal = ({
  isShowAddOrUpdateFlightsModal,
  onClickAwayAddOrUpdateFlightsModal,
  onCloseAddOrUpdateFlightsModal,
  createOrUpdateFlightApiData
}: IAddOrUpdateFlightModal) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { isCreatingFlight, isCreatingFlightWithPhoto, isUpdatingFlightDetails } = useAppSelector(
    (state) => state.flights
  );

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

  const addTenantsFormik = useFormik<IFormData>({
    validationSchema: AddOrUpdateFlightsModalValidationSchema,
    initialValues: {
      code: '',
      capacity: '',
      departureDate: '',
      flightImage: null
    },
    onSubmit: async (values) => {
      // Initialize variables for the request
      const variables: {
        code: string;
        capacity: number;
        departureDate: string;
        photo?: string;
      } = {
        code: values?.code,
        capacity: Number(values?.capacity),
        departureDate: values?.departureDate
      };

      if (createOrUpdateFlightApiData?.isEditDetails) {
        handleUpdateFlightDetails(
          { ...variables, flightId: createOrUpdateFlightApiData?.flightId as string },
          dispatch
        );
        return;
      }

      // If there is a flight image, process it
      if (values.flightImage) {
        try {
          const reader = new FileReader();

          reader.onload = async (event: ProgressEvent<FileReader>) => {
            const base64Image = event.target?.result as string;

            if (base64Image) {
              variables.photo = base64Image;
              handleCreateFlightWithPhoto({ ...variables }, dispatch);
            } else {
              // Handle case where base64Image is null or undefined
              toast.error('Failed to process the image. Please try again.');
            }
          };

          // Read the image as a base64 string
          reader.readAsDataURL(values.flightImage);
        } catch (error: unknown) {
          toast.error('Failed to process the image. Please try again.');
          console.log(error);
        }
      } else {
        // If no image, just handle the flight creation without photo
        handleCreateFlightWithNoPhoto({ ...variables }, dispatch);
      }
    }
  });

  const handleUpdateFlightDetails = async (
    {
      code,
      capacity,
      departureDate,
      flightId
    }: { code: string; capacity: number; departureDate: string; flightId: string },
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const actionResult = await dispatch(
      updateFlightDetails({ code, capacity, departureDate, flightId })
    );
    if (updateFlightDetails.fulfilled.match(actionResult)) {
      const { id } = actionResult.payload;
      if (id) {
        dispatch(setActiveFlightsModal('addOrUpdateFlightsSuccessModal'));
      }
    } else if (updateFlightDetails.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURED_MESSAGE;
      toast.error(errorMessage);
    }
  };

  const handleCreateFlightWithPhoto = async (
    {
      code,
      capacity,
      departureDate,
      photo
    }: { code: string; capacity: number; departureDate: string; photo?: string },
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const actionResult = await dispatch(
      createFlightWithPhoto({ code, capacity, departureDate, photo })
    );
    if (createFlightWithPhoto.fulfilled.match(actionResult)) {
      const { id } = actionResult.payload;
      if (id) {
        dispatch(setActiveFlightsModal('addOrUpdateFlightsSuccessModal'));
      }
    } else if (createFlightWithPhoto.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURED_MESSAGE;
      toast.error(errorMessage);
    }
  };

  const handleCreateFlightWithNoPhoto = async (
    { code, capacity, departureDate }: { code: string; capacity: number; departureDate: string },
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const actionResult = await dispatch(createFlight({ code, capacity, departureDate }));
    if (createFlight.fulfilled.match(actionResult)) {
      const { id } = actionResult.payload;
      if (id) {
        dispatch(setActiveFlightsModal('addOrUpdateFlightsSuccessModal'));
      }
    } else if (createFlight.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURED_MESSAGE;
      toast.error(errorMessage);
    }
  };

  const resetFormField = (argName: string, value: string) => {
    if (value) addTenantsFormik.setFieldValue(argName, value);
  };

  useEffect(() => {
    resetFormField('code', createOrUpdateFlightApiData?.code as string);
    resetFormField('capacity', createOrUpdateFlightApiData?.capacity as string);
    resetFormField(
      'departureDate',
      createOrUpdateFlightApiData?.departureDate
        ? moment(new Date(createOrUpdateFlightApiData?.departureDate)).format('YYYY-MM-DD')
        : ''
    );
  }, [createOrUpdateFlightApiData]);

  const isLoading = isCreatingFlight || isCreatingFlightWithPhoto || isUpdatingFlightDetails;

  const validateFileSize = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('The selected image exceeds the size limit of 2MB.');
      addTenantsFormik.setFieldValue('flightImage', null);
      return;
    }
    addTenantsFormik.setFieldValue('flightImage', file);
  };

  return (
    <Modal
      isShow={isShowAddOrUpdateFlightsModal}
      onClickAway={onClickAwayAddOrUpdateFlightsModal}
      onClose={onCloseAddOrUpdateFlightsModal}
      className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal}
      contentClassName={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__content}
      isShowBottomLogo={true}>
      <h4 className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__title}>
        {createOrUpdateFlightApiData?.isEditDetails ? 'Flight Details' : 'Flight Information'}
      </h4>
      <p className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__subtitle}>
        {createOrUpdateFlightApiData?.isEditDetails
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
            type="number"
            label="capacity"
            name="capacity"
            value={addTenantsFormik?.values?.capacity}
            placeholder="Capacity"
            onChange={addTenantsFormik.handleChange}
            minValue="1"
            error={addTenantsFormik.submitCount > 0 && addTenantsFormik.errors.capacity}
          />
        </div>
        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__input}>
          <DateInput
            label="Departure Date"
            name="departureDate"
            value={addTenantsFormik?.values?.departureDate}
            placeholder="Departure Date"
            onChange={(value: Date | null) => {
              addTenantsFormik.setFieldValue('departureDate', moment(value)?.format('YYYY-MM-DD'));
            }}
            error={addTenantsFormik.submitCount > 0 && addTenantsFormik.errors.departureDate}
          />
        </div>

        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__input}>
          <label
            htmlFor="flightImage"
            className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__label}>
            Upload Flight Image (Optional)
          </label>
          <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__inputCustom}>
            <input
              id="flightImage"
              name="flightImage"
              type="file"
              accept="image/*"
              className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__inputCustomValue}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  validateFileSize(file);
                }
              }}
            />
          </div>
        </div>

        <div className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__buttons}>
          <StyledButton
            title={
              isLoading
                ? 'Loading...'
                : createOrUpdateFlightApiData?.isEditDetails
                  ? 'Save Changes'
                  : 'Submit'
            }
            color="primary"
            type="submit"
            disabled={isLoading}
          />
          <StyledButton
            title="Cancel"
            type="button"
            className={AddOrUpdateFlightModalStyles.AddOrUpdateFlightsModal__cancelBtn}
            onClick={onCloseAddOrUpdateFlightsModal}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddOrUpdateFlightModal;
