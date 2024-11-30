import React from 'react';
import NotFoundStyles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={NotFoundStyles.notFound}>
      <h5 className={NotFoundStyles.notFound__text}>404 | This page could not be found.</h5>
    </div>
  );
};

export default NotFound;
