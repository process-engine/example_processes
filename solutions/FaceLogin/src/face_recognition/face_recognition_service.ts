const FaceAPIClient = require('azure-cognitiveservices-face');
import * as fs from 'fs';
import {Logger} from 'loggerhythm';
import {CognitiveServicesCredentials} from 'ms-rest-azure';
import {FaceRecognitionRepository} from './face_recognition_repository';

const logger: Logger = Logger.createLogger('face recognition service');

export class FaceRecognitionService {

  public config: {
    apiKey: string,
    endpoint: string,
  };
  private client;
  private faceRecognitionRepository: FaceRecognitionRepository;

  constructor(faceRecognitionRepository: FaceRecognitionRepository) {

    this.faceRecognitionRepository = faceRecognitionRepository;
  }

  public addUser(userName: string, imageDataURL: string): Promise<void> {

    return this.generateFaceId(imageDataURL)
      .then((faceId: string) => {
        return this.faceRecognitionRepository.addUser(userName, faceId);
      });
  }

  public async initialize(): Promise<void> {

    const credentials: CognitiveServicesCredentials = new CognitiveServicesCredentials(this.config.apiKey);
    const endpoint: string = this.config.endpoint.replace('.api.cognitive.microsoft.com', '');
    this.client = new FaceAPIClient(credentials, endpoint);
  }

  public generateFaceId(imageDataURL: string): Promise<string> {

    const imageBuffer: Buffer = new Buffer(imageDataURL.split(',')[1], 'base64');

    return this.client.face.detectInStreamWithHttpOperationResponse(imageBuffer as any, {
      returnFaceId: true,
    }).then((detectResponse) => {

      if (detectResponse.body[0] === undefined) {
        const noFaceError: Error = new Error('Could not identify face.');
        logger.error('Could not identify face.', noFaceError);
        throw noFaceError;
      }
      const {faceId} = detectResponse.body[0];

      return faceId;
    });

  }

  public userMatchesFaceId(userName: string, faceId: string): Promise<boolean> {

    return this.faceRecognitionRepository.getFaceId(userName)
      .then((userFaceId: string) => {

        if (!userFaceId) {
          return undefined;
        }
        return this.client.face.verifyWithHttpOperationResponse(faceId, userFaceId);

      }).then((verificationResponse) => {

        if (!verificationResponse) {
          return false;
        }
        return verificationResponse.body.isIdentical;
      });

  }
}
