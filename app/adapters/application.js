import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: 'http://localhost:3000',
  namespace: 'api',
  authorizer: 'authorizer:devise',
  handleResponse(status, headers) {
    if(headers['client']) {
      let newSession = this.get('session.data');
      newSession['authenticated']['accessToken'][0] = headers['access-token'];
      newSession['authenticated']['expiry'][0] = headers['expiry'];
      newSession['authenticated']['tokenType'][0] = headers['token-type'];
      newSession['authenticated']['uid'][0] = headers['uid'];
      newSession['authenticated']['client'][0] = headers['client'];
      this.get('session.store').persist(newSession);
    } else if (status == 401) {
      this.get('session').invalidate();
    }
    return this._super(...arguments);
  }
});
