import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Role } from '../schema';
import { RolesRepository } from '../roles.repository';
import { roleExisting } from './stubs/role.stub';
import { RoleMockModel } from './support/role.model';

describe('RolesRepository', () => {
  let repository: RolesRepository;

  describe('find operations', () => {
    let mockModel: RoleMockModel;
    let filterQuery: FilterQuery<Role>;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          RolesRepository,
          {
            provide: getModelToken(Role.name),
            useClass: RoleMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<RolesRepository>(RolesRepository);
      mockModel = moduleRef.get<RoleMockModel>(getModelToken(Role.name));

      filterQuery = {
        label: roleExisting().label,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let role: Role;

        beforeEach(async () => {
          jest.spyOn(mockModel, 'findOne');
          role = await repository.findOne(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.findOne).toHaveBeenCalledWith(filterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a role', () => {
          expect(role).toEqual(roleExisting());
        });
      });
    });

    describe('find', () => {
      describe('when records exist', () => {
        let roles: Role[];

        beforeEach(async () => {
          jest.spyOn(mockModel, 'find');
          roles = await repository.find(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.find).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return an array of roles', () => {
          expect(roles).toEqual([roleExisting()]);
        });
      });
    });
  });
  describe('save operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          RolesRepository,
          {
            provide: getModelToken(Role.name),
            useValue: RoleMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<RolesRepository>(RolesRepository);
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let role: Role;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(RoleMockModel.prototype, 'save');
          constructorSpy = jest.spyOn(
            RoleMockModel.prototype,
            'constructorSpy',
          );
          role = await repository.save(roleExisting());
        });

        test('then it should call the roleModel', () => {
          expect(constructorSpy).toHaveBeenCalledWith(roleExisting());
          expect(saveSpy).toHaveBeenCalled();
        });

        test('then it should return a role', () => {
          expect(role).toEqual(roleExisting());
        });
      });
      describe('when save fails', () => {
        test('then it should throw an error', async () => {
          const saveSpy = jest
            .spyOn(RoleMockModel.prototype, 'save')
            .mockImplementation(() => {
              throw new Error('Role error');
            });
          try {
            await repository.save(roleExisting());
          } catch (error) {
            expect(saveSpy).toHaveBeenCalled();
            expect(error).toBeDefined();
          }
        });
      });
    });
  });
});
