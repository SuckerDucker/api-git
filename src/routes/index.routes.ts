import { Router } from 'express';
import authRouter from '@routes/auth.routes';
import studentRouter from '@routes/student.routes';
import periodRouter from '@routes/period.routes';
import coordinatorController from '@routes/coodinator.routes';
import adminRouter from '@routes/admin.routes';
import validateToken from '@middlewares/protectedRoute.middleware';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const routerAPI = Router();

routerAPI.use('/auth', authRouter);
routerAPI.use('/student', validateToken, studentRouter);
routerAPI.use('/period', validateToken, periodRouter);
routerAPI.use('/coodinator', validateToken, coordinatorController);
routerAPI.use('/admin', validateToken, adminRouter);

export default routerAPI;
