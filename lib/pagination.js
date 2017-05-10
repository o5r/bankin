/* @flow */
import url from 'url';
import qs from 'querystring';

import Client from './client';

export type InputPagination = {
  before?: string,
  after?: string,
  limit: number
};

export type PromisedPagination<T> = Promise<Pagination<T>>;

/**
 * Pagination Class
 *
 * @param  {Client} client
 * @param  {Object} doc            Documents to paginate
 * @param  {string} [access_token]
 *
 * @private
 */
class Pagination {
  _client: Client;
  auth: string;

  // exported from doc
  pagination: Object;

  constructor(client: Client, doc: Object, access_token?: string) {
    this._client = client;

    if (access_token) {
      this.auth = access_token;
    }

    Object.assign(this, doc);
  }

  /**
   * Return next documents's page
   */
  next(): Promise<Pagination> {
    if (!this.pagination.next_uri) {
      throw new Error('NO_NEXT_URI');
    }

    const nextUrl = url.parse(this.pagination.next_uri);

    if (!nextUrl || !nextUrl.query) {
      throw new Error('INVALID_NEXT_URI');
    }

    const queryParams = qs.parse(nextUrl.query);

    if (!nextUrl.pathname) {
      throw new Error('INVALID_NEXT_URI');
    }

    const headers = {};

    if (this.auth) {
      headers.Authorization = `Bearer ${this.auth}`;
    }

    return this._client.get(nextUrl.pathname.replace(/^\/v2/, ''), queryParams, headers)
      .then(doc => new Pagination(this._client, doc, this.auth));
  }

  /**
   * Return previous documents's page
   */
  previous(): Promise<Pagination> {
    if (!this.pagination.previous_uri) {
      throw new Error('NO_PREVIOUS_URI');
    }

    const previousUrl = url.parse(this.pagination.previous_uri);

    if (!previousUrl || !previousUrl.query) {
      throw new Error('INVALID_NEXT_URI');
    }

    const queryParams = qs.parse(previousUrl.query);

    if (!previousUrl.pathname) {
      throw new Error('INVALID_NEXT_URI');
    }

    const headers = {};

    if (this.auth) {
      headers.Authorization = `Bearer ${this.auth}`;
    }

    return this._client.get(previousUrl.pathname.replace(/^\/v2/, ''), queryParams, headers)
      .then(doc => new Pagination(this._client, doc, this.auth));
  }
}

export default Pagination;
