import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as basicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mysql from 'mysql2';

async function initialize() {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\`;`,

    async (err, results) => {
      results
        ? console.log(`Create Database ${process.env.MYSQL_DB} complete!`)
        : console.log(err);
    },
  );

  connection.end();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT;

  app.use(cookieParser());

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJS')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

Promise.resolve(initialize()).then(async () => {
  setTimeout(bootstrap, 2000);
});
// bootstrap();
