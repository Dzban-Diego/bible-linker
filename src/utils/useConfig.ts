import {useEffect, useState} from 'react';

export const useConfig = () => {
  const redirect = (): boolean => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.redirect);
    } else {
      return false;
    }
  };

  const handleRedirectChange = () => {
    localStorage.setItem('redirect', JSON.stringify(!redirect));
  };

  return {
    redirect: redirect(),
    handleRedirectChange,
  };
};
