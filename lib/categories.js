/* @flow */
import Client from './client';
import type {
  InputPagination,
  PromisedPagination
} from './pagination';
import Pagination from './pagination';

/**
 * Categories Class
 *
 * @param  {Client}  client
 *
 * @see https://apidocs.bankin.com/v2/docs/category-resource
 */
class Categories {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * List categories
   *
   * @param  {Object}  [$0={}]
   * @param  {string}  [$0.before]    Cursor pointing to the end of the desired set.
   * @param  {string}  [$0.after]     Cursor pointing to the start of the desired set.
   * @param  {number}  [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
   *
   * @see https://apidocs.bankin.com/v2/docs/list-categories
   */
  list({ before, after, limit = 50 }: InputPagination = {}, lang: string = 'en'): PromisedPagination<Object> {
    return this._client.get('/categories', {
      before,
      after,
      limit
    }, {
      'Accept-Language': lang
    })
      .then(categories => new Pagination(this._client, categories));
  }

  /**
   * Get a single category
   *
   * @param  {string} categoryId  Category ID
   * @param  {string} [lang=en]   Specified language. Only 'fr' or 'en' is supported
   *
   * @return {Promise<Object>}
   */
  get(categoryId: number, lang: string = 'en'): Promise<Object> {
    return this._client.get(`/categories/${categoryId}`, {}, {
      'Accept-Language': lang
    });
  }
}

export default Categories;
