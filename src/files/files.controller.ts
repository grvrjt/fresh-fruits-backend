import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  Res,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { config } from 'dotenv';
import FilesService from './files.service';

config();
@ApiTags('files')
@Controller('files')
export class FilesController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      const payload = await this.filesService.fileUploadLocally(
        request,
        response,
      );
      return response.json({
        success: true,
        payload,
      });
    } catch (error) {
      throw new HttpException(
        { success: false, message: `Failed to upload file: ${error.message}` },
        400,
      );
    }
  }

  @Get(':key(*)')
  async getFiles(@Param('key') key, @Res() res) {
    const response = await this.filesService.getFile(key, res);
    return response;
  }
}
