import sequelize from '@database/index';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Career } from '@database/models/index';

const infoCareer = async (email: string) => {
  const career = await Career.findOne({
    attributes: [
      [sequelize.col('id_carrera'), 'id'],
      [sequelize.col('nombre_carrera'), 'name'],
      [sequelize.col('nombre_corto'), 'shortName'],
      [sequelize.col('correo_institucional'), 'email'],
    ],
    where: { correo_institucional: email, status: 1 },
  });

  if (!career) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'Carrera no encontrada',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { career },
    message: 'Información de la carrera obtenida correctamente',
  };
};

export { infoCareer };
