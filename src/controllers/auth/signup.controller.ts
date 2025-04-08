import { type Request, type Response } from 'express';

import generateResponse from '@utils/generateResponse';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import signUpModel from '@model/auth/signUp.model';

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.send({
        code: STATUS_CODE_RESPONSE.NOT_FOUND,
        messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
        data: null,
        message: 'El usuario y contraseña son requeridos',
      });
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      res.send({
        code: STATUS_CODE_RESPONSE.BAD_REQUEST,
        messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
        data: null,
        message: 'El usuario y contraseña deben ser de tipo string',
      });
      return;
    }

    const result = await signUpModel(username, password);

    generateResponse(res, result, null);
  } catch (error) {
    console.error('An error ocurred signUp: ', error);
    generateResponse(res, null, error);
  }
};

export default signUp;
