import Ember from 'ember';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import ENV from 'undivided-ui/config/environment';
const { RSVP: { Promise }, run, isEmpty } = Ember;

export default DeviseAuthenticator.extend({
  serverTokenEndpoint: `${ENV.apihost}/api/auth/sign_in`,

  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
          !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      const useResponse = this.get('rejectWithResponse');
      const data = { "email": identification, password };

      this.makeRequest(data).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            let result = {
              accessToken: response.headers.map['access-token'],
              expiry: response.headers.map['expiry'],
              tokenType: response.headers.map['token-type'],
              uid: response.headers.map['uid'],
              client: response.headers.map['client'],
              user: json['data']
            };
            run(null, resolve, result);
          });
        } else {
          if (useResponse) {
            run(null, reject, response);
          } else {
            response.json().then((json) => run(null, reject, json));
          }
        }
      }).catch((error) => run(null, reject, error));
    });
  }
});
