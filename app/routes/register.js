import Ember from 'ember';
import RSVP from 'rsvp';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { Route } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  selectedIssues: [],
  selectedOrgs: [],

  setupController(controller, model) {
    controller.set('model', model);
    controller.set('views', ['user', 'issues', 'orgs']);
    controller.set('view', 'user');
    controller.set('user', {});
  },

  model() {
    return RSVP.hash({
      issues: this.get('store').findAll('issue'),
      orgs: this.get('store').findAll('org')
    });
  },

  actions: {
    nextView() {
      let views = this.controller.get('views');
      let view = this.controller.get('view');
      view = views[views.indexOf(view) + 1];
      this.controller.set('view', view);
    },
    prevView() {
      let views = this.controller.get('views');
      let view = this.controller.get('view');
      view = views[views.indexOf(view) - 1];
      this.controller.set('view', view);
    },
    selectItem(item) {
      if (!item.get('isSelected')) {
        item.set('isSelected', true);
      } else {
        item.set('isSelected', false);
      }
    },
    submit() {
      let user = this.controller.get('user');
      user.issues = this.controller.get('model.issues').filterBy('isSelected', true);
      user.orgs = this.controller.get('model.orgs').filterBy('isSelected', true);
      this.store.createRecord('user', user).save().then(() => {
        this.get('session').authenticate('authenticator:devise', user.email, user.password).catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        });
      });
    }
  }
});
