import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { generalInfo } from '@model/coodinator/index';

const GeneralInfo = async (req: Request, res: Response) => {
  try {
    const { careerId } = getParams(req.query);

    const data = await generalInfo(careerId);

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred GeneralInfo: ', error);
    generateResponse(res, null, error);
  }
};

export default GeneralInfo;
