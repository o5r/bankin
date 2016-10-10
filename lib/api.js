import url from 'url';

import request from 'request-promise';

request.debug = true

class Api {
  constructor(clientId, clientSecret, version) {
    const that = this;

    this.endpoint = 'https://sync.bankin.com/v2';

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.version = version;

    this.users = {
      create(body) {
        return that._post('/users', body);
      },

      auth(body) {
        return that._post('/authenticate', body);
      },

      logout(userId) {
        return that._post(`/${userId}`);
      },

      list(qs) {
        return that._get('/users', qs)
      },

      edit(userId, qs) {
        return that._put(`/users/${userId}`, qs)
      },

      delete(userId) {
        return that._delete(`/users/${userId}`)
      },

      deleteAll() {
        return that._delete(`/users`)
      }
    };

    this.banks = {
      list(qs) {
        return that._get('/banks', qs);
      },

      get(bankId) {
        return that._get(`/banks/${bankId}`);
      }
    };

    this.items = {
      connect(query) {
        return request.get({
          uri: `${that.endpoint}/items/connect`,
          qs: Object.assign({}, {
            client_id: that.clientId
          }, query)
        });
      },

      connectUrl(query) {
        return Promise.resolve(url.format({
          pathname: `${that.endpoint}/items/connect`,
          query: Object.assign({}, {
            client_id: this.clientId
          }, query)
        }));
      }
    }
  }

  _post(uri, qs) {
    return request.post({
      uri: `${this.endpoint}${uri}`,
      qs: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, qs),
      headers: {
        'Bankin-Version': this.version
      },
      json: true
    });
  }

  _get(uri, qs) {
    return request.get({
      uri: `${this.endpoint}${uri}`,
      qs: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, qs),
      headers: {
        'Bankin-Version': this.version
      },
      json: true
    });
  }

  _put(uri, qs) {
    return request.put({
      uri: `${this.endpoint}${uri}`,
      qs: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, qs),
      headers: {
        'Bankin-Version': this.version
      },
      json: true
    });
  }

  _delete(uri) {
    return request.delete({
      uri: `${this.endpoint}${uri}`,
      headers: {
        'Bankin-Version': this.version
      },
      json: true
    });
  }
}

export default Api;
