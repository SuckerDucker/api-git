import { QueryTypes } from 'sequelize';

import { MESSAGES_CODE_RESPONSE, STATUS_CODE_RESPONSE } from '@utils/const';
import sequelize from '@database/index';
import { Period } from '@database/models/index';

interface CountTeachersData {
  countTeachers: number;
}

interface CountSubjectsData {
  countSubjects: number;
}

const generalInfo = async (careerId: number) => {
  const countTeachers: CountTeachersData[] = await sequelize.query(
    `
    SELECT 
      COUNT(DISTINCT Docente.id_docente, Grupo.id_carrera) AS countTeachers
    FROM Curso 
    INNER JOIN Grupo ON Curso.id_grupo = Grupo.id_grupo
    INNER JOIN Docente ON Curso.id_docente = Docente.id_docente
    WHERE Grupo.id_carrera = :careerId
  `,
    {
      replacements: { careerId },
      type: QueryTypes.SELECT,
    }
  );

  const countSubjects: CountSubjectsData[] = await sequelize.query(
    `
    SELECT 
      COUNT(DISTINCT Materia.id_materia, Grupo.id_carrera) AS countSubjects
    FROM Curso 
    INNER JOIN Grupo ON Curso.id_grupo = Grupo.id_grupo
    INNER JOIN Materia ON Curso.id_materia = Materia.id_materia
    WHERE Grupo.id_carrera = :careerId
    `,
    {
      replacements: { careerId },
      type: QueryTypes.SELECT,
    }
  );

  const countPeriods = await Period.count();

  return {
    code: STATUS_CODE_RESPONSE.OK,
    messageCode: MESSAGES_CODE_RESPONSE.OK,
    data: {
      countTeachers: countTeachers[0].countTeachers,
      countSubjects: countSubjects[0].countSubjects,
      countPeriods,
    },
    message: 'Información general obtenida correctamente',
  };
};

export { generalInfo };
