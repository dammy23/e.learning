import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('lessons')
class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    count: number;

    @Column()
    name: string;

    @Column('decimal')
    duration: number;

    @Column()
    course_id: string;

    @Column()
    description: string;

    @Column()
    video_id: string;

    @Column()
    type: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson;