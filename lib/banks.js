/* @flow */
import Client from './client';
import type {
  InputPagination,
  PromisedPagination
} from './pagination';
import Pagination from './pagination';

/**
 * Banks class
 *
 * @param  {Client}  client
 *
 * @see https://apidocs.bankin.com/v2/docs/bank-resource
 */
class Banks {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List banks
   *
   * @param  {Object}  [$0]
   * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
   * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
   * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
   *
   * @see https://apidocs.bankin.com/v2/docs/list-banks
   */
  list({ before, after, limit = 50 }: InputPagination = {}): PromisedPagination<Object> {
    return this._client.get('/banks', { before, after, limit })
      .then(banks => new Pagination(this._client, banks));
  }

  /**
   * Get a single bank
   *
   * @param  {string} bankId  Bank's ID
   *
   * @return {Promise<Object>}
   *
   * @see https://apidocs.bankin.com/v2/docs/show-a-bank
   */
  get(bankId: string): Promise<Object> {
    return this._client.get(`/banks/${bankId}`);
  }
}

export default Banks;
