import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const { inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service('session'),
  currentUser: service('current-user'),

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('user', this._loadCurrentUser());
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('currentUser').load();
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
