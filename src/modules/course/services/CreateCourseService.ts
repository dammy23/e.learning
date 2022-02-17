import { getRepository } from 'typeorm';

import Course from '../infra/typeorm/entities/Course';

interface Request {
    name: string;
    imageName: string;
    description:string; 
}

class CreateUserService {
    public async execute({ name,description, imageName }: Request): Promise<Course> {
        const coursesRepository = getRepository(Course);

        const course = coursesRepository.create({ name, description, image: imageName });

        await coursesRepository.save(course);

        return course;
    }
}

export default CreateUserService;