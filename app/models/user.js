import DS from 'ember-data';
const { attr, hasMany, Model } = DS;

export default Model.extend({
  first: attr('string'),
  last: attr('string'),
  email: attr('string'),
  password: attr('string'),
  address: attr('string'),
  issues: hasMany('issue'),
  orgs: hasMany('org')
});
