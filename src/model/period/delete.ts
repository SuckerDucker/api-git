import { Op, Sequelize } from 'sequelize';

import sequelize from '@database/index';
import {
  Answer,
  Encuesta,
  CourseHasAlumno,
  CourseComment,
  Period,
  Course,
} from '@database/models/index';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

const deletePeriod = async (periodId: number) => {
  const periodExist = await Period.findOne({
    where: { id_periodo: periodId },
  });

  if (!periodExist) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'El periodo ya existe',
    };
  }

  const t = await sequelize.transaction();

  try {
    await Answer.destroy({
      where: {
        id_encuesta: {
          [Op.in]: Sequelize.literal(
            `(SELECT id_encuesta FROM Encuesta WHERE id_curso IN (SELECT id_curso FROM Curso WHERE id_periodo = ${periodId}))`
          ),
        },
      },
      transaction: t,
    });

    await Encuesta.destroy({
      where: {
        id_curso: {
          [Op.in]: Sequelize.literal(
            `(SELECT id_curso FROM Curso WHERE id_periodo = ${periodId})`
          ),
        },
      },
      transaction: t,
    });

    await CourseHasAlumno.destroy({
      where: {
        id_curso: {
          [Op.in]: Sequelize.literal(
            `(SELECT id_curso FROM Curso WHERE id_periodo = ${periodId})`
          ),
        },
      },
      transaction: t,
    });

    await CourseComment.destroy({
      where: {
        id_curso: {
          [Op.in]: Sequelize.literal(
            `(SELECT id_curso FROM Curso WHERE id_periodo = ${periodId})`
          ),
        },
      },
      transaction: t,
    });

    await Course.destroy({
      where: {
        id_periodo: periodId,
      },
      transaction: t,
    });

    await Period.destroy({
      where: {
        id_periodo: periodId,
      },
      transaction: t,
    });

    await t.commit();

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Periodo eliminado exitosamente.',
    };
  } catch (error) {
    await t.rollback();
    console.error('Error al eliminar el periodo:', error);
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'Error al eliminar el periodo.',
    };
  }
};

export { deletePeriod };
