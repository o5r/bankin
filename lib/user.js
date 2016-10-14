import url from 'url';

import Pagination from './pagination';

export default class User {
  constructor(client, user) {
    this._client = client;

    this.accounts = {
      list: ({before, after, limit = 50} = {}) =>  this._client.get('/accounts', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
    };

    this.items = {
      connectUrl: (bank_id, redirect_url) => Promise.resolve(url.format({
        pathname: `${this._client.endpoint}/items/connect`,
        query: {
          client_id: this._client.clientId,
          access_token: this.access_token,
          bank_id,
          redirect_url
        }
      })),

      list: ({before, after, limit = 50} = {}) => this._client.get('/items', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(list => new Pagination(this._client, list)),

      get: (id) => this._client.get(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`}),

      editUrl: (id, redirect_url) => Promise.resolve(url.format({
        pathname: `${this._client.endpoint}/items/${id}/edit`,
        query: {
          client_id: this.clientId,
          access_token: this.access_token,
          redirect_url
        }
      })),

      refresh: (id) => this._client.post(`/items/${id}/refresh`, {}, {Authorization: `Bearer ${this.access_token}`}),

      refreshStatus: (id) => this._client.get(`/items/${id}/refresh/status`, {}, {Authorization: `Bearer ${this.access_token}`}),

      mfa: (id, otp) => this._client.post(`/items/${id}/mfa`, {otp}, {Authorization: `Bearer ${this.access_token}`}),

      delete: (id) => this._client.delete(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    this.transactions = {
      list: ({before, after, limit = 50, since, until} = {}) => this._client.get('/transactions', {
        before,
        after,
        limit,
        since,
        until
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions)),

      listUpdated: ({before, after, limit = 50, since = +new Date()} = {}) => this._client.get('/transactions/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions)),

      get: (id) => this._client.get(`/transactions/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    this.stocks = {
      list: ({before, after, limit = 50} = {}) => this._client.get('/stocks', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks)),

      // @todo WTF doc
      listUpdated: ({before, after, limit = 50, since = +new Date()} = {}) => this._client.get('/stocks/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks)),

      get: (id) => this._client.get(`/stocks/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    Object.assign(this, user);
  }

  logout() {
    return this._client.post(`/${this.user.uuid}`);
  }

  edit(new_password) {
    return this._client.put(`/users/${this.user.uuid}/password`, {current_password: this.password, new_password});
  }

  delete() {
    return this._client.delete(`/users/${this.user.uuid}`, {password: this.password});
  }
}
