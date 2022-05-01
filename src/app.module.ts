import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import FruitsModule from './fruits/fruits.module';

config();

const freshFruitsConnection: TypegooseConnectionOptions = {
  authSource: `${process.env.AUTH_SOURCE}`,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectionName: 'fresh-fruits',
};

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
          filename: 'combined.log',
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
          filename: 'debug.log',
          level: 'debug',
        }),
        // other transports...
      ],
    }),
    TypegooseModule.forRoot(`${process.env.MONGO_URI}`, freshFruitsConnection),
    FruitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
