import multer from 'multer';
import { type RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

import { folderUpload } from '@utils/const';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const folderPath = path.join(folderUpload);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    cb(null, folderUpload);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload: RequestHandler = multer({ storage }).fields([
  { name: 'DALUMN.DBF', maxCount: 1 },
  { name: 'DGRUPO.DBF', maxCount: 1 },
  { name: 'DLISTA.DBF', maxCount: 1 },
  { name: 'DMATER.DBF', maxCount: 1 },
  { name: 'DPERSO.DBF', maxCount: 1 },
]);

export const delFolderTemp = () => {
  fs.rm(path.join(folderUpload), { recursive: true }, (err) => {
    if (err) throw err;
  });
};
