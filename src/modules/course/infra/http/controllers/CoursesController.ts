import { Request, Response } from 'express';

import CreateCourseService from '@modules/course/services/CreateCourseService';
import UpdateCourseService from '@modules/course/services/UpdateCourseService';
import ListCourseService from '@modules/course/services/ListCourseService';
import DeleteCourseService from '@modules/course/services/DeleteCourseService';
import ListLatestCourseService from '@modules/course/services/ListLatestCourseService';
import SearchCourseService from '@modules/course/services/SearchCourseService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { name,description } = request.body;
        const createCourse = new CreateCourseService();

        const course = await createCourse.execute({ name, description,imageName: request.file.filename });

        return response.status(200).json(course);
    },

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name,description } = request.body;

        const updateCourse = new UpdateCourseService();
        
        

        try {
            var file="None";
            if(request.file!=undefined){
                file=request.file.filename
            }
            const course = await updateCourse.execute({ id, name, description, imageName: file });

            return response.status(200).json(course);
        } catch (err) {
            console.log(err);
            return response.status(400).json({ message: 'Course does not exists' });
        }
    },

    async show(request: Request, response: Response): Promise<Response> {
        const listCourses = new ListCourseService();

        const res = await listCourses.execute();

        return response.status(200).json(res);
    },
    async showLatest(request: Request, response: Response): Promise<Response> {
        const listCourses = new ListLatestCourseService();
        const {id}  = request.params;

        const res = await listCourses.execute({id});

        return response.status(200).json(res);
    },
    
    async search(request: Request, response: Response): Promise<Response> {
        const listCourses = new SearchCourseService();
        const {id}  = request.params;

        const res = await listCourses.execute({id});

        return response.status(200).json(res);
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteCourses = new DeleteCourseService();
        const {id}  = request.params;
        
        await deleteCourses.execute({id});

        return response.status(200).json({ message: 'Course Deleted' });
    }
}