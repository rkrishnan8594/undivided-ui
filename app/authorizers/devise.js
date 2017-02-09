import Ember from 'ember';
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';

export default DeviseAuthorizer.extend({
  authorize(data, block) {
    const accessToken = data.accessToken[0];
    const expiry = data.expiry[0];
    const tokenType = data.tokenType[0];
    const uid = data.uid[0];
    const client = data.client[0];
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      block('Authorization', `Bearer ${accessToken}`);
      block('access-token', accessToken);
      block('expiry', expiry);
      block('token-type', tokenType);
      block('uid', uid);
      block('client', client);
    }
  }
});
