import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries]),
    MulterModule.register({
      dest: './uploads',
      fileFilter(req, file, callback) {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'application/pdf'
        ) {
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png, .jpg, .jpeg and .pdf format allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 1 * 1024 * 1024 },
    }),
  ],
  providers: [],
  controllers: [RegControll],
})
export class ServerModule {}
