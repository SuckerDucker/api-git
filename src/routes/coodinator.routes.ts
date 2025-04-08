import express from 'express';

import coordinatorController from '@controllers/coordinator/index';

const coordinatorRouter = express.Router();

coordinatorRouter.get('/career', coordinatorController.InfoCareer);

coordinatorRouter.get('/general', coordinatorController.GeneralInfo);

coordinatorRouter.get('/teacher', coordinatorController.ListTeacher);

coordinatorRouter.get('/student', coordinatorController.GroupsSurveyedStudents);

export default coordinatorRouter;
