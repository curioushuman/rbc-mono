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
    label: 'Member',
  };
};

export const updateRoleMap = (): UpdateRoleMap => {
  return {
    label: updateRoleDto().label,
  };
};

export const updateRoleRole = (): Role => {
  return {
    label: updateRoleDto().label,
    permissions: [],
    subscriptionTypeId: roleExisting().subscriptionTypeId,
  };
};

export const updateErrorDto = (): UpdateRoleDto => {
  return {
    label: 'ERROR',
  };
};

export const roleExisting = (): Role => {
  return {
    label: createRoleDto().label,
    permissions: [],
    subscriptionTypeId: createRoleDto().subscriptionTypeId,
  };
};

export const roleResponse = (): RoleExternalDto => {
  return {
    label: roleExisting().label,
  };
};
