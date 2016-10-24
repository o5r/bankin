/**
 * @module user
 */
import url from 'url';

import Pagination from './pagination';

/**
 * User class
 */
class User {
  /**
   * @param  {Client} client
   * @param  {Object} user   User object returned by Auth
   */
  constructor(client, user) {
    this._client = client;

    /**
     * @namespace module:user~User#accounts
     */
    this.accounts = {
      /**
       * List accounts
       *
       * @memberof module:user~User#accounts
       * @instance
       *
       * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @return {Promise<Pagination<accounts>>}
       * @see  https://apidocs.bankin.com/v2/docs/list-accounts
       */
      list: ({before, after, limit = 50} = {}) =>  this._client.get('/accounts', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get a single account
       *
       * @memberof module:user~User#accounts
       * @instance
       *
       * @param  {String} id  Account id
       * @see  https://apidocs.bankin.com/v2/docs/show-accounts
       */
      get: (id) => this._client.get(`/accounts/${id}`, {}, {Authorization: `Bearer ${this.access_token}`}),
    };

    /**
     * @namespace module:user~User#items
     */
    this.items = {
      /**
       * Get connect item url
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} bank_id
       * @param  {String} [redirect_url] Optional redirect URL that temporarily overrides the application's redirect URL. Only usable for sandbox applications
       * @see  https://apidocs.bankin.com/v2/docs/connect-an-item
       */
      connectUrl: (bank_id, redirect_url) => Promise.resolve(url.format({
        pathname: `${this._client.endpoint}/items/connect`,
        query: {
          client_id: this._client.clientId,
          access_token: this.access_token,
          bank_id,
          redirect_url
        }
      })),

      /**
       * List items
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @return {Promise<Pagination<items>>}                [description]
       * @see  https://apidocs.bankin.com/v2/docs/list-items
       */
      list: ({before, after, limit = 50} = {}) => this._client.get('/items', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(items => new Pagination(this._client, items)),

      /**
       * Get a single item
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/get-a-single-item
       */
      get: (id) => this._client.get(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get edit item url
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} bank_id
       * @param  {String} [redirect_url] Optional redirect URL that temporarily overrides the application's redirect URL. Only usable for sandbox applications
       * @see  https://apidocs.bankin.com/v2/docs/edit-an-item-1
       */
      editUrl: (id, redirect_url) => Promise.resolve(url.format({
        pathname: `${this._client.endpoint}/items/${id}/edit`,
        query: {
          client_id: this._client.clientId,
          access_token: this.access_token,
          redirect_url
        }
      })),

      /**
       * Refresh an item
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/refresh-an-item
       */
      refresh: (id) => this._client.post(`/items/${id}/refresh`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get an item's refresh status
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/get-an-items-status
       */
      refreshStatus: (id) => this._client.get(`/items/${id}/refresh/status`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Send item's MFA
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} id
       * @param  {String} otp  User's One Time Password (OTP) for the item
       * @see  https://apidocs.bankin.com/v2/docs/send-items-mfa
       */
      mfa: (id, otp) => this._client.post(`/items/${id}/mfa`, {otp}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Delete an item
       *
       * @memberof module:user~User#items
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/delete-an-item
       */
      delete: (id) => this._client.delete(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    /**
     * @namespace module:user~User#transactions
     */
    this.transactions = {
      /**
       * List transactions
       *
       * @memberof module:user~User#transactions
       * @instance
       *
       * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @param  {String}  [options.since]     Limit to transactions created after the specified date. Format YYYY-MM-DD
       * @param  {String}  [options.until]     Limit to transactions created before the specified date. Format YYYY-MM-DD
       * @return {Promise<Pagination<transactions>>}
       * @see  https://apidocs.bankin.com/v2/docs/list-transactions
       */
      list: ({before, after, limit = 50, since, until} = {}) => this._client.get('/transactions', {
        before,
        after,
        limit,
        since,
        until
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions)),

      /**
       * List updated transactions
       *
       * @memberof module:user~User#transactions
       * @instance
       *
       * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @param  {String}  [options.since]     Limit to transactions created after the specified date. Format YYYY-MM-DD
       * @return {Promise<Pagination<transactions>>}
       * @see  https://apidocs.bankin.com/v2/docs/list-transactions-s
       */
      listUpdated: ({before, after, limit = 50, since = +new Date()} = {}) => this._client.get('/transactions/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions)),

      /**
       * Get a single transaction
       *
       * @memberof module:user~User#transactions
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/show-a-transaction
       */
      get: (id) => this._client.get(`/transactions/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    /**
     * @namespace module:user~User#stocks
     */
    this.stocks = {
      /**
       * List stocks
       *
       * @memberof module:user~User#stocks
       * @instance
       *
       * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @return {Promise<Pagination<stocks>>}
       * @see  https://apidocs.bankin.com/v2/docs/list-stocks
       */
      list: ({before, after, limit = 50} = {}) => this._client.get('/stocks', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks)),

      /**
       * List updated stocks
       *
       * @memberof module:user~User#stocks
       * @instance
       *
       * @param  {String}  [options.before]     Cursor pointing to the end of the desired set.
       * @param  {String}  [options.after]      Cursor pointing to the start of the desired set.
       * @param  {Number}  [options.limit=50]   Number of records to return. Accepted values: 1 - 500.
       * @param  {String}  [options.since=now]  Timestamp representing the last moment transactions were in sync.
       * @return {Promise<Pagination<transactions>>}
       * @see  https://apidocs.bankin.com/v2/docs/list-updated-stocks
       */
      listUpdated: ({before, after, limit = 50, since = +new Date()} = {}) => this._client.get('/stocks/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks)),

      /**
       * Get a single stock
       *
       * @memberof module:user~User#stocks
       * @instance
       *
       * @param  {String} id
       * @see  https://apidocs.bankin.com/v2/docs/get-a-single-stock
       */
      get: (id) => this._client.get(`/stocks/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    Object.assign(this, user);
  }

  /**
   * Log out a user
   *
   * @see  https://apidocs.bankin.com/v2/docs/log-out-a-user
   */
  logout() {
    return this._client.post(`/${this.user.uuid}`);
  }

  /**
   * Edit user credentials
   *
   * @param  {String} new_password  The new user password.
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  edit(new_password) {
    return this._client.put(`/users/${this.user.uuid}/password`, {current_password: this.password, new_password});
  }

  /**
   * Delete a user
   *
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  delete() {
    return this._client.delete(`/users/${this.user.uuid}`, {password: this.password});
  }
}

export default User
