import Client from './client';
import Users from './users';
import Banks from './banks';
import Categories from './categories';

export default class Bankin {
  constructor(clientId, clientSecret, version = '2016-01-18') {
    this._client = new Client(clientId, clientSecret, version);

    this.users = new Users(this._client);
    this.banks = new Banks(this._client);
    this.categories = new Categories(this._client);
  }
}
