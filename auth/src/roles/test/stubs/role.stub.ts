import { Role } from '../../schema';

export const roleNew = (): Role => {
  return {
    label: 'Subscriber',
    permissions: [],
    subscriptionTypeId: '123abc',
  };
};

export const roleExisting = (): Role => {
  return roleNew();
};

export const roleError = (): Role => {
  return {
    label: 'Aggggh no',
    permissions: [],
    subscriptionTypeId: '123abc',
  };
};
