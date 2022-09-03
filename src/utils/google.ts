import { Storage } from '@google-cloud/storage';
import { getImageType } from './image';

// Create a storage client instance
const storage = new Storage({
    keyFilename: process.env.GOOGLE_KEY_FILE,
});

// Create a class to interface with the storage client
class GoogleStorageInstance {
    // Make this class a singleton
    private static instance: GoogleStorageInstance;

    private constructor() {}

    // Get the instance
    static getInstance() {
        if (!GoogleStorageInstance.instance) {
            GoogleStorageInstance.instance = new GoogleStorageInstance();
        }
        return GoogleStorageInstance.instance;
    }

    // Create a bucket to store the images
    private bucket = storage.bucket('blog-images');

    // Generate the image uri
    generateImageUri(file_type: string) {
        // Use the time to create a unique name
        const time = new Date().getTime();
        return time.toString() + '.' + file_type;
    }

    /**
     * Upload the image to the storage bucket
     * @param image The image as a base64 string
     * @returns The URL of the image
     */
    async uploadImage(bucket: string, image: string) {
        // Get the file type
        const { file_type, mime_type } = {
            file_type: 'png',
            mime_type: 'image/png',
        };
        const uri = this.generateImageUri(file_type);

        // Create the bucket
        const bucket_instance = storage.bucket(bucket);

        // Create a new file
        const file = bucket_instance.file(uri);

        // Upload the image
        await file.save(image, {
            // contentType: mime_type,
            // public: true,
        });

        // Create the public url
        return `https://storage.googleapis.com/${bucket}/${uri}`;
    }
}

export const GoogleStorage = GoogleStorageInstance.getInstance();
