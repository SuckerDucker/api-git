import { QueryTypes } from 'sequelize';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import sequelize from '@database/index';
import {
  listGroupByTeacher,
  questionAverageByCourse,
  commentByCourse,
} from '@model/coodinator/index';

const listTeacherByCareer = async (
  careerId: number,
  period: number,
  showMore: boolean
) => {
  const teachersData = await sequelize.query(
    `
    SELECT DISTINCT
      Docente.id_docente AS teacherKey, 
      CONCAT(Docente.nombre, ' ', Docente.apellido_paterno, ' ', Docente.apellido_materno) AS name
    FROM
      Docente
      INNER JOIN
      Curso
      ON 
        Docente.id_docente = Curso.id_docente
      INNER JOIN
      Carrera
      INNER JOIN
      Grupo
      ON 
        Carrera.id_carrera = Grupo.id_carrera AND
        Curso.id_grupo = Grupo.id_grupo
    WHERE
      Carrera.id_carrera = :careerId AND
      Curso.id_periodo = :period AND
      Docente.id_docente <> 9999;
    `,
    {
      replacements: { careerId, period },
      type: QueryTypes.SELECT,
    }
  );

  if (!teachersData) {
    return {
      code: STATUS_CODE_RESPONSE.NOT_FOUND,
      messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
      data: null,
      message: 'No se encontraron docentes',
    };
  }

  const data = await Promise.all(
    teachersData.map(async (teacher: any) => {
      const groups = await listGroupByTeacher(
        teacher.teacherKey,
        period,
        careerId
      );

      if (groups.code === 'ERROR') {
        return {
          ...teacher,
          groups: [],
        };
      }

      if (!showMore) {
        return {
          ...teacher,
          groups: groups.groups,
        };
      }

      const groupsData = await Promise.all(
        groups.groups.map(async (group: any) => {
          const questions = await questionAverageByCourse(
            period,
            teacher.teacherKey,
            group.groupKey,
            group.subjectKey
          );

          const comments = await commentByCourse(
            period,
            teacher.teacherKey,
            group.groupKey,
            group.subjectKey
          );

          return {
            ...group,
            questions: questions.questionsAverage,
            comments: comments.comments,
          };
        })
      );

      return {
        ...teacher,
        groups: groupsData,
      };
    })
  );

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { teachers: data },
    message: 'Docentes obtenidos correctamente',
  };
};

export { listTeacherByCareer };
