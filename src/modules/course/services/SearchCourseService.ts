import { getRepository } from 'typeorm';

import Course from '../infra/typeorm/entities/Course';

interface Request {
    id: string;
}

class SearchCourseService {
    public async execute({id}: Request): Promise<Course> {
        const latestRepository = getRepository(Course);
        console.log(id);
        
        const courses = await latestRepository.findOne(id);
        if (!courses) {

            throw new Error('Course does not exists');
        }
        
        return courses;
    }
}

export default SearchCourseService;