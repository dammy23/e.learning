import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CoursesController from '../controllers/CoursesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const courseRouter = Router();
const upload = multer(uploadConfig);

courseRouter.get('/course/list', CoursesController.show);
courseRouter.get('/course/listlatest/:id', CoursesController.showLatest);
courseRouter.get('/course/search/:id', CoursesController.search);


courseRouter.post('/course/create', ensureAuthenticated, upload.single('image'), CoursesController.create);
courseRouter.put('/course/update/:id', ensureAuthenticated, upload.single('image'), CoursesController.update);
courseRouter.delete('/course/delete/:id', ensureAuthenticated, CoursesController.delete);

export default courseRouter;