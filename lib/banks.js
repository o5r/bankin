/**
 * @module bank
 */
import Pagination from './pagination';

/**
 * Banks class
 *
 * @private
 * @see https://apidocs.bankin.com/v2/docs/bank-resource
 */
class Banks {
  /**
   * @param  {Client}  client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * List banks
   *
   * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
   * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
   * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
   * @return {Promise<Pagination<Banks>>}
   * @see https://apidocs.bankin.com/v2/docs/list-banks
   */
  list({before, after, limit = 50} = {}) {
    return this._client.get('/banks', {before, after, limit})
      .then(banks => new Pagination(this._client, banks));
  }

  /**
   * Get a single bank
   *
   * @param  {String} bankId  Bank's ID
   * @return {Promise<Object>}
   * @see https://apidocs.bankin.com/v2/docs/show-a-bank
   */
  get(bankId) {
    return this._client.get(`/banks/${bankId}`);
  }
}

export default Banks;
