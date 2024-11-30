import * as Yup from 'yup';

export const passwordValidation = Yup.object().shape({
  fullName: Yup.string().required('Required').min(2, 'Please enter a valid first name'),
  email: Yup.string().email('Invalid').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/([a-z])/, 'Must contain at least one lowercase letter')
    .matches(/(\W)/, 'Must contain at least one special character')
});
