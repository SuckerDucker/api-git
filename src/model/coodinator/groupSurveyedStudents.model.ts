import sequelize from 'sequelize';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import { Group, Course } from '@database/models/index';
import { studentsByGroup } from '@model/coodinator/index';

const groupsSurveyedStudents = async (carredId: number, period: number) => {
  const groups = await Group.findAll({
    attributes: [
      [sequelize.col('Group.clave_grupo'), 'groupKey'],
      [sequelize.col('Group.id_grupo'), 'groupId'],
      [sequelize.col('Courses.id_curso'), 'courseId'],
    ],
    include: [
      {
        model: Course,
        attributes: [],
        where: { id_periodo: period },
      },
    ],
    where: { id_carrera: carredId },
  });

  if (!groups) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'No se encontraron grupos',
    };
  }

  const groupsWithStudents = await Promise.all(
    groups.map(async (group: any) => {
      const { groupId } = group.dataValues;

      const studentsR: any = await studentsByGroup(period, groupId);

      if (studentsR.code !== 'OK') {
        return {
          code: 'ERROR',
          message: 'No se encontraron estudiantes',
          students: [],
        };
      }

      const { students } = studentsR;

      const listStudentsNotSurveyed = students.filter(
        (student: any) => student.dataValues.status === 0
      );

      const listStudentsSurveyed = students.filter(
        (student: any) => student.dataValues.status === 1
      );

      const totalStudents = students.length;
      const totalStudentsNotSurveyed = listStudentsNotSurveyed.length;
      const totalStudentsSurveyed = listStudentsSurveyed.length;

      return {
        ...group.dataValues,
        totalStudents,
        totalStudentsNotSurveyed,
        totalStudentsSurveyed,
        students,
      };
    })
  );

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { groups: groupsWithStudents },
    message: 'Grupos encontrados',
  };
};

export { groupsSurveyedStudents };
