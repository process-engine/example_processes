import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {Express, Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {FaceRecognitionService} from './face_recognition_service';

const logger: Logger = Logger.createLogger('face recognition server');
const port: number = 3000;

export class FaceRecognitionServer {

  private _app: Express;
  private faceRecognitionService: FaceRecognitionService;

  constructor(faceRecognitionService: FaceRecognitionService) {

    this._app = express();
    this.faceRecognitionService = faceRecognitionService;
  }

  public start(): void {

    this._app.use(cors());
    this._app.use(bodyParser.json(
      {
        limit: '50mb',
      }));
    this._app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this._app.use('/static', express.static('frontend'));

    this._app.post('/add-user', (req: Request, res: Response) => {

      const {userName, imageDataURL} = req.body;
      this.faceRecognitionService.addUser(userName, imageDataURL)
        .then(() => {

          logger.info('User was added to database.');
          res.send('OK');
        }).catch((err: Error) => {

          res.status(500).send(err.message);
        });
    });

    this._app.post('/login', (req: Request, res: Response) => {
      const {userName, imageDataURL} = req.body;
      this.faceRecognitionService.userMatchesFaceId(userName, imageDataURL)
        .then((verified: boolean) => {

          const unauthorizedCode: number = 401;
          res.status(unauthorizedCode).send('User could not be verified');
        }).catch((err: Error) => {

          res.status(500).send(err.message);
        });
    });

    this._app.post('/generate-face-id', (req: Request, res: Response) => {
      const {imageDataURL} = req.body;
      this.faceRecognitionService.generateFaceId(imageDataURL)
        .then((faceId: string) => {

          res.send(faceId);
        }).catch((err: Error) => {

          res.status(500).send(err.message);
        });
    });

    this._app.listen(port, () => {
      logger.info('Face recognition server started.');
    });
  }

}
