import * as fs from 'fs';
import * as promisify from 'promisify';

export class FaceRecognitionRepository {

  public addUser(userName: string, faceId: string): void {

  }

  public getUserByFaceId(faceId: string): string {
    const promisifiedAccess = promisify(fs.access);

    promisifiedAccess('users.json')
      .then((result) => {
        console.log(result);
      });
    return 'test';
  }
}
