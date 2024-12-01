import * as Yup from 'yup';

export const AddOrUpdateFlightsModalValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .length(6, 'The code must be exactly 6 characters')
    .matches(/^[A-Za-z]+$/, 'The code must contain only alphabetic characters'),
  capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be greater than 0'),
  departureDate: Yup.string().required('Required')
});
