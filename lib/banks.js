import Pagination from './pagination';

class Banks {
  constructor(api) {
    this._api = api;
  }

  list({before = undefined, after = undefined, limit = 50}) {
    return this._api.banks.list({before, after, limit})
      .then(bank => {
        return new Pagination(this._api, bank)
      });
  }

  get(bankId) {
    return this._api.banks.get(bankId);
  }
}

export default Banks;
