import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  const reflector = app.get(Reflector);
  app.enableCors()
  app.useGlobalFilters(        
    new ErrorFilter(reflector)
  );

  const config = new DocumentBuilder()
    .setTitle('Book Store API')
    .setDescription('API documentation for the Book Store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3001).then(() => {
    console.log(' is running on Port:3001');
  });
}
bootstrap();
