import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { Route } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  actions: {
    login() {
      let email = this.controller.get('email');
      let password = this.controller.get('password');
      this.get('session').authenticate('authenticator:devise', email, password).catch((reason) => {
        console.log('here');
        this.controller.set('error', 'Invalid email or password');
        //this.controller.set('error', reason.error || reason);
      });
    }
  }
});
