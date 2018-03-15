import * as FaceAPIClient from 'azure-cognitiveservices-face';
import * as fs from 'fs';
import {CognitiveServicesCredentials} from 'ms-rest-azure';
import {AzureConfiguration} from './config';
import {FaceRecognitionRepository} from './face_recognition_repository';

export class FaceRecognitionService {

  private client: FaceAPIClient;
  private faceRecognitionRepository: FaceRecognitionRepository;

  constructor(faceRecognitionRepository: FaceRecognitionRepository) {

    const credentials = new CognitiveServicesCredentials(AzureConfiguration.apiKey);
    this.faceRecognitionRepository = faceRecognitionRepository;
    this.client = new FaceAPIClient(credentials, 'westcentralus');
  }

  public addUser(userName: string, imageDataURL: string): Promise<any> {

    const imageBuffer: Buffer = new Buffer(imageDataURL.split(',')[1], 'base64');

    return this.client.face.detectInStreamWithHttpOperationResponse(imageBuffer as any, {
      returnFaceId: true,
    }).then((detectResponse) => {

      const {faceId} = detectResponse.body[0];
      this.faceRecognitionRepository.addUser(userName, faceId);

      // fs.readFile('./users.json', (err, data) => {

      //   return new Promise((resolve, reject) => {
      //     if (err) {
      //       reject(err);
      //     }
      //     resolve(data);
      //   });
      // });
    }).then((userFile) => {

      console.log(userFile);
    });

  }
}
