import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import { listPeriod } from '@model/period/index';

const ListPeriod = async (_req: Request, res: Response) => {
  try {
    const periods = await listPeriod();

    generateResponse(res, periods, null);
  } catch (error) {
    console.error('An error ocurred ListPeriod: ', error);
    generateResponse(res, null, error);
  }
};

export default ListPeriod;
