import { QueryTypes } from 'sequelize';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import sequelize from '@database/index';

const getListTeacher = async (matricula: number) => {
  const teachers = await sequelize.query(
    `
      SELECT 
        Curso.id_curso AS courseId,
        Encuesta.id_encuesta AS surveyId,
        Encuesta.estatus AS status,
        Materia.id_materia AS subjectId, 
        Materia.nombre_materia AS subject,
        Materia.nombre_corto_materia AS subjectKey, 
        Grupo.clave_grupo AS 'group', 
        Docente.id_docente AS teacherKey, 
        CONCAT(Docente.nombre, ' ', Docente.apellido_paterno, ' ', Docente.apellido_materno) AS teacher
      FROM 
        Curso_has_Alumno 
        INNER JOIN Curso ON Curso_has_Alumno.id_curso = Curso.id_curso 
        INNER JOIN Materia ON Curso.id_materia = Materia.id_materia
        INNER JOIN Docente ON Curso.id_docente = Docente.id_docente
        INNER JOIN Grupo ON Curso.id_grupo = Grupo.id_grupo
        INNER JOIN Carrera ON Grupo.id_carrera = Carrera.id_carrera
        INNER JOIN (
          SELECT id_curso, MAX(id_encuesta) AS id_encuesta, estatus
          FROM Encuesta WHERE matricula_alumno = :MT
          GROUP BY id_curso, estatus
        ) AS LastEncuesta ON Curso.id_curso = LastEncuesta.id_curso
        INNER JOIN Encuesta ON LastEncuesta.id_encuesta = Encuesta.id_encuesta
      WHERE 
        Curso_has_Alumno.matricula = :MT
        AND Curso.id_periodo = (SELECT id_periodo FROM Periodo WHERE Estado = 1)
      ORDER BY status ASC
    `,
    {
      replacements: { MT: matricula },
      type: QueryTypes.SELECT,
    }
  );

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: { teachers },
    message: 'Lista de profesores obtenida correctamente',
  };
};

export { getListTeacher };
