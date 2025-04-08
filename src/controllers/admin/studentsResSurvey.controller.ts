import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import { listStudentsResSuvey } from '@model/admin/index';

const ListStudentsResSurvey = async (_req: Request, res: Response) => {
  try {
    const data = await listStudentsResSuvey();

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred StudentsRes: ', error);
    generateResponse(res, null, error);
  }
};

export default ListStudentsResSurvey;
