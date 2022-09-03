require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // Configure Services

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(8000);
}
bootstrap();
