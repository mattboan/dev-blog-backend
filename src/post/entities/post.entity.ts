import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column()
    desc: string; // Description

    @Column()
    thumb: string; // URL for the image

    @Column({
        type: 'text',
    })
    content: string;

    tags: string[];
}
