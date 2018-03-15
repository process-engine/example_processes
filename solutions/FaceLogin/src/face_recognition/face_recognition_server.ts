// const express = require('express');
// const bodyParser = require('body-parser');
// const FaceAnalyzer = require('./face-analyzer');
// const cors = require('cors');

// const app = express();

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {Express} from 'express';
import {Logger} from 'loggerhythm';
import {FaceRecognitionService} from './face_recognition_service';

const logger: Logger = Logger.createLogger('face recognition server');

export class FaceRecognitionServer {

  private app: Express;
  private faceRecognitionService: FaceRecognitionService;

  constructor(faceRecognitionService: FaceRecognitionService) {

    this.app = express();
    this.faceRecognitionService = faceRecognitionService;
  }

  public start(): void {

    this.app.use(cors());
    this.app.use(bodyParser.json(
      {
        limit: '50mb',
      }));
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // this.app.post('/test', (req, res) => {
    //   const dataURL = req.body.dataURL;
    //   const faceAnalyzer = new FaceAnalyzer();
    //   faceAnalyzer.analyze(dataURL).then((result) => {
    //     console.log(result);
    //     res.send(result);
    //   });
    // });

    this.app.post('/add-user', (req, res) => {
      const {userName, imageDataURL} = req.body;
      console.log('IMPORTANT', Object.keys(req.body));
      this.faceRecognitionService.addUser(userName, imageDataURL)
        .then(() => {
          console.log('user added');
        });
    });
    this.app.listen(3000, () => {
      logger.info('Facerecognition Server started.');
    });
  }

}
