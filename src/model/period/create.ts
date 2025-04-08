import {
  MESSAGES_CODE_RESPONSE,
  STATUS_CODE_RESPONSE,
  STATUS_PERIOD,
} from '@utils/const';
import { Period } from '@database/models/index';
import { formatPeriod } from '@lib/formatPeriod';

const createPeriod = async (period: number) => {
  const periodExist = await Period.findOne({
    where: { id_periodo: period },
  });

  if (periodExist) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'El periodo ya existe',
    };
  }

  await Period.update(
    { Estado: STATUS_PERIOD.INACTIVE },
    {
      where: { Estado: STATUS_PERIOD.ACTIVE },
    }
  );

  const newPeriod = await Period.create({
    id_periodo: period,
    Estado: STATUS_PERIOD.ACTIVE,
  });

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: {
      period: {
        period: newPeriod.id_periodo,
        name: formatPeriod(newPeriod.id_periodo),
        state: newPeriod.Estado,
      },
    },
    message: 'Periodo creado correctamente',
  };
};

export { createPeriod };
