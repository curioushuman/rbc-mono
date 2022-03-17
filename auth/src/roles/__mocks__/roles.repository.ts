import { when } from 'jest-when';

import { roleExisting } from '../test/stubs/role.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith({ label: roleExisting().label })
  .mockResolvedValue(roleExisting());

const find = jest.fn().mockResolvedValue([roleExisting()]);
// TODO - reinstate this later when we support find(filter)
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith({ label: roleExisting().label })
//   .mockResolvedValue([roleExisting()]);

export const RolesRepository = jest.fn().mockReturnValue({
  findOne,
  find,
  save: jest.fn().mockImplementation((role) => Promise.resolve(role)),
});
