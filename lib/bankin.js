/**
 * @module bankin
 */
import Client from './client';
import Users from './users';
import Banks from './banks';
import Categories from './categories';

/**
 * Bankin Web Services
 *
 * @see https://apidocs.bankin.com/v2/docs
 */
class Bankin {
  /**
   * Create a BWS instance
   *
   * @param  {String}  clientId      Client ID credential
   * @param  {String}  clientSecret  Client Secret
   * @param  {String}  [version]     Version number. Format 'YYYY-MM-DD' see https://apidocs.bankin.com/v2/docs/versionning
   */
  constructor(clientId, clientSecret, version = '2016-01-18') {
    this._client = new Client(clientId, clientSecret, version);

    this.users = new Users(this._client);
    this.banks = new Banks(this._client);
    this.categories = new Categories(this._client);
  }
}

export default Bankin;
