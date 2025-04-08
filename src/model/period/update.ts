import {
  MESSAGES_CODE_RESPONSE,
  STATUS_CODE_RESPONSE,
  STATUS_PERIOD,
} from '@utils/const';
import { formatPeriod } from '@lib/formatPeriod';
import { Period } from '@database/models/index';

const updatePeriod = async (period: number, status: number) => {
  const periodExist = await Period.findOne({
    where: { id_periodo: period },
  });

  if (!periodExist) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'El periodo no existe',
    };
  }

  if (periodExist.Estado === status) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'El periodo, ya esta en ese estado',
    };
  }

  if (status === STATUS_PERIOD.ACTIVE) {
    await Period.update(
      { Estado: STATUS_PERIOD.INACTIVE },
      {
        where: { Estado: STATUS_PERIOD.ACTIVE },
      }
    );
  }

  const res = await Period.update(
    { Estado: status },
    {
      where: { id_periodo: period },
    }
  );

  if (res[0] === 0) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'No se pudo actualizar el periodo',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: {
      period: {
        period,
        name: formatPeriod(period),
        state: status,
      },
    },
    message: 'Periodo actualizado',
  };
};

export { updatePeriod };
