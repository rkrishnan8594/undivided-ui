import Ember from 'ember';
const { inject: { service }, Service } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    return this.get('session.data.authenticated.user');
  }
});
