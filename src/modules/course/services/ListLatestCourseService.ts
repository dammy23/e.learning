import { getRepository } from 'typeorm';

import Course from '../infra/typeorm/entities/Course';
import Lesson from '../../lesson/infra/typeorm/entities/Lesson';
interface Request {
    id: string;
}

class ListLatestCourseService {
    public async execute({id}: Request): Promise<Course[]> {
        const latestRepository = getRepository(Course);
        const courseExists = await latestRepository.findOne(id);
        if (!courseExists) {
            throw new Error('Course does not exists');
        }
        
        
        const search=courseExists.created_at.getFullYear()+"-"+(courseExists.created_at.getMonth()+1)+"-"+courseExists.created_at.getDate()+" "+courseExists.created_at.getHours()+":"+courseExists.created_at.getMinutes()+":"+(courseExists.created_at.getSeconds()+1);
        
        const coursesRepository = getRepository(Course).createQueryBuilder().where("created_at > '"+search+"'");
        //console.log(coursesRepository.getQuery())

        const courses = await coursesRepository.getMany();
        
        return courses;
    }
}

export default ListLatestCourseService;