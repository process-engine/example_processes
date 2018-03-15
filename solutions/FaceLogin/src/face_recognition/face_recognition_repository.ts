import * as fs from 'fs';
import {Logger} from 'loggerhythm';

const logger: Logger = Logger.createLogger('Face recognition database');

export class FaceRecognitionRepository {

  public addUser(userName: string, faceId: string): Promise<void>{

    return new Promise((resolve, reject) => {

      fs.readFile('users.json', (readError: Error, data: Buffer) => {

        if (readError) {
          logger.error('Encountered error reading database:', readError);
          reject();
        }
        const fileString: string = data.toString('utf8');
        const database: {
          [faceId: string]: string,
        } = JSON.parse(fileString);
        database[userName] = faceId;

        const indentation: number = 2;
        const indentedDatabaseString: string = JSON.stringify(database, null, indentation);
        fs.writeFile('users.json', indentedDatabaseString, (writeError: Error) => {

          if (writeError) {
            logger.error('Encountered error writing to database:', writeError);
            reject();
          }
          return resolve();
        });
      });
    });

  }

}
