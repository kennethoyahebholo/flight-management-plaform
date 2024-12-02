import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import useToast from '../../utils/helpers/general/useToast';
import { register } from '../../redux/slices/auth/features';
import { ERROR_OCCURRED_MESSAGE } from '../../utils/constant';
import { InputField, PasswordStrengthMeter, StyledButton } from '../../components';
import AuthBackground from '../../components/AuthBackground';
import { passwordValidation } from './Register.validation';

import { ReactComponent as RadioCheckSuccessIcon } from '../../assets/images/radio-check-success-icon.svg';
import { ReactComponent as RadioCheckErrorIcon } from '../../assets/images/radio-check-fail-icon.svg';

import RegisterStyles from './register.module.scss';

const Register = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [isEightError, setIsEightError] = useState<boolean>(true);
  const [isUpperError, setIsUpperError] = useState<boolean>(true);
  const [isLowerError, setIsLowerError] = useState<boolean>(true);
  const [isSpecialError, setIsSpecialError] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const registerFormik = useFormik({
    validationSchema: passwordValidation,
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      const { fullName, email, password } = values;
      handleRegister(fullName, email, password, dispatch);
    }
  });

  const handleRegister = async (
    name: string,
    email: string,
    confirmPassword: string,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    setIsLoading(true);
    const actionResult = await dispatch(register({ name, email, password: confirmPassword }));
    if (register.fulfilled.match(actionResult)) {
      const { email, id } = actionResult.payload;
      if (email && id) {
        toast.success('Account created successfully');

        navigate(`/`);
        setIsLoading(false);
      }
    } else if (register.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURRED_MESSAGE;
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    passwordValidation
      .validate(
        {
          password: registerFormik.values.password
        },
        { abortEarly: false }
      )
      .then((valid) => {
        if (valid) {
          setIsEightError(false);
          setIsUpperError(false);
          setIsLowerError(false);
          setIsSpecialError(false);
        }
      })
      .catch((err) => {
        if (!err.errors.includes('Must contain at least one uppercase letter')) {
          setIsUpperError(false);
        } else {
          setIsUpperError(true);
        }

        if (!err.errors.includes('Must contain at least one lowercase letter')) {
          setIsLowerError(false);
        } else {
          setIsLowerError(true);
        }

        if (!err.errors.includes('Must contain at least one special character')) {
          setIsSpecialError(false);
        } else {
          setIsSpecialError(true);
        }

        if (!err.errors.includes('Must be at least 8 characters long')) {
          setIsEightError(false);
        } else {
          setIsEightError(true);
        }
      });
  }, [registerFormik.values.password]);

  return (
    <AuthBackground className={RegisterStyles.register} headText="Get started with SwitchAir">
      <div className={RegisterStyles.register__content}>
        <form onSubmit={registerFormik.handleSubmit} className={RegisterStyles.register__form}>
          <div className={RegisterStyles.register__formInput}>
            <InputField
              type="text"
              name="fullName"
              label="Full Name"
              placeholder="Full Name"
              value={registerFormik.values.fullName}
              onChange={registerFormik.handleChange}
              error={registerFormik.submitCount > 0 && registerFormik.errors.fullName}
            />
          </div>

          <div className={RegisterStyles.register__formInput}>
            <InputField
              type="email"
              name="email"
              label="Email address"
              placeholder="Email Address"
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              error={registerFormik.submitCount > 0 && registerFormik.errors.email}
            />
          </div>

          <div className={RegisterStyles.register__formInput}>
            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              error={registerFormik.submitCount > 0 && registerFormik.errors.password}
              onFocus={() => setIsPasswordFocused(true)}
            />
          </div>

          {isPasswordFocused && (
            <>
              <PasswordStrengthMeter password={registerFormik.values.password} />

              <div className={RegisterStyles.register__validation}>
                <div className={RegisterStyles.register__validationText}>
                  <span className={RegisterStyles.register__validationCriteria}>
                    {isEightError ? <RadioCheckErrorIcon /> : <RadioCheckSuccessIcon />} 8 character
                    minimum
                  </span>
                  <span className={RegisterStyles.register__validationCriteria}>
                    {isLowerError ? <RadioCheckErrorIcon /> : <RadioCheckSuccessIcon />} a lowercase
                    letter
                  </span>
                  <span className={RegisterStyles.register__validationCriteria}>
                    {isUpperError ? <RadioCheckErrorIcon /> : <RadioCheckSuccessIcon />} an
                    uppercase letter
                  </span>
                  <span className={RegisterStyles.register__validationCriteria}>
                    {isSpecialError ? <RadioCheckErrorIcon /> : <RadioCheckSuccessIcon />} a symbol
                  </span>
                </div>
              </div>
            </>
          )}

          <StyledButton
            className={RegisterStyles.register__button}
            title={isLoading ? 'Registering...' : 'Register'}
            type="submit"
            disabled={registerFormik.isSubmitting || isLoading}
          />
        </form>

        <p className={RegisterStyles.register__instruction}>
          Already have an account? &nbsp;
          <Link className={RegisterStyles.register__instructionLink} to="/">
            Login
          </Link>
        </p>
      </div>
    </AuthBackground>
  );
};

export default Register;
