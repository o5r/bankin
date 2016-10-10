
class Items {
  constructor(api) {
    this._api = api;
  }

  connect(bankId, redirectUrl) {
    return this._api.items.connect(bankId, redirectUrl);
  }

  connectUrl(bankId, redirectUrl) {
    return this._api.items.connectUrl(bankId, redirectUrl);
  }
}

export default Items;
