import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';

interface Request {
    id: string;
    name: string;
    email: string;
}

class UpdateUserService {
    public async execute({ id, name, email}: Request): Promise<User> {
        const lessonsRepository = getRepository(User);

        const lessonExists = await lessonsRepository.findOne(id);

        if (!lessonExists) {
            throw new Error('User does not exists');
        }

        lessonExists.name = name;
        lessonExists.email = email;
        
        lessonExists.updated_at = new Date(Date.now());


        return await lessonsRepository.save(lessonExists);
    }
}

export default UpdateUserService;