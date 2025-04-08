import express from 'express';
import periodController from '@controllers/period/index';

const periodRouter = express.Router();

periodRouter.post('/', periodController.CreatePeriod);
periodRouter.get('/', periodController.ListPeriod);
periodRouter.put('/', periodController.ChangeStatus);
// periodRouter.delete('/', periodController.DeletePeriod);
periodRouter.get('/current', periodController.CurrentPeriod);

export default periodRouter;
