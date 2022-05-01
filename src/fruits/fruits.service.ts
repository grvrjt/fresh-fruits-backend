import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import Fruit from './fruits.model';

@Injectable()
export default class FruitsService {
  constructor(
    @InjectModel(Fruit)
    private readonly fruitModel: ReturnModelType<typeof Fruit>,
    // eslint-disable-next-line no-unused-vars
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  async saveFruit(fruit: Fruit): Promise<Fruit> {
    try {
      const newFruit = new this.fruitModel({
        ...fruit,
      });
      return await newFruit.save();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          success: false,
          message: error.message,
          error,
        },
        400,
      );
    }
  }
}
