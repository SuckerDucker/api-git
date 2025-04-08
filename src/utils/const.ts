export const folderUpload = Object.freeze('uploads');
export const encodingDBF = Object.freeze('iso-8859-1');
export const dirFiles = Object.freeze('./uploads');

export const expectedFilesDBF = Object.freeze([
  'DALUMN.DBF',
  'DGRUPO.DBF',
  'DLISTA.DBF',
  'DMATER.DBF',
  'DPERSO.DBF',
]);

export const dirFilesDBF = Object.freeze({
  DALUMN: `${folderUpload}/DALUMN.DBF`,
  DGRUPO: `${folderUpload}/DGRUPO.DBF`,
  DLISTA: `${folderUpload}/DLISTA.DBF`,
  DMATER: `${folderUpload}/DMATER.DBF`,
  DPERSO: `${folderUpload}/DPERSO.DBF`,
});

export const TIMEOUT_PROCESING_DBF = Object.freeze(1000 * 60 * 30); // 30 minutos, tiempo de espera para procesar los archivos DBF

export const MESSAGES_CODE_RESPONSE = Object.freeze({
  OK: 'OK',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
});

export const STATUS_CODE_RESPONSE = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
});

export const ROLE_USER = Object.freeze({
  ADMIN: 'administrator',
  COORDINATOR: 'coordinator',
  TEACHER: 'teacher',
  STUDENT: 'student',
});

export const STATUS_PERIOD = Object.freeze({
  ACTIVE: 1,
  INACTIVE: 0,
});
