import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Lesson from '../infra/typeorm/entities/Lesson';

interface Request {
    id: string;
    name: string;
    duration: number;
    count: number;
    course_id: string;
    description: string;
    video_id: string;
    type:string;
}

class UpdateLessonService {
    public async execute({ id, name, duration, count, course_id, type, description, video_id }: Request): Promise<Lesson> {
        const lessonsRepository = getRepository(Lesson);

        const lessonExists = await lessonsRepository.findOne(id);

        if (!lessonExists) {
            throw new Error('Lesson does not exists');
        }

        lessonExists.name = name;
        lessonExists.duration = duration;
        lessonExists.count = count;
        lessonExists.description = description;
        lessonExists.type = type;
        lessonExists.video_id = video_id;
        lessonExists.updated_at = new Date(Date.now());


        return await lessonsRepository.save(lessonExists);
    }
}

export default UpdateLessonService;