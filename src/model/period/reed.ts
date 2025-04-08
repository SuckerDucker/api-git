import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Period } from '@database/models/index';
import sequelize from '@database/index';
import { formatPeriod } from '@lib/formatPeriod';

const listPeriod = async () => {
  const data = await Period.findAll({
    order: [['id_periodo', 'DESC']],
  });

  if (!data) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'No se encontraron periodos',
    };
  }

  const periods = data.map((period) => {
    return {
      period: period.id_periodo,
      name: formatPeriod(period.id_periodo),
      state: period.Estado,
    };
  });

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { periods },
    message: 'Periodos listados correctamente',
  };
};

const periodById = async (periodId: number) => {
  try {
    const data = await Period.findOne({
      where: { id_periodo: periodId },
    });

    if (!data) {
      return {
        code: 'NOT_FOUND',
        period: {},
        message: 'No se encontró el periodo',
      };
    }

    const period = {
      period: data.id_periodo,
      name: formatPeriod(data.id_periodo),
      state: data.Estado,
    };

    return { code: 'OK', period, message: 'Periodo obtenido correctamente' };
  } catch (error) {
    console.log(error);
    return {
      code: 'ERROR',
      period: {},
      message: 'Error a obtener el periodo',
    };
  }
};

const currentPeriod = async () => {
  const maxPeriod = await Period.findOne({
    attributes: [
      [sequelize.col('id_periodo'), 'period'],
      [sequelize.col('Estado'), 'status'],
    ],
    order: [['id_periodo', 'DESC']],
    limit: 1,
  });

  if (!maxPeriod) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'No se encontró el periodo',
    };
  }

  const { dataValues } = maxPeriod;

  const period = {
    period: dataValues.period,
    name: formatPeriod(dataValues.period),
    state: dataValues.status,
  };

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { period },
    message: 'Periodo obtenido correctamente',
  };
};

export { listPeriod, periodById, currentPeriod };
