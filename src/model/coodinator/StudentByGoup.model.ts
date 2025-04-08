import sequelize from 'sequelize';

import { Course, Encuesta, Student } from '@database/models/index';

const studentsByGroup = async (period: number, groupId: number) => {
  try {
    const students = await Encuesta.findAll({
      attributes: [
        [sequelize.col('Student.matricula'), 'matricula'],
        [sequelize.col('Student.nombre'), 'name'],
        [sequelize.col('Student.apellido_paterno'), 'lastName'],
        [sequelize.col('Student.apellido_materno'), 'secondLastName'],
        [sequelize.fn('MIN', sequelize.col('Encuesta.estatus')), 'status'],
      ],
      group: ['matricula'],
      include: [
        {
          model: Student,
          attributes: [],
        },
        {
          model: Course,
          attributes: [],
          where: {
            id_periodo: period,
            id_grupo: groupId,
          },
        },
      ],
    });

    if (!students) {
      return {
        code: 'ERROR',
        message: 'No se encontraron estudiantes',
        students: [],
      };
    }

    return {
      code: 'OK',
      message: 'Estudiantes encontrados',
      students,
    };
  } catch (error) {
    console.error('An error ocurred studentsByGroup: ', error);

    return {
      code: 'ERROR',
      message: 'Ocurrió un error al buscar los estudiantes',
      students: [],
    };
  }
};

export { studentsByGroup };
