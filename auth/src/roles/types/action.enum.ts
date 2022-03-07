/**
 * An action is (as it sounds) something a user can do, to a resource, in a zone
 * e.g. forum, courses, knowledge base
 * * Consider the perspective i.e. end user, developer, or the business
 * - Essentially these should align, so consider both (where you can, without breaking your brain)
 */
export enum Action {
  All = 'all',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
