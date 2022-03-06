/**
 * A Resource is a thing a member/admin can engage with
 * e.g. course, article, (other) member, etc
 * * Consider the perspective i.e. end user, developer, or the business
 * - Essentially these should align, so consider both (where you can, without breaking your brain)
 *
 * TODO
 * - Allow resources to be grouped by zones
 *   - And make a stronger relationship between zones and resources
 * - Obviously add the rest
 */
export enum Resource {
  all = 'all',
  course = 'course',
}
