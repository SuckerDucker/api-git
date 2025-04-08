import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { groupsSurveyedStudents } from '@model/coodinator/index';

const GroupSurveyedStudents = async (req: Request, res: Response) => {
  try {
    const { careerId, period } = getParams(req.query);

    const data = await groupsSurveyedStudents(careerId, period);

    generateResponse(res, data, null);
  } catch (error) {
    console.error('An error ocurred GroupSurveyedStudents: ', error);
    generateResponse(res, null, error);
  }
};

export default GroupSurveyedStudents;
