import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { infoCareer } from '@model/coodinator/index';

const InfoCareer = async (req: Request, res: Response) => {
  try {
    const { email } = getParams(req.query);

    const data = await infoCareer(email);

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred InfoCareer: ', error);
    generateResponse(res, null, error);
  }
};

export default InfoCareer;
