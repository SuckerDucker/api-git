import { type Response } from 'express';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

const generateResponse = (res: Response, data: unknown, error: unknown) => {
  if (error) {
    return res.status(STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR).send({
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error en el servidor',
    });
  }
  return res.status(STATUS_CODE_RESPONSE.OK).send(data);
};

export default generateResponse;
