import { CreateRoleDto, UpdateRoleDto, RoleExternalDto } from '../../dto';
import { CreateRoleMap, UpdateRoleMap } from '../../mappers';
import { Role } from '../../schema';

export const createRoleDto = (): CreateRoleDto => {
  return {
    label: 'Subscriber',
    subscriptionTypeId: '123abc',
  };
};

export const createRoleMap = (): CreateRoleMap => {
  return {
    label: createRoleDto().label,
    subscriptionTypeId: createRoleDto().subscriptionTypeId,
  };
};

export const createRoleRole = (): Role => createRoleMap() as Role;

export const createErrorDto = (): CreateRoleDto => {
  return {
    label: 'ERROR',
    subscriptionTypeId: 'bad',
  };
};

export const updateRoleDto = (): UpdateRoleDto => {
  return {
    label: 'Subscriber',
  };
};

export const updateRoleMap = (): UpdateRoleMap => {
  return {
    label: updateRoleDto().label,
  };
};

export const updateRoleRole = (): Role => updateRoleMap() as Role;

export const updateErrorDto = (): UpdateRoleDto => {
  return {
    label: 'ERROR',
  };
};

export const roleExisting = (): Role => {
  return {
    label: 'Subscriber',
    permissions: [],
    subscriptionTypeId: '123abc',
  };
};

export const roleResponse = (): RoleExternalDto => {
  return {
    label: roleExisting().label,
  };
};
