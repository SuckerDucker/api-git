import express from 'express';

import adminController from '@controllers/admin/index';
import { upload } from '@middlewares/multer.middleware';

const adminRouter = express.Router();

adminRouter.get(
  '/survey/statistics/students',
  adminController.ListStudentsResSurvey
);
adminRouter.post('/upload/dbf', upload, adminController.uploadDBF);

export default adminRouter;
