import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Course from '../infra/typeorm/entities/Course';

interface Request {
    id: string;
}

class DeleteCourseService {
    public async execute({ id }: Request): Promise<Course> {
        const coursesRepository = getRepository(Course);

        const courseExists = await coursesRepository.findOne(id);

        if (!courseExists) {
            throw new Error('Course does not exists');
        }

        if (courseExists.image) {
            const courseImageFilePath = path.join(
                path.join(__dirname, '..', '..', '..', '..', 'uploads'),
                courseExists.image,
            );

            const courseImageFileExists = await fs.promises.stat(courseImageFilePath);

            if (courseImageFileExists) {
                await fs.promises.unlink(courseImageFilePath);
            }
        }
        console.log(id);
        
        await coursesRepository.delete(id);
        return courseExists;
    }
}

export default DeleteCourseService;