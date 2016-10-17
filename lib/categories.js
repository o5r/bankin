/**
 * @module categories
 */
import Pagination from './pagination';

/**
 * Categories Class
 *
 * @private
 * @see https://apidocs.bankin.com/v2/docs/category-resource
 */
class Categories {
  /**
   * @param  {Client}  client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * List categories
   *
   * @param  {String}  [options.before]    Cursor pointing to the end of the desired set.
   * @param  {String}  [options.after]     Cursor pointing to the start of the desired set.
   * @param  {Number}  [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
   * @return {Promise<Pagination<Object>>}
   * @see https://apidocs.bankin.com/v2/docs/list-categories
   */
  list({before, after, limit = 50} = {}, lang = 'en') {
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
   * @param  {String} categoryId  Category ID
   * @param  {String} [lang=en]   Specified language. Only 'fr' or 'en' is supported
   * @return {Promise<Object>}
   */
  get(categoryId, lang = 'en') {
    return this._client.get(`/categories/${categoryId}`, {}, {
      'Accept-Language': lang
    });
  }
}

export default Categories;
