import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { listTeacherByCareer } from '@model/coodinator/listTeacherByCareer.model';

const ListTeacher = async (req: Request, res: Response) => {
  try {
    const { period, careerId, showMore } = getParams(req.query);

    const data = await listTeacherByCareer(careerId, period, showMore);

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred ListTeacher: ', error);
    generateResponse(res, null, error);
  }
};

export default ListTeacher;
