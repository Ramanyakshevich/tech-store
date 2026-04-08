import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[]) {
    const uploadFolder = `${path}/uploads`;
    await ensureDir(uploadFolder);

    const response = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return {
          url: `/uploads/${file.originalname}`,
          name: file.originalname,
        };
      }),
    );

    return response;
  }
}