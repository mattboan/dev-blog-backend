import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { convertBufferToBase64 } from 'src/utils/image';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }

    // Route for uploading the featured image
    @Post(':id/featured-image')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.postService.updateFeaturedImage(+id, file.buffer);
    }

    // Add a image to the post
    @Post('content-image')
    @UseInterceptors(FileInterceptor('image'))
    uploadPostImage(@UploadedFile() file: Express.Multer.File) {
        return this.postService.uploadPostImage(file.buffer);
    }
}
