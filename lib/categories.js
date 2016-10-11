import Pagination from './pagination';

export default class Categories {
  constructor(client) {
    this._client = client;
  }

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

  get(categoryId, lang = 'en') {
    return this._client.get(`/categories/${categoryId}`, {}, {
      'Accept-Language': lang
    });
  }
}
