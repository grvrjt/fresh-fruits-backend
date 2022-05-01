import { Inject, Injectable, Logger, HttpException } from '@nestjs/common';
import { config } from 'dotenv';
import { v1 as uuidv1 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

config();

@Injectable()
export default class FilesService {
  // eslint-disable-next-line no-unused-vars
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  getFile = (key: string, res) => {
    try {
      const imagePath = path.join(`public/images`, key);
      if (!fs.existsSync(imagePath)) return res.send('File Not Exist !!');
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      const readStream = fs.createReadStream(imagePath);
      readStream.pipe(res);

      return readStream;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        {
          success: false,
          message: err.message,
          err,
        },
        400,
      );
    }
  };

  private storage = multer.diskStorage({
    destination(req, _, cb) {
      cb(null, `public/images/`);
    },
    filename(req, file, cb) {
      cb(null, req.body.key || `${uuidv1()}${file.originalname}`);
    },
  });

  private localUpload = multer({
    storage: this.storage,
  }).array('file', 1);

  uploadImagesLocally = (req, res): Promise<{ location: string }> => {
    try {
      return new Promise((resolve, reject) => {
        return this.localUpload(req, res, (error) => {
          if (error) {
            reject(`Failed to upload file: ${error}`);
          }
          if (req.files.length === 0) {
            reject(`Failed to upload file`);
          } else {
            resolve({ location: req.files[0].path });
          }
        });
      });
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  };

  fileUploadLocally = (req, res) => {
    try {
      return this.uploadImagesLocally(req, res);
    } catch (error) {
      // console.log(error);
      return new Error(`Failed to upload file: ${error}`);
    }
  };
}
