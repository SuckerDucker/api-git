import { QueryTypes } from 'sequelize';

import sequelize from '@database/index';
import { studentsBySubject } from '@model/coodinator/index';

export interface Group {
  groupId: number;
  gruop: string;
  subject: string;
  subjectKey: string;
  students: number;
  surveyed: number;
  average: string;
}

export interface ListGroupByTeacherData {
  groups: Group[];
}

const listGroupByTeacher = async (
  teacherId: number,
  period: number,
  careerId: number
) => {
  try {
    const groups: Group[] = await sequelize.query(
      `
      SELECT
        Grupo.id_grupo AS 'groupId', 
        Grupo.clave_grupo AS groupKey,  
        nombre_materia AS subject,
        Materia.nombre_corto_materia AS subjectKey,
        AVG(Respuesta.puntuacion) - 1 AS averageGroup
      FROM
        Encuesta
        INNER JOIN
        Curso
        ON 
          Encuesta.id_curso = Curso.id_curso
        INNER JOIN
        Grupo
        ON 
          Curso.id_grupo = Grupo.id_grupo
        INNER JOIN
        Carrera
        ON 
          Grupo.id_carrera = Carrera.id_carrera
        INNER JOIN
        Materia
        ON 
          Curso.id_materia = Materia.id_materia
        INNER JOIN
        Respuesta
        ON 
          Encuesta.id_encuesta = Respuesta.id_encuesta
        INNER JOIN
        Pregunta
        ON 
          Respuesta.id_pregunta = Pregunta.id_pregunta
      WHERE
        Curso.id_docente = :teacherId AND
        id_periodo =  :period AND
        Grupo.id_carrera = :careerId
      GROUP BY
        id_periodo, 
        Grupo.clave_grupo, 
        Grupo.id_grupo, 
        nombre_materia, 
        Materia.nombre_corto_materia
      `,
      {
        replacements: { teacherId, period, careerId },
        type: QueryTypes.SELECT,
      }
    );

    if (groups.length === 0) {
      return {
        code: 'ERROR',
        groups: [],
        message: 'No se encontraron grupos',
      };
    }

    const groupsWithStudents = await Promise.all(
      groups.map(async (group: any) => {
        const { groupId, subjectKey } = group;

        const studentsR: any = await studentsBySubject(
          period,
          groupId,
          subjectKey
        );

        if (studentsR.code !== 'OK') {
          return {
            code: 'ERROR',
            message: 'No se encontraron estudiantes',
            students: [],
          };
        }

        const { students } = studentsR;

        const totalStudents = students.length;
        const totalStudentsSurveyed = students.filter(
          (student: any) => student.dataValues.status === 1
        ).length;

        return {
          ...group,
          totalStudents,
          totalStudentsSurveyed,
        };
      })
    );

    return {
      code: 'OK',
      groups: groupsWithStudents,
      message: 'Grupos encontrados',
    };
  } catch (error) {
    console.log('An error ocurred list Group', error);
    return {
      code: 'ERROR',
      groups: [],
      message: 'Ocurrió un error al listar los grupos',
    };
  }
};

export { listGroupByTeacher };
