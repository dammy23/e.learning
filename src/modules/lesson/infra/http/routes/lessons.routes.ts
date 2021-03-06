import { Router } from 'express';

import LessonsController from '../controllers/LessonsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const lessonsRouter = Router();

lessonsRouter.get('/lesson/list/:id', LessonsController.show);
lessonsRouter.post('/lesson/create', ensureAuthenticated, LessonsController.create);
lessonsRouter.put('/lesson/update/:id', ensureAuthenticated, LessonsController.update);
lessonsRouter.delete('/lesson/delete/:id', ensureAuthenticated, LessonsController.delete);

export default lessonsRouter;