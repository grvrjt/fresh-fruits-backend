import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { config as dotEnvConfig } from 'dotenv';
import * as fs from 'fs';
import * as http from 'http';

dotEnvConfig();
async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const globalPrefix = 'api/v1';

  app.use('health-check', (req, res) => {
    return res.statusCode(200).json({
      success: true,
      message: 'Server is working ',
    });
  });
  app.setGlobalPrefix(globalPrefix);
  app.init();
  http.createServer(server).listen(process.env.PORT || 3000);
  if (!fs.existsSync('public')) fs.mkdirSync('public');
  if (!fs.existsSync('public/images')) fs.mkdirSync('public/images');
}
bootstrap();
