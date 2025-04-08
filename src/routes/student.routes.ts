import express from 'express';
import studentController from '@controllers/student/index';

const studentRouter = express.Router();

studentRouter.get('/teacher', studentController.ListTeacher);
studentRouter.get('/questions', studentController.Questions);
studentRouter.post('/answers', studentController.SaveAnswers);

export default studentRouter;
