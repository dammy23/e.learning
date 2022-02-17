import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Lesson from '../infra/typeorm/entities/Lesson';

interface Request {
    id: string;
}

class DeleteLessonService {
    public async execute({ id }: Request): Promise<Lesson> {
        const lessonsRepository = getRepository(Lesson);

        const lessonExists = await lessonsRepository.findOne(id);

        if (!lessonExists) {
            throw new Error('Lesson does not exists');
        }

        if (lessonExists.image) {
            const lessonImageFilePath = path.join(
                path.join(__dirname, '..', '..', '..', '..', 'uploads'),
                lessonExists.image,
            );

            const lessonImageFileExists = await fs.promises.stat(lessonImageFilePath);

            if (lessonImageFileExists) {
                await fs.promises.unlink(lessonImageFilePath);
            }
        }
        console.log(id);
        
        await lessonsRepository.delete(id);
        return lessonExists;
    }
}

export default DeleteLessonService;