import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { updatePeriod } from '@model/period/index';

const ChangeStatus = async (req: Request, res: Response) => {
  try {
    const { period, status } = getParams(req.body);

    const update = await updatePeriod(period, status);

    generateResponse(res, update, null);
  } catch (error) {
    console.error('An error ocurred ChangeStatus: ', error);
    generateResponse(res, null, error);
  }
};

export default ChangeStatus;
