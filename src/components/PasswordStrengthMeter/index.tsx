import React from 'react';

import PasswordStrengthMeterStyle from './PasswordStrengthMeter.module.scss';
import { IPasswordStrength, IStrengthMeter } from './PasswordStrengthMeter.types';

const checkPasswordStrength = (password: string): IPasswordStrength => {
  let pwdStrength = 0;
  const patterns = ['[A-Z]', '[a-z]', '\\W'];
  if (password.length === 0) {
    return { strength: 0, label: 'Too Short' };
  }

  if (password.length >= 8) {
    pwdStrength += 1;
  }

  patterns.forEach((pattern) => {
    const regex = new RegExp(pattern);
    if (regex.test(password)) {
      pwdStrength += 1;
    }
  });

  let strengthLabel = '';
  switch (pwdStrength) {
    case 0:
      strengthLabel = 'Too Short';
      break;
    case 1:
      strengthLabel = 'Weak';
      break;
    case 2:
      strengthLabel = 'Fair';
      break;
    case 3:
      strengthLabel = 'Good';
      break;
    case 4:
      strengthLabel = 'Strong';
      break;
    default:
      strengthLabel = '';
      break;
  }

  return { strength: pwdStrength, label: strengthLabel };
};

const StrengthMeter: React.FC<IStrengthMeter> = ({ password, barCustomClassName }) => {
  const { strength, label } = checkPasswordStrength(password);

  return (
    <div className={PasswordStrengthMeterStyle.strengthMeter}>
      <progress
        className={`${PasswordStrengthMeterStyle.strengthMeter__bar} ${barCustomClassName} ${
          PasswordStrengthMeterStyle[`strengthMeter__bar--${label.toLowerCase()}`]
        }`}
        value={strength}
        max={4}
      />
      <div className={PasswordStrengthMeterStyle.strengthMeter__label}>
        <span
          className={`${PasswordStrengthMeterStyle.strengthMeter__text} ${
            PasswordStrengthMeterStyle[`strengthMeter__text--${label.toLowerCase()}`]
          }`}>
          {label}
        </span>
      </div>
    </div>
  );
};

export default StrengthMeter;
