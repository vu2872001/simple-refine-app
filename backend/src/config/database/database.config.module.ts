import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
  // imports: [
  //   SequelizeModule.forRootAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService) => ({
  //       dialect: 'mysql',
  //       host: configService.get('MYSQL_HOST'),
  //       port: configService.get('MYSQL_PORT'),
  //       username: configService.get('MYSQL_USER'),
  //       password: configService.get('MYSQL_PASSWORD'),
  //       database: configService.get('MYSQL_DB'),
  //       models: [__dirname + '/../../**/**/**.entity{.ts,.js}'],
  //     }),
  //   }),
  // ],
})
export class DatabaseModule {}
