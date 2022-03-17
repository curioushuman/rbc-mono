import { Test, TestingModule } from '@nestjs/testing';

import { RolesController } from '../roles.controller';
import { roleExisting, createRoleDto, updateRoleDto } from './stubs/role.stub';
import { Role } from '../schema';

import { RolesService } from '../roles.service';
jest.mock('../roles.service');

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    }).compile();

    controller = moduleRef.get<RolesController>(RolesController);
    service = moduleRef.get<RolesService>(RolesService);
    jest.clearAllMocks();
  });

  describe('getOne', () => {
    describe('when a record that exists is requested', () => {
      let label: string;
      let role: Role;

      beforeEach(async () => {
        label = roleExisting().label;
        role = await controller.getOne(label);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(label);
      });

      test('then it should return a Role', () => {
        expect(role).toEqual(roleExisting());
      });
    });
    describe('when a record that does NOT EXIST is requested', () => {
      test.todo('then it should return a 404');
      // test('then it should return a 404', async (done) => {
      // try {
      // await controller.getOne('not-a-real-role');
      // } catch (err) {
      // if (err.status === '404') {
      // done();
      // }
      // }
      // });
    });
  });

  describe('get', () => {
    describe('when records exist', () => {
      let roles: Role[];

      beforeEach(async () => {
        roles = await controller.get();
      });

      test('then it should call service', () => {
        expect(service.find).toHaveBeenCalled();
      });

      test('then it should return an array of Roles', () => {
        expect(roles).toEqual([roleExisting()]);
      });
    });
  });

  describe('create', () => {
    describe('when all fields are valid', () => {
      let role: Role;

      beforeEach(async () => {
        role = await controller.create(createRoleDto());
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(createRoleDto());
      });

      test('then it should return a Role', () => {
        expect(role).toEqual(roleExisting());
      });
    });
  });
  describe('update', () => {
    describe('when all fields are valid', () => {
      let role: Role;

      beforeEach(async () => {
        role = await controller.update(roleExisting().label, updateRoleDto());
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(
          roleExisting(),
          updateRoleDto(),
        );
      });

      test('then it should return a Role', () => {
        expect(role).toEqual(roleExisting());
      });
    });
  });
});
