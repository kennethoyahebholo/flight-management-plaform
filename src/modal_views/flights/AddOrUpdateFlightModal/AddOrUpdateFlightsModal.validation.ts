import * as Yup from 'yup';

export const AddOrUpdateFlightsModalValidationSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
  capacity: Yup.string().required('Required'),
  departureDate: Yup.string().required('Required')
});
