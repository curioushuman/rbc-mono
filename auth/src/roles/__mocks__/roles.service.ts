import { when } from 'jest-when';

import { roleExisting } from '../test/stubs/role.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith(roleExisting().label)
  .mockResolvedValue(roleExisting());

const find = jest.fn().mockResolvedValue([roleExisting()]);
// TODO - reinstate when we support this
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith(roleExisting().label)
//   .mockResolvedValue([roleExisting()]);

export const RolesService = jest.fn().mockReturnValue({
  findOne,
  find,
  create: jest.fn().mockResolvedValue(roleExisting()),
  update: jest.fn().mockResolvedValue(roleExisting()),
  save: jest.fn().mockResolvedValue(roleExisting()),
});
