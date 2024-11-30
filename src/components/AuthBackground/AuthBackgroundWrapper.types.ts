import { ReactNode } from 'react';

export interface IAuthBackgroundWrapper {
  children: ReactNode;
  headText?: string;
  subText?: string;
  customSubTextClassName?: string;
}
