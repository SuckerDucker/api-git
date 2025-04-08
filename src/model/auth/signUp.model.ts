import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Admin } from '@database/models/index';

const signUp = async (username: string, password: string) => {
  const existUser = await Admin.findOne({
    where: {
      user: username,
    },
  });

  if (existUser) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'El usuario ya existe',
    };
  }

  const newUser = await Admin.create({
    user: username,
    password,
  });

  if (!newUser) {
    return {
      code: STATUS_CODE_RESPONSE.BAD_REQUEST,
      messageCode: MESSAGES_CODE_RESPONSE.BAD_REQUEST,
      data: null,
      message: 'No se pudo crear el usuario',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { username: newUser.user },
    message: 'Usuario creado',
  };
};

export default signUp;
