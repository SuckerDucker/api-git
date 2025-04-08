import { QueryTypes } from 'sequelize';

import sequelize from '../../database/index';

interface questionAverageData {
  question: string;
  average: number;
}

interface questionAverageByCourseData {
  questionsAverage: questionAverageData[];
}

const questionAverageByCourse = async (
  period: number,
  teacherId: number,
  gruopKey: string,
  subjectKey: string
) => {
  try {
    const questionsAverage: questionAverageByCourseData[] =
      await sequelize.query(
        `
        SELECT
          Pregunta.pregunta AS question, 
          AVG(Respuesta.puntuacion) - 1 AS average
        FROM
          Respuesta
          INNER JOIN
          Encuesta
          ON 
            Respuesta.id_encuesta = Encuesta.id_encuesta
          INNER JOIN
          Curso
          ON 
            Encuesta.id_curso = Curso.id_curso
          INNER JOIN
          Materia
          ON 
            Curso.id_materia = Materia.id_materia
          INNER JOIN
          Pregunta
          ON 
            Respuesta.id_pregunta = Pregunta.id_pregunta
          INNER JOIN
          Grupo
          ON 
            Curso.id_grupo = Grupo.id_grupo
        WHERE
        Curso.id_periodo = :period AND
        Curso.id_docente = :teacherId AND
        Grupo.clave_grupo = :gruopKey AND
        Materia.nombre_corto_materia = :subjectKey
        GROUP BY
          Pregunta.pregunta, 
          Materia.nombre_corto_materia
      `,
        {
          replacements: { period, teacherId, gruopKey, subjectKey },
          type: QueryTypes.SELECT,
        }
      );

    if (questionsAverage.length === 0) {
      return {
        code: 'ERROR',
        questionsAverage: [],
        message: 'No se encontraron promedios',
      };
    }

    return {
      code: 'OK',
      questionsAverage,
      message: 'Promedios de preguntas por curso',
    };
  } catch (error) {
    console.error('An error ocurred questionAverageByCourse: ', error);
    return {
      code: 'ERROR',
      questionsAverage: [],
      message: 'Ocurrió un error al obtener los promedios',
    };
  }
};

export { questionAverageByCourse };
