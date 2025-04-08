import { type Request, type Response, type NextFunction } from 'express';
import * as dotenv from 'dotenv';

import { verifyToken } from '@utils/tokens';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

dotenv.config();

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (process.env.AUTH === 'disabled') {
      next();
      return;
    }

    const authHeader = req.headers.authorization;

    if (authHeader == null) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: STATUS_CODE_RESPONSE.NOT_FOUND,
        messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
        data: null,
        message: 'Cabecera de autorización no encontrada',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: STATUS_CODE_RESPONSE.NOT_FOUND,
        messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
        data: null,
        message: 'Token no encontrado',
      });
      return;
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      res.status(STATUS_CODE_RESPONSE.OK).send({
        code: STATUS_CODE_RESPONSE.UNAUTHORIZED,
        messageCode: MESSAGES_CODE_RESPONSE.UNAUTHORIZED,
        data: null,
        message: 'No autorizado',
      });
      return;
    }

    next();
  } catch (error) {
    console.error('An error ocurred validateToken: ', error);
    res.status(STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR).send({
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error en el servidor',
    });
  }
};

export default validateToken;
