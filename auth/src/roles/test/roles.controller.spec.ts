import { Test, TestingModule } from '@nestjs/testing';

import { RolesController } from '../roles.controller';
import { roleNew, roleExisting } from './stubs/role.stub';
import { CreateRoleDto, UpdateRoleDto } from '../dto';
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
      let role: Role;

      beforeEach(async () => {
        role = await controller.getOne(roleExisting().label);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(roleExisting().label);
      });

      test('then it should return a role', () => {
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

      test('then it should return roles', () => {
        expect(roles).toEqual([roleExisting()]);
      });
    });
  });

  describe('create', () => {
    describe('when all fields are valid', () => {
      let role: Role;
      let createRoleDto: CreateRoleDto;

      beforeEach(async () => {
        createRoleDto = {
          label: roleNew().label,
        };
        role = await controller.create(createRoleDto);
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(roleNew());
      });

      test('then it should return a role', () => {
        expect(role).toEqual(roleExisting());
      });
    });
  });
  describe('update', () => {
    describe('when all fields are valid', () => {
      let role: Role;
      let updateRoleDto: UpdateRoleDto;

      beforeEach(async () => {
        updateRoleDto = {
          label: roleNew().label,
        };
        role = await controller.update(roleExisting().label, updateRoleDto);
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(roleExisting());
      });

      test('then it should return a role', () => {
        expect(role).toEqual(roleExisting());
      });
    });
  });
});
