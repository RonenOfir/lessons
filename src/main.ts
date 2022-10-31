
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';
// import { SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { loggingConfig } from './loging.config';

async function bootstrap() {
    //Create Winston logger
    const logger = WinstonModule.createLogger(loggingConfig);
    //Create Nest application
    const app = await NestFactory.create(AppModule, {
        logger
    });
    //Create bootstrap logger
    const loggerInstance = new Logger(bootstrap.name);
    //Pull server config
  
  await app.listen(3000);
    loggerInstance.log('Application listening on port 3000');
}

bootstrap();

