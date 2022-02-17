import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Course from '../infra/typeorm/entities/Course';

interface Request {
    id: string;
    name?: string;
    imageName?: string;
    description: string;
}

class UpdateCourseService {
    public async execute({ id, name, description, imageName }: Request): Promise<Course> {
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

            if (courseImageFileExists && imageName!="None") {
                await fs.promises.unlink(courseImageFilePath);
            }
        }
        console.log(courseExists.image+" "+imageName);
        
        courseExists.name = name ? name : courseExists.name;
        courseExists.description = description ? description : courseExists.description;
        if(imageName=="None"){
            courseExists.image = courseExists.image;
        }else{
            
            courseExists.image = imageName;
        }
        //courseExists.image = imageName ? imageName : courseExists.image;
        courseExists.updated_at = new Date(Date.now());


        return await coursesRepository.save(courseExists);
    }
}

export default UpdateCourseService;