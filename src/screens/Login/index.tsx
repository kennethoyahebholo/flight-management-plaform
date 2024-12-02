import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { AuthBackground, InputField, StyledButton } from '../../components';
import { loginValidationSchema } from './loginValidationSchema.validation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/slices/auth/features';
import { ERROR_OCCURRED_MESSAGE } from '../../utils/constant';
import useToast from '../../utils/helpers/general/useToast';

import CheckIcon from '../../assets/svg_component/CheckIcon';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [isRememberMe, setIsRememberMe] = useState(true);
  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      handleLogin(values?.email, values?.password, dispatch);
    }
  });

  const handleLogin = async (
    email: string,
    password: string,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const actionResult = await dispatch(login({ email, password }));
    if (login.fulfilled.match(actionResult)) {
      const { id, email } = actionResult.payload;
      if (id && email) {
        toast.success('You have successfully signed in. Redirecting to your dashboard...');
        navigate('/dashboard');
      }
    } else if (login.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || ERROR_OCCURRED_MESSAGE;
      toast.error(errorMessage);
    }
  };

  return (
    <AuthBackground
      headText="Welcome back! Login to your account"
      subText="Please enter your details."
      className="">
      <form className={styles?.loginWrapper} onSubmit={loginFormik.handleSubmit}>
        <div className={styles?.loginWrapper__inputWrapper}>
          <InputField
            label="Email Address"
            name="email"
            title="Email Address"
            placeholder="Email Address"
            value={loginFormik.values.email}
            autoComplete="off"
            onChange={loginFormik.handleChange}
            error={loginFormik.submitCount > 0 && loginFormik.errors.email}
            onBlur={loginFormik.handleBlur}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            title="Password"
            placeholder="Password"
            autoComplete="off"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            error={loginFormik.submitCount > 0 && loginFormik.errors.password}
            onBlur={loginFormik.handleBlur}
          />
        </div>

        <div className={styles?.loginWrapper__forgotPasswordAndRememberMeWrapper}>
          <div
            className={styles?.loginWrapper__rememberMeWrapper}
            onClick={() => setIsRememberMe((prev) => !prev)}>
            {isRememberMe ? <CheckIcon /> : <div className={styles?.loginWrapper__checkbox} />}
            <p className={styles?.loginWrapper__rememberMe}>Remember me</p>
          </div>

          <p className={styles?.loginWrapper__forgotPassword}>Forgot your password?</p>
        </div>

        <div className={styles?.loginWrapper__btnWrapper}>
          <StyledButton
            type="submit"
            title={isLoading ? 'Loading...' : 'Login'}
            className={styles.loginWrapper__btn}
            disabled={isLoading}
          />
        </div>
      </form>
      <div className={styles?.loginWrapper__registerHereWrapper}>
        <p>
          Don’t have an account? &nbsp;
          <Link to="/register" className={styles?.loginWrapper__registerHere}>
            Register Here
          </Link>
        </p>
      </div>
    </AuthBackground>
  );
};

export default Login;
