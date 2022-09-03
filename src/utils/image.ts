import { HttpException } from '@nestjs/common';

// Convert image buffer to base64
export const convertBufferToBase64 = (buffer: Buffer) => {
    const temp = buffer.toString('base64');
    return `data:image/png;base64,${temp}`;
};

/**
 * This function returns the file type and the mime type of an iamge in base64 format
 * @param image The image as a base64 string
 * @returns The file type and mime type of the image
 */
export const getImageType = (image: string) => {
    try {
        const file_type = image.split(';')[0].split('/')[1];
        const mime_type = image.split(';')[0].split(':')[1];
        return { file_type, mime_type };
    } catch (error) {
        throw new HttpException('Invalid base64 image', 400);
    }
};
