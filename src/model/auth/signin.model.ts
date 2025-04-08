import bcrypt from 'bcryptjs';

import {
  MESSAGES_CODE_RESPONSE,
  STATUS_CODE_RESPONSE,
  ROLE_USER,
} from '@utils/const';
import { Admin, Career, Student, Teacher } from '@database/models/index';
import { generateToken } from '@utils/tokens';

export const validAdmin = async (
  username: string,
  password: string
): Promise<boolean> => {
  const admin = await Admin.findOne({
    where: {
      username,
      password,
    },
  });

  if (admin) return true;
  return false;
};

export const signInAdmin = async (
  user: string,
  password: string,
  imageUrl: string
) => {
  const admin = await Admin.findOne({
    where: { user },
  });

  if (!admin) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'Usuario no encontrado',
    };
  }

  const validUSer = await bcrypt.compare(password, admin.password);

  if (validUSer) {
    const token = await generateToken({
      id: admin.dataValues.id,
      role: ROLE_USER.ADMIN,
      name: admin.dataValues.user,
      imageUrl,
    });

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: { token },
      message: 'Usuario encontrado',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.NOT_FOUND,
    messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
    data: null,
    message: 'Usuario no encontrado',
  };
};

export const signInStudent = async (
  name: string,
  email: string,
  imageUrl: string
) => {
  const matriculaValue = parseInt(email.slice(0, 9), 10);

  if (isNaN(matriculaValue)) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'Usuario no encontrado',
    };
  }

  const student = await Student.findOne({
    where: { matricula: matriculaValue },
  });

  if (student) {
    const token = await generateToken({
      role: ROLE_USER.STUDENT,
      id: student.dataValues.matricula,
      name,
      email,
      imageUrl,
    });
    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: { token },
      message: 'Usuario encontrado',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.NOT_FOUND,
    messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
    data: null,
    message: 'Usuario no encontrado',
  };
};

export const signInCoordinator = async (
  name: string,
  email: string,
  imageUrl: string
) => {
  const coordinator = await Career.findOne({
    where: { correo_institucional: email, status: 1 },
  });

  if (coordinator) {
    const token = await generateToken({
      id: coordinator.dataValues.id_carrera,
      role: ROLE_USER.COORDINATOR,
      name,
      email,
      imageUrl,
      nameCareer: coordinator.dataValues.nombre_carrera,
      shortNameCareer: coordinator.dataValues.nombre_corto,
    });
    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: { token },
      message: 'Usuario encontrado',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.NOT_FOUND,
    messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
    data: null,
    message: 'Usuario no encontrado',
  };
};

export const signInTeacher = async (
  name: string,
  email: string,
  imageUrl: string
) => {
  const teacher = await Teacher.findOne({
    where: { correo: email },
  });

  if (teacher) {
    const token = await generateToken({
      id: teacher.dataValues.id_docente,
      role: ROLE_USER.TEACHER,
      name,
      email,
      imageUrl,
    });
    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: { token },
      message: 'Usuario encontrado',
    };
  }

  return {
    code: STATUS_CODE_RESPONSE.NOT_FOUND,
    messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
    data: null,
    message: 'Usuario no encontrado',
  };
};
