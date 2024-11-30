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
  maxValue
}: IInputField) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles?.inputWrapper}>
      {placeholder && (
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
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles?.inputWrapper__input}
          disabled={disabled}
          min={minValue}
          max={maxValue}
        />

        {type === 'password' && (
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className={styles?.inputWrapper__passIcon}
            // className="input__container_pass-icon"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClose />}
          </span>
        )}
      </div>

      {error && <div className={styles?.inputWrapper__error}>{error}</div>}
    </div>
  );
};

export default InputField;
