import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import getParams from '@utils/rest';
import { getQuestions } from '@model/student/questions.model';

const Questions = async (req: Request, res: Response) => {
  try {
    const { surveyId } = getParams(req.query);

    const questions = await getQuestions(surveyId);

    generateResponse(res, questions, null);
  } catch (error) {
    console.error('An error ocurred GetQuestions: ', error);
    generateResponse(res, null, error);
  }
};

export default Questions;
