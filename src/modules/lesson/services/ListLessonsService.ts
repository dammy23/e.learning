import { getRepository } from 'typeorm';

import Lesson from '../infra/typeorm/entities/Lesson';

class ListLessonsService {
    public async execute(id: string): Promise<Lesson[]> {
        const lessonsRepository = getRepository(Lesson).createQueryBuilder().where("course_id = '"+id+"'").orderBy('count', 'ASC');

        const lessons = await lessonsRepository.getMany();

        return lessons;
    }
}

export default ListLessonsService;