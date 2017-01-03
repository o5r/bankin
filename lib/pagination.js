/**
 * @module pagination
 */
import url from 'url';
import qs from 'querystring';

/**
 * Pagination Class
 *
 * @private
 */
class Pagination {
  /**
   * @param  {Client} client
   * @param  {Object} doc            Documents to paginate
   * @param  {String} [access_token]
   */
  constructor(client, doc, access_token) {
    this._client = client;
    this.auth = access_token;

    Object.assign(this, doc);
  }

  /**
   * Return next documents's page
   *
   * @return {Promise<Pagination<doc>>}
   */
  next() {
    if (!this.pagination.next_uri) {
      throw new Error('NO_NEXT_URI');
    }

    const nextUrl = url.parse(this.pagination.next_uri);
    const queryParams = qs.parse(nextUrl.query);
    const headers = {};

    if (this.auth) {
      headers.Authorization = `Bearer ${this.auth}`;
    }

    return this._client.get(nextUrl.pathname.replace(/^\/v2/, ''), queryParams, headers)
      .then(doc => new Pagination(this._client, doc, this.auth));
  }

  /**
   * Return previous documents's page
   *
   * @return {Promise<Pagination<doc>>}
   */
  previous() {
    if (!this.pagination.previous_uri) {
      throw new Error('NO_PREVIOUS_URI');
    }

    const previousUrl = url.parse(this.pagination.previous_uri);
    const queryParams = qs.parse(previousUrl.query);
    const headers = {};

    if (this.auth) {
      headers.Authorization = `Bearer ${this.auth}`;
    }

    return this._client.get(previousUrl.pathname.replace(/^\/v2/, ''), queryParams, headers)
      .then(doc => new Pagination(this._client, doc, this.auth));
  }
}

export default Pagination;
