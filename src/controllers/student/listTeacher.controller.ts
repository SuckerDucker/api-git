import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { getListTeacher } from '@model/student/listTeacher.model';

const ListTeacher = async (req: Request, res: Response) => {
  try {
    const { matricula } = getParams(req.query);

    const data = await getListTeacher(matricula);

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred ListTeacher: ', error);
    generateResponse(res, null, error);
  }
};

export default ListTeacher;
