import { DBFFile } from 'dbffile';

import { currentPeriod } from '@model/period/index';
import {
  encodingDBF,
  MESSAGES_CODE_RESPONSE,
  STATUS_CODE_RESPONSE,
} from '@utils/const';
import {
  Course,
  CourseHasAlumno,
  CuestionarioAlumnoDocente,
  Encuesta,
  Group,
  Student,
  Subject,
  Teacher,
} from '@database/models/index';

const validarMatriculaAlumno = async (matricula: string) => {
  try {
    const regex = /^[0-9]{9}$/;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!regex.test(matricula)) return false;
    if (matricula === null) return false;
    const existeMatricula = await Student.findOne({
      attributes: ['matricula'],
      where: { matricula },
    });
    return !!existeMatricula;
  } catch (e) {
    console.error('An error ocurred validarMatriculaAlumno: ', e);
    return false;
  }
};

const validarIdDocente = async (id: number) => {
  try {
    if (id === null) return null;
    const idDocente = await Teacher.findByPk(id);
    return idDocente != null;
  } catch (error) {
    console.error('An error ocurred validarIdDocente: ', error);
    return null;
  }
};

const obtenerIdMateria = async (claveMateria: string) => {
  try {
    if (claveMateria === null) return null;
    const materia = await Subject.findOne({
      attributes: ['id_materia'],
      where: { nombre_corto_materia: claveMateria },
    });
    return materia ? materia.id_materia : null;
  } catch (error) {
    console.error('An error ocurred obtenerIdMateria: ', error);
    return null;
  }
};

const obtenerIdGrupo = async (claveGrupo: string) => {
  try {
    if (claveGrupo === null) return null;
    const grupo = await Group.findOne({
      attributes: ['id_grupo'],
      where: { clave_grupo: claveGrupo },
    });
    return grupo ? grupo.id_grupo : null;
  } catch (error) {
    console.error('An error ocurred obtenerIdGrupo: ', error);
    return null;
  }
};

const createCourse = async (
  period: unknown,
  subjectId: unknown,
  groupId: unknown,
  teacherKey: any
) => {
  try {
    const courseCreated = await Course.findOne({
      where: {
        id_periodo: period,
        id_materia: subjectId,
        id_grupo: groupId,
      },
    });

    if (courseCreated) {
      courseCreated.id_docente = parseInt(teacherKey.toString());
      await courseCreated.save();
      return null;
    } else {
      const curso = await Course.create({
        id_periodo: period,
        id_materia: subjectId,
        id_grupo: groupId,
        id_docente: teacherKey,
      });

      return curso ? curso.id_curso : null;
    }
  } catch (error) {
    console.error('An error ocurred createCourse: ', error);
    return null;
  }
};

export const registerStudents = async (dir: string) => {
  try {
    const tableStudents = await DBFFile.open(dir, { encoding: encodingDBF });
    const rows = await tableStudents.readRecords();
    const newStudents = rows.map((row) => ({
      matricula: row.ALUCTR as number,
      nombre: row.ALUNOM as string,
      apellido_paterno: row.ALUAPP as string,
      apellido_materno: row.ALUAPM as string,
    }));

    await Student.bulkCreate(newStudents, {
      ignoreDuplicates: true,
      fields: ['matricula', 'nombre', 'apellido_paterno', 'apellido_materno'],
    });

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Estudiantes registrados correctamente',
    };
  } catch (error) {
    console.error('An error ocurred registerStudents: ', error);
    return {
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error al registrar los estudiantes',
    };
  }
};

export const registerSubjects = async (dir: string) => {
  try {
    const fileSubject = await DBFFile.open(dir, { encoding: encodingDBF });
    const rows = await fileSubject.readRecords();

    const existingSubjects = await Subject.findAll({
      attributes: ['nombre_materia'],
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const existingSubjectNames = existingSubjects.map(
      (subject: any) => subject.nombre_materia
    );

    const newSubject = rows
      .filter((row) => !existingSubjectNames.includes(row.MATNOM))
      .map((row) => ({
        nombre_materia: row.MATNOM as string,
        nombre_corto_materia: row.MATCVE as string,
      }));

    await Subject.bulkCreate(newSubject, {
      ignoreDuplicates: true,
      fields: ['nombre_materia', 'nombre_corto_materia'],
    });

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Materias registradas correctamente',
    };
  } catch (error) {
    console.error('An error ocurred registerSubjects: ', error);
    return {
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error al registrar las materias',
    };
  }
};

export const registerGroup = async (dir: string) => {
  try {
    const file = await DBFFile.open(dir, { encoding: encodingDBF });
    const rows = await file.readRecords();

    const existingGroups = await Group.findAll({
      attributes: ['clave_grupo', 'id_carrera'],
    });
    const existingGroupKeys = existingGroups.map(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      (group) => `${group.clave_grupo}_${group.id_carrera}`
    );

    const newGroups = rows
      .map((row) => ({
        clave_grupo: row.GPOCVE,
        id_carrera: row.CARCVE === null || row.CARCVE === 0 ? null : row.CARCVE,
      }))
      .filter((group, index, arr) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const key = `${group.clave_grupo}_${group.id_carrera}`;
        return (
          !existingGroupKeys.includes(key) &&
          group.id_carrera !== null &&
          arr.findIndex((g) => g.clave_grupo === group.clave_grupo) === index
        );
      });

    await Group.bulkCreate(newGroups);

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Grupos registrados correctamente',
    };
  } catch (error) {
    console.error('An error ocurred registerGroup: ', error);
    return {
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error al registrar los grupos',
    };
  }
};

