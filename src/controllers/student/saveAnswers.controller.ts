import { type Request, type Response } from 'express';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { saveAnswers, saveComment } from '@model/student/saveAnswers.model';

const SaveAnswers = async (req: Request, res: Response) => {
  try {
    const { answers, courseId, comment, surveyId } = req.body;

    if (!surveyId || isNaN(Number(surveyId))) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: STATUS_CODE_RESPONSE.BAD_REQUEST,
        messagesCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
        data: null,
        message: 'El id de la encuesta es requerido o no es un número',
      });
      return;
    }

    if (!answers || !Array.isArray(answers)) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: STATUS_CODE_RESPONSE.BAD_REQUEST,
        messagesCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
        data: null,
        message: 'Las respuestas son requeridas',
      });
    }

    const answersSaved = await saveAnswers(surveyId, answers);

    if (answersSaved.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: answersSaved.code,
        messagesCode: answersSaved.messagesCode,
        data: answersSaved.data,
        message: answersSaved.message,
      });
      return;
    }

    if (comment && typeof comment === 'string') {
      const commentSaved = await saveComment(courseId, comment);

      if (commentSaved.code !== STATUS_CODE_RESPONSE.OK) {
        res.status(STATUS_CODE_RESPONSE.OK).send({
          code: commentSaved.code,
          messagesCode: commentSaved.messagesCode,
          data: commentSaved.data,
          message: commentSaved.message,
        });
        return;
      }
    }

    res.status(STATUS_CODE_RESPONSE.OK).send({
      code: answersSaved.code,
      messagesCode: answersSaved.messagesCode,
      data: answersSaved.data,
      message: answersSaved.message,
    });
  } catch (error) {
    console.error('An error ocurred SaveAnswers: ', error);
    res.status(STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR).send({
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error en el servidor',
    });
  }
};

export default SaveAnswers;
