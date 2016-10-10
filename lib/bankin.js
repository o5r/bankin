import Users from './users';
import Banks from './banks';
import Items from './items';
import Api from './api';

class Bankin {
  constructor(clientId, clientSecret, version = '2016-01-18') {
    this._api = new Api(clientId, clientSecret, version);

    this.users = new Users(this._api);
    this.banks = new Banks(this._api);
    this.items = new Items(this._api);
  }
}

export default Bankin;
