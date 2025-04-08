import sequelize from 'sequelize';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

import { Course, Encuesta } from '@database/models/index';
import { currentPeriod } from '@model/period/index';

const listStudentsResSuvey = async () => {
  const period = await currentPeriod();

  if (period.code !== STATUS_CODE_RESPONSE.OK) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'No se encontro el periodo actual',
    };
  }

  const totalStudents = await Encuesta.findAll({
    attributes: [
      [sequelize.col('Encuesta.matricula_alumno'), 'matricula'],
      [sequelize.fn('MIN', sequelize.col('Encuesta.estatus')), 'status'],
    ],
    group: ['matricula'],
    include: [
      {
        model: Course,
        attributes: [],
        where: { id_periodo: period.data.period.period },
      },
    ],
  });

  if (!totalStudents) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: {
        totalStudents: 0,
        totalAnswered: 0,
        totalNotAnswered: 0,
      },
      message: 'No se encontraron estudiantes',
    };
  }

  let totalAnswered = 0;
  let totalNotAnswered = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalStudents.forEach((student: any) => {
    if (student.dataValues.status === 1) {
      totalAnswered += 1;
    } else {
      totalNotAnswered += 1;
    }
  });

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: {
      totalStudents: totalStudents.length,
      totalAnswered,
      totalNotAnswered,
    },
    message: 'Estadisticas obtenidas',
  };
};

export default listStudentsResSuvey;
