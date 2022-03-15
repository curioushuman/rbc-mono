import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { tierNew, tierExisting } from '../stubs/tier.stub';
import { CreateTierDto } from '../../dto';

// * NOTES
// Currently disabled, as it won't be able to connect to MongoDB without cluster

// TODO
// [ ] Complete other endpoints
// [ ] Automate the testing upon cluster creation (or something)

describe('TiersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('tiers').deleteMany({});
  });

  describe('getTiers', () => {
    describe('When records exist', () => {
      test('Then it should return an array of tiers', async () => {
        await dbConnection.collection('tiers').insertOne(tierExisting());
        const response = await request(httpServer).get('/tiers');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([tierExisting()]);
      });
    });
    describe('When records DO NOT exist', () => {
      test('Then it should return an empty array', async () => {
        const response = await request(httpServer).get('/tiers');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([]);
      });
    });
  });

  describe('createTier', () => {
    it('should create a tier', async () => {
      const createTierDto: CreateTierDto = tierNew();
      const response = await request(httpServer)
        .post('/tiers')
        .send(createTierDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createTierDto);

      const tier = await dbConnection
        .collection('tiers')
        .findOne({ label: createTierDto.label });
      expect(tier).toMatchObject(createTierDto);
    });
  });
});
