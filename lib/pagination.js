export default class Pagination {
  constructor(client, doc) {
    this._client = client;

    Object.assign(this, doc);
  }

  next() {
    return this._client.get(this.pagination.next_uri.replace(/^\/v2/, ''))
      .then(doc => {
        return new Pagination(this._client, doc)
      });
  }

  previous() {
    return this._client.get(this.pagination.previous_uri.replace(/^\/v2/, ''));
  }
}
