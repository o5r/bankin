/* @flow */
import url from 'url';

import Client from './client';
import type {
  InputPagination,
  PromisedPagination
} from './pagination';
import Pagination from './pagination';

/**
 * User class
 *
 * @param  {Client} client
 * @param  {Object} user   User object returned by Auth
 */
class User {
  _client: Client;
  accounts: Object;
  items: Object;
  transactions: Object;
  stocks: Object;

  // exported from user
  access_token: string;
  password: string;
  user: {
    uuid: string
  };

  constructor(client: Client, user: Object) {
    this._client = client;

    /**
     * @name accounts
     */
    this.accounts = {
      /**
       * List accounts
       *
       * @param  {Object}  [$0={}]
       * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after ]    Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
       *
       * @memberof accounts
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-accounts
       */
      list: ({ before, after, limit = 50 }: InputPagination = {}): PromisedPagination<Object> =>  this._client.get('/accounts', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get a single account
       *
       * @param  {string} id  Account id
       *
       * @memberof accounts
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/show-accounts
       */
      get: (id: string): Promise<Object> => this._client.get(`/accounts/${id}`, {}, {Authorization: `Bearer ${this.access_token}`}),
    };

    /**
     * @name items
     */
    this.items = {
      /**
       * Get connect item url
       *
       * @param  {string} bank_id
       * @param  {string} [redirect_url] Optional redirect URL that temporarily overrides the application's redirect URL. Only usable for sandbox applications
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/connect-an-item
       */
      connectUrl: (bank_id: number, redirect_url?: string): Promise<string> => {
        const query: {
          client_id: string,
          access_token: string,
          bank_id: number,
          redirect_url?: string
        } = {
          client_id: this._client.clientId,
          access_token: this.access_token,
          bank_id
        };

        if (redirect_url) {
          query.redirect_url = redirect_url;
        }

        return Promise.resolve(url.format({
          query,
          pathname: `${this._client.endpoint}/items/connect`
        }));
      },

      /**
       * List items
       *
       * @param  {Object}  [$0={}]
       * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-items
       */
      list: ({ before, after, limit = 50 }: InputPagination = {}): PromisedPagination<Object> => this._client.get('/items', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(items => new Pagination(this._client, items, this.access_token)),

      /**
       * Get a single item
       *
       * @param  {string} id
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/get-a-single-item
       */
      get: (id: string): Promise<Object> => this._client.get(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get edit item url
       *
       * @param  {string} id
       * @param  {string} [redirect_url] Redirect URL that temporarily overrides the application's redirect URL. Only usable for sandbox applications
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/edit-an-item-1
       */
      editUrl: (id: string, redirect_url?: string): Promise<string> => {
        const query: {
          client_id: string,
          access_token: string,
          id: string,
          redirect_url?: string
        } = {
          client_id: this._client.clientId,
          access_token: this.access_token,
          id
        };

        if (redirect_url) {
          query.redirect_url = redirect_url;
        }

        return Promise.resolve(url.format({
          query,
          pathname: `${this._client.endpoint}/items/${id}/edit`
        }));
      },

      /**
       * Refresh an item
       *
       * @param  {string} id
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/refresh-an-item
       */
      refresh: (id: string): Promise<Object> => this._client.post(`/items/${id}/refresh`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Get an item's refresh status
       *
       * @param  {string} id
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/get-an-items-status
       */
      refreshStatus: (id: string): Promise<Object> => this._client.get(`/items/${id}/refresh/status`, {}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Send item's MFA
       *
       * @param  {string} id
       * @param  {string} otp  User's One Time Password (OTP) for the item
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/send-items-mfa
       */
      mfa: (id: string, otp: string): Promise<Object> => this._client.post(`/items/${id}/mfa`, {otp}, {Authorization: `Bearer ${this.access_token}`}),

      /**
       * Delete an item
       *
       * @param  {string} id
       *
       * @memberof items
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/delete-an-item
       */
      delete: (id: string): Promise<Object> => this._client.delete(`/items/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    /**
     * @name transactions
     */
    this.transactions = {
      /**
       * List transactions
       *
       * @param  {Object}  [$0={}]
       * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @param  {string}  [$0.since]     Limit to transactions created after the specified date. Format YYYY-MM-DD
       * @param  {string}  [$0.until]     Limit to transactions created before the specified date. Format YYYY-MM-DD
       *
       * @memberof transactions
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-transactions
       */
      list: ({ before, after, limit = 50, since, until } = {}): PromisedPagination<Object> => this._client.get('/transactions', {
        before,
        after,
        limit,
        since,
        until
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions, this.access_token)),

      /**
       * List updated transactions
       *
       * @param  {Object}  [$0={}]
       * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
       * @param  {string}  [$0.since]     Limit to transactions created after the specified date. Format YYYY-MM-DD
       *
       * @memberof transactions
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-transactions-s
       */
      listUpdated: ({ before, after, limit = 50, since = +new Date() } = {}): PromisedPagination<Object> => this._client.get('/transactions/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(transactions => new Pagination(this._client, transactions, this.access_token)),

      /**
       * Get a single transaction
       *
       * @param  {string} id
       *
       * @memberof transactions
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/show-a-transaction
       */
      get: (id: string): Promise<Object> => this._client.get(`/transactions/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    /**
     * @name stocks
     */
    this.stocks = {
      /**
       * List stocks
       *
       * @param  {Object}  [$0={}]
       * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
       *
       * @memberof stocks
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-stocks
       */
      list: ({ before, after, limit = 50 }: InputPagination = {}): PromisedPagination<Object> => this._client.get('/stocks', {
        before,
        after,
        limit
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks, this.access_token)),

      /**
       * List updated stocks
       *
       * @param  {Object}  [$0={}]     Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.before]     Cursor pointing to the end of the desired set.
       * @param  {string}  [$0.after]      Cursor pointing to the start of the desired set.
       * @param  {number}  [$0.limit=50]   Number of records to return. Accepted values: 1 - 500.
       * @param  {string}  [$0.since=now]  Timestamp representing the last moment transactions were in sync.
       *
       * @memberof stocks
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/list-updated-stocks
       */
      listUpdated: ({ before, after, limit = 50, since = +new Date() } = {}): PromisedPagination<Object> => this._client.get('/stocks/updated', {
        before,
        after,
        limit,
        since
      }, {Authorization: `Bearer ${this.access_token}`})
      .then(stocks => new Pagination(this._client, stocks, this.access_token)),

      /**
       * Get a single stock
       *
       * @param  {string} id
       *
       * @memberof stocks
       * @instance
       *
       * @see  https://apidocs.bankin.com/v2/docs/get-a-single-stock
       */
      get: (id: string): Promise<Object> => this._client.get(`/stocks/${id}`, {}, {Authorization: `Bearer ${this.access_token}`})
    };

    Object.assign(this, user);
  }

  /**
   * Log out a user
   *
   * @see  https://apidocs.bankin.com/v2/docs/log-out-a-user
   */
  logout(): Promise<Object> {
    return this._client.post(`/${this.user.uuid}`);
  }

  /**
   * Edit user credentials
   *
   * @param  {string} new_password  The new user password.
   *
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  edit(new_password: string): Promise<Object> {
    return this._client.put(`/users/${this.user.uuid}/password`, {current_password: this.password, new_password});
  }

  /**
   * Delete a user
   *
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  delete(): Promise<Object> {
    return this._client.delete(`/users/${this.user.uuid}`, {password: this.password});
  }
}

export default User
