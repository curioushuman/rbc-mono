import { Tier } from '../../schema/tier.schema';

export const tierNew = (): Tier => {
  return {
    label: 'Goldmember',
  };
};

export const tierExisting = (): Tier => {
  return tierNew();
};

export const tierError = (): Tier => {
  return {
    label: 'Aggggh no',
  };
};