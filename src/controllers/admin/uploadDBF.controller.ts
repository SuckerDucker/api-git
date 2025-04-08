import { type Request, type Response } from 'express';

import { reedFile, deleteDir } from '@lib/files';
import generateResponse from '@utils/generateResponse';
import {
  dirFiles,
  expectedFilesDBF,
  dirFilesDBF,
  STATUS_CODE_RESPONSE,
  MESSAGES_CODE_RESPONSE,
  TIMEOUT_PROCESING_DBF,
} from '@utils/const';
import {
  registerStudents,
  registerGroup,
  registerSubjects,
  registerTeacher,
  crearCursoEncuesta,
} from '@model/admin/index';

const uploadDBF = async (_req: Request, res: Response) => {
  try {
    res.setTimeout(TIMEOUT_PROCESING_DBF);

    const files = (await reedFile(dirFiles)) as string[];

    if (files.length === 0) {
      deleteDir(dirFiles);
      res.send({
        code: STATUS_CODE_RESPONSE.NOT_FOUND,
        messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
        data: null,
        message: 'No se recibió ningún archivo',
      });
      return;
    }

    for (const file of expectedFilesDBF) {
      if (!files.includes(file)) {
        deleteDir(dirFiles);
        res.send({
          code: STATUS_CODE_RESPONSE.NOT_FOUND,
          messageCode: MESSAGES_CODE_RESPONSE.NOT_FOUND,
          data: null,
          message: `No se recibió el archivo ${file}`,
        });
        return;
      }
    }

    const resRegisterStudents = await registerStudents(dirFilesDBF.DALUMN);

    if (resRegisterStudents.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(resRegisterStudents.code).send(resRegisterStudents);
      return;
    }

    const resultRegisterGroup = await registerGroup(dirFilesDBF.DGRUPO);

    if (resultRegisterGroup.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(resultRegisterGroup.code).send(resultRegisterGroup);
      return;
    }

    const resultRegisterSubjects = await registerSubjects(dirFilesDBF.DMATER);

    if (resultRegisterSubjects.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(resultRegisterSubjects.code).send(resultRegisterSubjects);
      return;
    }

    const resultRegisterTeacher = await registerTeacher(dirFilesDBF.DPERSO);

    if (resultRegisterTeacher.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(resultRegisterTeacher.code).send(resultRegisterTeacher);
      return;
    }

    const resultCrearCursoEncuesta = await crearCursoEncuesta(
      dirFilesDBF.DGRUPO,
      dirFilesDBF.DLISTA
    );

    if (resultCrearCursoEncuesta.code !== STATUS_CODE_RESPONSE.OK) {
      res.status(resultCrearCursoEncuesta.code).send(resultCrearCursoEncuesta);
      return;
    }

    deleteDir(dirFiles);

    res.send({
      code: STATUS_CODE_RESPONSE.OK,
      messageCode: MESSAGES_CODE_RESPONSE.OK,
      data: null,
      message: 'Se registraron los datos correctamente',
    });
  } catch (error) {
    console.error('An error occurred during file upload: ', error);
    generateResponse(res, null, error);
  }
};

export default uploadDBF;
