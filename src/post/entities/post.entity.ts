import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({
        default: '',
    })
    desc: string; // Description

    @Column({
        default: '',
    })
    featured_image: string; // URL for the image

    @Column({
        type: 'text',
        default: '',
    })
    content: string;

    tags: string[];
}
