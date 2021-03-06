import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { MongoDbService } from '@curioushuman/rbc-common';

import { AppModule } from '../../../app.module';
import { createRoleDto, roleExisting, roleResponse } from '../stubs/role.stub';

// * NOTES
// Currently disabled, as it won't be able to connect to MongoDB without cluster
//   To re-enable, add .spec at the end of the file

// TODO
// [ ] Complete other endpoints
// [ ] Automate the testing upon cluster creation (or something)

describe('RolesController', () => {
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
    await dbConnection.collection('roles').deleteMany({});
  });

  describe('getRoles', () => {
    describe('When records exist', () => {
      test('Then it should return an array of roles', async () => {
        await dbConnection.collection('roles').insertOne(roleExisting());
        const response = await request(httpServer).get('/roles');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([roleResponse()]);
      });
    });
    describe('When records DO NOT exist', () => {
      test('Then it should return an empty array', async () => {
        const response = await request(httpServer).get('/roles');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([]);
      });
    });
  });

  describe('createRole', () => {
    it('should create a role', async () => {
      const response = await request(httpServer)
        .post('/roles')
        .send(createRoleDto());

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(roleResponse());

      const role = await dbConnection
        .collection('roles')
        .findOne({ label: createRoleDto().label });
      expect(role).toMatchObject(roleExisting());
    });
  });
});
