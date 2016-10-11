import Pagination from './pagination';

export default class Banks {
  constructor(client) {
    this._client = client;
  }

  list({before, after, limit = 50} = {}) {
    return this._client.get('/banks', {before, after, limit})
      .then(bank => new Pagination(this._client, bank));
  }

  get(bankId) {
    return this._client.get(`/banks/${bankId}`);
  }
}
