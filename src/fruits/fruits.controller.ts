import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Fruit from './fruits.model';
import FruitsService from './fruits.service';

@ApiTags('fruits')
@Controller('fruits')
export default class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Post()
  async saveFruit(@Body() fruit: Fruit) {
    const result = await this.fruitsService.saveFruit(fruit);
    return {
      success: true,
      payload: { result },
    };
  }
}
