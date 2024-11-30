import React from 'react';

import { IAuthBackground } from './AuthBackground.types';

import PrimaryLogo from '../../assets/images/primaryLogo.png';

import AuthBGStyle from './AuthBackground.module.scss';

const AuthBackground = ({ className, headText, subText, children }: IAuthBackground) => {
  return (
    <div className={`${AuthBGStyle.authBg} ${className}`}>
      <div className={AuthBGStyle?.authBg__row}>
        <div className={AuthBGStyle?.authBg__left}>
          <div className={AuthBGStyle?.authBg__content}>
            <div className={AuthBGStyle?.authBg__logo}>
              <img className={AuthBGStyle?.authBg__logoImg} src={PrimaryLogo} alt="primary_logo" />
            </div>
            <div className={AuthBGStyle?.authBg__textCont}>
              <h4 className={AuthBGStyle?.authBg__title}>{headText}</h4>
              {subText && <p className={AuthBGStyle?.authBg__subtitle}>{subText}</p>}
            </div>
            {children}
          </div>
        </div>
        <div className={AuthBGStyle?.authBg__right} />
      </div>
    </div>
  );
};

export default AuthBackground;
