import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @Auth('ADMIN')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]){
    return this.fileService.saveFiles(files)
  }

}
