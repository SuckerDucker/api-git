import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Encuesta, Question } from '@database/models/index';

const getQuestions = async (surveyId: number) => {
  const questionnaireId = await Encuesta.findOne({
    attributes: ['id_cuestionario_ad'],
    where: { id_encuesta: surveyId },
  });

  const questions = await Question.findAll({
    attributes: [
      ['id_pregunta', 'idQuestion'],
      ['id_cuestionario_ad', 'idQuestionnaire'],
      ['pregunta', 'question'],
    ],
    where: { id_cuestionario_ad: questionnaireId?.id_cuestionario_ad },
  });

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { questions },
    message: 'Preguntas encontradas',
  };
};

export { getQuestions };
