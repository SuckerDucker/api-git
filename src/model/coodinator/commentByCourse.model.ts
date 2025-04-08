import { QueryTypes } from 'sequelize';

import sequelize from '../../database/index';

interface commentData {
  question: string;
  average: number;
}

interface commentByCourseData {
  comments: commentData[];
}

const commentByCourse = async (
  period: number,
  teacherId: number,
  gruopKey: string,
  subjectKey: string
) => {
  try {
    const comments: commentByCourseData[] = await sequelize.query(
      `
        SELECT
          Curso_comentario.comentario AS comment
        FROM
          Curso_comentario
          INNER JOIN
          Curso
          ON 
            Curso_comentario.id_curso = Curso.id_curso
          INNER JOIN
          Grupo
          ON 
            Curso.id_grupo = Grupo.id_grupo
          INNER JOIN
          Materia
          ON 
            Curso.id_materia = Materia.id_materia
        WHERE
          Curso.id_periodo = :period AND
          Curso.id_docente = :teacherId AND
          Grupo.clave_grupo = :gruopKey AND
          Materia.nombre_corto_materia = :subjectKey
      `,
      {
        replacements: { period, teacherId, gruopKey, subjectKey },
        type: QueryTypes.SELECT,
      }
    );

    if (comments.length === 0) {
      return {
        code: 'ERROR',
        comments: [],
        message: 'No se encontraron comentarios',
      };
    }

    return {
      code: 'OK',
      comments,
      message: 'Comentarios por curso',
    };
  } catch (error) {
    console.error('An error ocurred commentByCourse: ', error);
    return {
      code: 'ERROR',
      comments: [],
      message: 'Ocurrió un error al obtener los comentarios',
    };
  }
};

export { commentByCourse };
