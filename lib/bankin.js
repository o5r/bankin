/* @flow */
import Client from './client';
import Users from './users';
import Banks from './banks';
import Categories from './categories';

/**
 * Bankin Web Services
 * Create a BWS instance
 *
 * @param  {string}  clientId      Client ID credential
 * @param  {string}  clientSecret  Client Secret
 * @param  {string}  [version]     Version number. Format 'YYYY-MM-DD' see https://apidocs.bankin.com/v2/docs/versionning
 *
 * @see https://apidocs.bankin.com/v2/docs
 */
class Bankin {
  _client: Client;
  users: Users;
  banks: Banks;
  categories: Categories;

  constructor(clientId: string, clientSecret: string, version: string = '2016-01-18') {
    this._client = new Client(clientId, clientSecret, version);

    this.users = new Users(this._client);
    this.banks = new Banks(this._client);
    this.categories = new Categories(this._client);
  }
}

export default Bankin;
