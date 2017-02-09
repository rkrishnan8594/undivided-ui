import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { Route, $ } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  activate() {
    this._super();
    $('body').addClass('landing-photo');
  },
  deactivate: function() {
    $('body').removeClass('landing-photo');
    $('body').addClass('bg-gray');
  },
});
