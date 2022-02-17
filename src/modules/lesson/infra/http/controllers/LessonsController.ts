import { Request, Response } from 'express';

import CreateLessonService from '@modules/lesson/services/CreateLessonService';
import ListLessonsService from '@modules/lesson/services/ListLessonsService';
import UpdateLessonService from '@modules/lesson/services/UpdateLessonService';
import DeleteLessonService from '@modules/lesson/services/DeleteLessonService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, duration, count, course_id, type, description, video_id  } = request.body;

        const createLesson = new CreateLessonService();

        try {
            const lesson = await createLesson.execute({ name, duration, count, course_id, type, description, video_id  });

            return response.json(lesson);
        } catch(err) {
            return response.status(400).json(err.message);
        }
    },
    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, duration, count, course_id,type, description, video_id  } = request.body;

        const updateLesson= new UpdateLessonService();
        
        

            const lesson = await updateLesson.execute({ id, name, duration, count, course_id, type,description, video_id  });

            return response.status(200).json(lesson);
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteLessons = new DeleteLessonService();
        const {id}  = request.params;
        
        await deleteLessons.execute({id});

        return response.status(200).json({ message: 'Lesson Deleted' });
    },
    
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listLessons = new ListLessonsService();

        const lessons = await listLessons.execute(id);

        return response.status(200).json(lessons);
    }
}