export const registerTeacher = async (dir: string) => {
  try {
    const file = await DBFFile.open(dir, { encoding: encodingDBF });
    const rows = await file.readRecords();

    const newTeacher = rows.map((row) => ({
      id_docente: row.PERCVE,
      nombre: row.PERNOM,
      apellido_materno: row.PERAPM,
      apellido_paterno: row.PERAPP,
      id_tipo: 1,
    }));

    await Teacher.bulkCreate(newTeacher, { ignoreDuplicates: true });

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Docentes registrados correctamente',
    };
  } catch (error) {
    console.error('An error ocurred registerTeacher: ', error);
    return {
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error al registrar los docentes',
    };
  }
};

export const crearCursoEncuesta = async (
  dirGrupo: string,
  dirLista: string
) => {
  try {
    let CURSOS_NUEVOS_LENGTH = 0;
    const current = await currentPeriod();
    const CURRENT_PERIOD = current.data?.period.period.toString();

    const grupos = await DBFFile.open(dirGrupo, { encoding: encodingDBF });
    const lista = await DBFFile.open(dirLista, { encoding: encodingDBF });

    const rowsGrupos = await grupos.readRecords();
    const rowsLista = await lista.readRecords();

    const dataGrupos = rowsGrupos
      .map((row) => ({
        periodo: row.PDOCVE,
        materia: row.MATCVE,
        grupo: row.GPOCVE,
        id_docente: row.PERCVE == null ? 83 : row.PERCVE,
      }))
      .filter((item) => item !== null);

    const dataLista = rowsLista.map((row) => ({
      periodo: row.PDOCVE,
      materia: row.MATCVE,
      grupo: row.GPOCVE,
      matricula: row.ALUCTR,
    }));

    const groupedData = [...dataGrupos, ...dataLista].reduce(
      (acc: any, item: any) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const key = `${item.periodo}-${item.materia}-${item.grupo}`;
        acc[key] = acc[key] || {
          periodo: item.periodo,
          materia: item.materia,
          grupo: item.grupo,
        };
        if (item.id_docente) {
          acc[key].id_docente = item.id_docente;
        }
        if (item.matricula) {
          acc[key].matriculas = acc[key].matriculas || [];
          acc[key].matriculas.push(item.matricula);
        }
        return acc;
      },
      {}
    );

    const newCourses = Object.values(groupedData).map((item: any) => ({
      periodo: item.periodo,
      materia: item.materia,
      grupo: item.grupo,
      matricula: item.matriculas || [],
      id_docente: item.id_docente || '',
    }));

    CURSOS_NUEVOS_LENGTH = newCourses.length;

    for (let curso = 0; curso <= CURSOS_NUEVOS_LENGTH; curso++) {
      if (newCourses[curso] === undefined) continue;
      if (newCourses[curso].periodo !== CURRENT_PERIOD) continue;

      const idDocente: number = newCourses[curso].id_docente;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const idMateria = await obtenerIdMateria(`${newCourses[curso].materia}`);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const idGrupo = await obtenerIdGrupo(`${newCourses[curso].grupo}`);
      const existeDocente = await validarIdDocente(idDocente);

      if (
        newCourses[curso].periodo == null ||
        idMateria == null ||
        idGrupo == null ||
        newCourses[curso].id_docente == null ||
        existeDocente === false
      ) {
        continue;
      }

      const courseId = await createCourse(
        newCourses[curso].periodo,
        idMateria,
        idGrupo,
        newCourses[curso].id_docente
      );

      if (courseId != null) {
        const matriculaLength = newCourses[curso].matricula.length;
        const cuestionarioId = await CuestionarioAlumnoDocente.max(
          'id_cuestionario_ad'
        );

        for (let alumno = 0; alumno < matriculaLength; alumno++) {
          const matricula: string = newCourses[curso].matricula[alumno];
          const matriculaValidada = await validarMatriculaAlumno(matricula);

          if (!matriculaValidada) continue;

          await CourseHasAlumno.create({ id_curso: courseId, matricula });

          await Encuesta.create({
            id_curso: courseId,
            matricula_alumno: newCourses[curso].matricula[alumno],
            id_cuestionario_ad: cuestionarioId,
            estatus: 0,
          });
        }
      }
    }

    return {
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Cursos y encuestas creados correctamente',
    };
  } catch (error) {
    console.error('An error ocurred crearCursoEncuesta: ', error);
    return {
      code: STATUS_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      messageCode: MESSAGES_CODE_RESPONSE.INTERNAL_SERVER_ERROR,
      data: null,
      message: 'Error al crear los cursos y encuestas',
    };
  }
};
