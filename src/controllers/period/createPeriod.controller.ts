import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

import { createPeriod } from '@model/period/index';

const CreatePeriod = async (req: Request, res: Response) => {
  try {
    const { period } = getParams(req.body);

    if (period.toString().length !== 4) {
      res.send({
        code: STATUS_CODE_RESPONSE.BAD_REQUEST,
        messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
        data: null,
        message: 'No se recibio el periodo o no cumple con el formato',
      });
      return;
    }

    const newPeriod = await createPeriod(period);

    generateResponse(res, newPeriod, null);
  } catch (error) {
    console.error('An error ocurred CreatePeriod: ', error);
    generateResponse(res, null, error);
  }
};

export default CreatePeriod;
