/* eslint-disable @typescript-eslint/no-floating-promises */
import sequelize from '../index';
// MODELS
import {
  Admin,
  Answer,
  Career,
  Course,
  CourseComment,
  CourseHasAlumno,
  CuestionarioAlumnoDocente,
  Encuesta,
  Group,
  Period,
  Question,
  Student,
  Subject,
  Teacher,
  TypeTeacher,
} from '../models/index';
// SEEDERS

(async () => {
  try {
    await sequelize.authenticate();
    // Sincronizar los modelos con la base de datos
    await TypeTeacher.sync({ alter: true });
    await Admin.sync({ alter: true });
    await Career.sync({ alter: true });
    await Period.sync({ alter: true });
    await Teacher.sync({ alter: true });
    await Student.sync({ alter: true });
    await Subject.sync({ alter: true });
    await CuestionarioAlumnoDocente.sync({ alter: true });

    await Group.sync({ alter: true });
    await Question.sync({ alter: true });
    await Course.sync({ alter: true });
    await CourseComment.sync({ alter: true });
    await CourseHasAlumno.sync({ alter: true });
    await Encuesta.sync({ alter: true });
    await Answer.sync({ alter: true });

    console.log('Base de datos sincronizada correctamente');
  } catch (e) {
    console.log({ e });
  }
})();
