import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

class ConfigMulter {
  static UploadFiles(): MulterOptions {
    return {
      dest: './uploads',
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png, .jpg, .jpeg and .pdf format allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 1 * 1024 * 1024 },
    };
  }
}

export { ConfigMulter };
