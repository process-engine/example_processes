import * as FaceAPIClient from 'azure-cognitiveservices-face';
import * as fs from 'fs';
import {CognitiveServicesCredentials} from 'ms-rest-azure';
import {FaceRecognitionRepository} from './face_recognition_repository';

export class FaceRecognitionService {

  public config: {
    apiKey: string,
    endpoint: string,
  };
  private client: FaceAPIClient;
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
    this.client = new FaceAPIClient(credentials, this.config.endpoint);
  }

  public generateFaceId(imageDataURL: string): Promise<string> {

    const imageBuffer: Buffer = new Buffer(imageDataURL.split(',')[1], 'base64');

    return this.client.face.detectInStreamWithHttpOperationResponse(imageBuffer as any, {
      returnFaceId: true,
    }).then((detectResponse) => {

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
