import React, { useState } from 'react';

import { IInputField } from './InputField.types';

import EyeClose from '../../assets/svg_component/EyeClose';
import EyeOpenIcon from '../../assets/svg_component/EyeOpenIcon';

import styles from './InputField.module.scss';

const InputField = ({
  name,
  title,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  required,
  disabled,
  autoComplete,
  type,
  minValue,
  maxValue,
  hidePlaceholderAnimation
}: IInputField) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles?.inputWrapper}>
      {placeholder && !hidePlaceholderAnimation && (
        <div
          className={`${styles?.inputWrapper__placeholder} ${value ? styles['inputWrapper__placeholder--focused'] : ''}`}>
          {placeholder}
        </div>
      )}
      <div className={styles?.inputWrapper__container}>
        <input
          type={showPassword ? 'text' : type}
          required={required}
          name={name}
          title={title}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={hidePlaceholderAnimation ? placeholder : ''}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${!error ? styles?.inputWrapper__input : styles?.inputWrapper__inputErrored}`}
          disabled={disabled}
          min={minValue}
          max={maxValue}
        />

        {type === 'password' && (
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className={styles?.inputWrapper__passIcon}>
            {showPassword ? <EyeOpenIcon /> : <EyeClose />}
          </span>
        )}
      </div>

      {error && <div className={styles?.inputWrapper__error}>{error}</div>}
    </div>
  );
};

export default InputField;
