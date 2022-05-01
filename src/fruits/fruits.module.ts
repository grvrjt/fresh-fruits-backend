import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import FruitsController from './fruits.controller';
import Fruit from './fruits.model';
import FruitsService from './fruits.service';

@Module({
  imports: [TypegooseModule.forFeature([Fruit], 'fresh-fruits')],
  controllers: [FruitsController],
  providers: [FruitsService],
  exports: [FruitsService],
})
export default class FruitsModule {}
