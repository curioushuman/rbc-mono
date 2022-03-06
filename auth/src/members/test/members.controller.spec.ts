import { Test, TestingModule } from '@nestjs/testing';

import { MembersController } from '../members.controller';
import { MembersService } from '../members.service';
import { Member } from '../schema';
import { findOneQuery } from '../types';
import { memAlpha, memBeta } from './members.stub';

// UPTO
// - these tests currently fail
// - this is decent scaffolding for our tests just to get an understanding of the process
// - next steps is to complete the correct infrastructure and then come back to it

// TODO
// - testing create and update; after we make changes to structure
// - testing mappers (if they remain, or within profile)

describe('MembersController', () => {
  let controller: MembersController;
  let fakeMembersService: Partial<MembersService>;

  beforeEach(async () => {
    fakeMembersService = {
      findOne: (query: findOneQuery) => {
        return Promise.resolve({
          id: query.id,
          emails: memAlpha.emails,
        } as Member);
      },
      findAll: () => {
        return Promise.resolve([memAlpha, memBeta]);
      },
      // create: () => Promise.resolve(memAlpha),
      // update: () => Promise.resolve(memBeta),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: fakeMembersService,
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll returns a list of members', async () => {
    const members = await controller.findAll();
    expect(members.length).toEqual(2);
  });

  it('findOne returns a single member', async () => {
    const member = await controller.findOne(memAlpha.id);
    expect(member).toBeDefined();
  });
  it('findOne returns a NotFound exception', async (done) => {
    fakeMembersService.findOne = () => null;
    try {
      await controller.findOne('blahId');
    } catch (err) {
      done();
    }
  });
});
