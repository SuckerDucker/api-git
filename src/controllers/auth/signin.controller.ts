import { type Request, type Response } from 'express';

import {
  signInAdmin,
  signInStudent,
  signInCoordinator,
  signInTeacher,
} from '@model/auth/signin.model';
import generateResponse from '@utils/generateResponse';
import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';

const signIn = async (req: Request, res: Response) => {
  try {
    const { name, email, user, password, imageUrl = '' } = req.body;

    if (user && password) {
      const result = await signInAdmin(user, password, imageUrl);
      generateResponse(res, result, null);
      return;
    }

    const student = await signInStudent(name, email, imageUrl);

    if (student.code === STATUS_CODE_RESPONSE.OK) {
      generateResponse(res, student, null);
      return;
    }

    const coordinator = await signInCoordinator(name, email, imageUrl);

    if (coordinator.code === STATUS_CODE_RESPONSE.OK) {
      generateResponse(res, coordinator, null);
      return;
    }

    const teacher = await signInTeacher(name, email, imageUrl);

    if (teacher.code === STATUS_CODE_RESPONSE.OK) {
      generateResponse(res, teacher, null);
      return;
    }

    res.send({
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'Usuario no encontrado',
    });
  } catch (error) {
    console.error('An error ocurred signIn: ', error);
    generateResponse(res, null, error);
  }
};

export default signIn;
