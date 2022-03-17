import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { MongoDbService } from '@curioushuman/rbc-common';

import { AppModule } from '../../../app.module';
import {
  createProfileDto,
  profileExisting,
  profileExtResponse,
} from '../stubs/profile.stub';

// * NOTES
// Currently disabled, as it won't be able to connect to MongoDB without cluster
//   To re-enable, add .spec at the end of the file

// TODO
// [ ] Complete other endpoints
// [ ] Automate the testing upon cluster creation (or something)

describe('ProfilesController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<MongoDbService>(MongoDbService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('profiles').deleteMany({});
  });
});
