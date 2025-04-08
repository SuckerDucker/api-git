/* eslint-disable @typescript-eslint/no-empty-function */
import { env } from '@utils/env';

export const deshabilitarLog = () => {
  if (env.NODE_ENV === 'production') {
    console.log = function () {};
    console.table = function () {};
    console.info = function () {};
    console.debug = function () {};
    console.warn = function () {};
    console.error = function () {};
  }
};

deshabilitarLog();
