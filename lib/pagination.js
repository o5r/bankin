/**
 * @module pagination
 */

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
    return this._client.get(this.pagination.next_uri.replace(/^\/v2/, ''))
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
    return this._client.get(this.pagination.previous_uri.replace(/^\/v2/, ''));
  }
}

export default Pagination;
