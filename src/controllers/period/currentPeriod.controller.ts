import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import { currentPeriod } from '@model/period/index';

const CurrentPeriod = async (_req: Request, res: Response) => {
  try {
    const current = await currentPeriod();

    generateResponse(res, current, null);
  } catch (error) {
    console.error('An error ocurred CurrentPeriod: ', error);
    generateResponse(res, null, error);
  }
};

export default CurrentPeriod;
