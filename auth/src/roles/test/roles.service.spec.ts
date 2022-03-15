import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';

import { Role } from '../schema';
import { RolesService } from '../roles.service';
import { roleNew, roleExisting } from './stubs/role.stub';

import { RolesRepository } from '../roles.repository';
jest.mock('../roles.repository');

describe('RolesService', () => {
  let service: RolesService;

  describe('find operations', () => {
    let repository: RolesRepository;
    let label: string;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [RolesService, RolesRepository],
      }).compile();

      service = moduleRef.get<RolesService>(RolesService);
      repository = moduleRef.get<RolesRepository>(RolesRepository);

      label = roleExisting().label;

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let role: Role;
        let roleFilterQuery: FilterQuery<Role>;

        beforeEach(async () => {
          jest.spyOn(repository, 'findOne');
          role = await service.findOne(label);
          roleFilterQuery = {
            label,
          };
        });

        test('then it should call the repository', () => {
          expect(repository.findOne).toHaveBeenCalledWith(roleFilterQuery);
        });

        test('then it should return a role', () => {
          expect(role).toEqual(roleExisting());
        });
      });
      describe('when NO record exists', () => {
        let role;

        test('then it should return NULL', async () => {
          role = await service.findOne('not-a-real-role');
          expect(role).toBeNull();
        });
      });
    });
    describe('find', () => {
      describe('when records exist', () => {
        let roles: Role[];
        let roleFilterQuery: FilterQuery<Role>;

        beforeEach(async () => {
          jest.spyOn(repository, 'find');
          roleFilterQuery = {};
          roles = await service.find();
        });

        test('then it should call the repository', () => {
          expect(repository.find).toHaveBeenCalledWith(roleFilterQuery);
        });

        test('then it should return an array of ALL the roles', () => {
          expect(roles).toEqual([roleExisting()]);
        });
      });
      describe('when NO records exist', () => {
        test.todo('then it should return an empty array');
      });
    });
  });
  describe('save operations', () => {
    let repository: RolesRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [RolesService, RolesRepository],
      }).compile();

      service = module.get<RolesService>(RolesService);
      repository = module.get<RolesRepository>(RolesRepository);

      jest.clearAllMocks();
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let role: Role;

        beforeEach(async () => {
          role = await service.save(roleNew());
        });

        it('should call the repository', () => {
          expect(repository.save).toHaveBeenCalledWith(roleNew());
        });

        it('should return the newly created role', () => {
          expect(role).toEqual(roleExisting());
        });
      });
    });
  });
});
