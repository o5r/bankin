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
   * @param  {Object} doc     Documents to paginate
   */
  constructor(client, doc) {
    this._client = client;

    Object.assign(this, doc);
  }

  /**
   * Return next documents's page
   *
   * @return {Promise<Pagination<doc>>}
   */
  next() {
    const nextUrl = url.parse(this.pagination.next_uri);
    const queryParams = qs.parse(nextUrl.query);

    return this._client.get(nextUrl.pathname.replace(/^\/v2/, ''), queryParams)
      .then(doc => {
        return new Pagination(this._client, doc)
      });
  }

  /**
   * Return previous documents's page
   *
   * @return {Promise<Pagination<doc>>}
   */
  previous() {
    const previousUrl = url.parse(this.pagination.previous_uri);
    const queryParams = qs.parse(previousUrl.query);

    return this._client.get(previousUrl.pathname.replace(/^\/v2/, ''), queryParams)
      .then(doc => {
        return new Pagination(this._client, doc)
      });
  }
}

export default Pagination;
