import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { GoogleStorage } from '../utils/google';

// Main service for the posts entity
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private posts: Repository<Post>,
    ) {}

    /**
     * This fucntion creates a new post
     * @param createPostDto The new post to create
     */
    create(createPostDto: CreatePostDto) {
        return this.posts.save(createPostDto);
    }

    /**
     * This fucntion returns all the posts
     * @returns
     */
    findAll(query_params?: any) {
        // Use the query paramas to make a query

        // Query options to consider: Page, Text query, sort by, etc.

        return this.posts.find();
    }

    async findOne(id: number) {
        return this.posts.findOne({ where: { id } });
    }

    /**
     * This function will update the details of a post
     * @param id The id of the post
     * @param updatePostDto The detaisl to update
     * @returns The updated post
     */
    async update(id: number, updatePostDto: UpdatePostDto) {
        const post = await this.checkExsists(id);
        return this.posts.save({ ...post, ...updatePostDto });
    }

    /**
     * This fucntion deletes a post from the database
     * @param id The id of the post to delete
     * @returns
     */
    async remove(id: number) {
        await this.checkExsists(id);
        return this.posts.delete(id);
    }

    /**
     * This fucntion checks if a post exists, if it deosn't it will throw a HTTP Excepetion
     * @param id The id of the post
     * @returns If the post exists then returns the post, if not throws an error
     */
    async checkExsists(id: number): Promise<Post> {
        const post = await this.findOne(id);
        if (!post) throw new HttpException("Post doesn't exist.", 404);
        return post;
    }

    /**
     * This function will upload a base64 image to AWS S3
     * @param base64 The base64 image
     * @returns The url of the image
     */
    async updateFeaturedImage(id: number, file: any) {
        // Try to get the post
        const post = await this.checkExsists(id);

        // Upload the image to Google Cloud storage
        const url = await GoogleStorage.uploadImage(
            process.env.GOOGLE_IMAGE_BUCKET,
            file,
        );

        // Save the post
        return await this.update(id, {
            ...post,
            featured_image: url,
        });
    }

    /**
     * Upload the image to the storage bucket
     */
    async uploadPostImage(image: any) {
        // Upload the image to Google Cloud storage
        const url = await GoogleStorage.uploadImage(
            process.env.GOOGLE_IMAGE_BUCKET,
            image,
        );

        return url;
    }
}
