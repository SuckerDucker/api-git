import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Answer, CourseComment, Encuesta } from '@database/models/index';

interface AnswerData {
  surveyId: number;
  questionId: number;
  questionnaireId: number;
  puntuation: number;
}

const saveAnswers = async (surveyId: number, answers: AnswerData[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answersData: any = answers.map((answer: AnswerData) => {
    return {
      id_encuesta: answer.surveyId,
      id_pregunta: answer.questionId,
      id_cuestionario_ad: answer.questionnaireId,
      puntuacion: answer.puntuation,
    };
  });

  const isSaveAnswers = await Answer.bulkCreate(answersData, {
    ignoreDuplicates: true,
  });

  const isSurvetUpdate = await Encuesta.update(
    { estatus: 1 },
    { where: { id_encuesta: surveyId } }
  );

  if (!isSaveAnswers || !isSurvetUpdate) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messagesCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'Error al guardar las respuestas',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messagesCode: MESSAGES_CODE_RESPONSE.OK,
    data: null,
    message: 'Respuestas guardadas correctamente',
  };
};

const saveComment = async (courseId: number, comment: string) => {
  const saveComment = await CourseComment.create({
    id_curso: courseId,
    comentario: comment,
  });

  if (!saveComment) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messagesCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'Error al guardar el comentario',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messagesCode: MESSAGES_CODE_RESPONSE.OK,
    data: null,
    message: 'Comentario guardado correctamente',
  };
};

export { saveAnswers, saveComment };
