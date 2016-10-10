class Pagination {
  constructor(api, doc) {
    this._api = api;

    Object.assign(this, doc);
  }

  next() {
    return this._api._get(this.pagination.next_uri.replace(/^\/v2/, ''))
      .then(doc => {
        return new Pagination(this._api, doc)
      });
  }

  previous() {
    return this._api._get(this.pagination.previous_uri.replace(/^\/v2/, ''));
  }
}

export default Pagination;
