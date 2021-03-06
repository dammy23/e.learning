import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';


const usersRouter = Router();

usersRouter.post('/user/create', UsersController.create);
usersRouter.post('/user/authenticate', SessionsController.create);
usersRouter.get('/user/list', UsersController.show);
usersRouter.put('/user/update/:id', ensureAuthenticated, UsersController.update);
usersRouter.delete('/user/delete/:id', ensureAuthenticated, UsersController.delete);


export default usersRouter;