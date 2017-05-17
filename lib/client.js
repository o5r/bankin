/* @flow */
import got from 'got';

/**
 *
 * Remove undefined attributes
 *
 * @param  {Object} obj
 *
 * @private
 */
function removeUndefined(obj): Object {
  Object.keys(obj).forEach(function (key) {
    if(typeof obj[key] === 'undefined'){
      delete obj[key];
    }
  });

  return obj;
}

/**
 *
 * Client Class
 *
 * Make requests to Bankin API
 *
 * @param  {string}  clientId      Client ID credential
 * @param  {string}  clientSecret  Client Secret
 * @param  {string}  version       Version number. Format 'YYYY-MM-DD' see https://apidocs.bankin.com/v2/docs/versionning
 *
 * @private
 */
class Client {
  endpoint: string;
  clientId: string;
  clientSecret: string;
  version: string;

  constructor(clientId: string, clientSecret: string, version: string) {
    this.endpoint = 'https://sync.bankin.com/v2';

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.version = version;
  }

  /**
   * POST request
   *
   * @param  {string} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   */
  post(uri: string, query: Object = {}, headers: Object = {}): Promise<any> {
    return got.post(`${this.endpoint}${uri}`, {
      query: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, removeUndefined(query)),
      headers: Object.assign({
        'Bankin-Version': this.version
      }, headers),
      json: true
    })
    .then(response => response.body);
  }

  /**
   * GET request
   *
   * @param  {string} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   */
  get(uri: string, query: Object = {}, headers: Object = {}): Promise<any> {
    return got.get(`${this.endpoint}${uri}`, {
      query: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, removeUndefined(query)),
      headers: Object.assign({
        'Bankin-Version': this.version
      }, headers),
      json: true
    })
    .then(response => response.body);
  }

  /**
   * PUT request
   *
   * @param  {string} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   */
  put(uri: string, query: Object = {}, headers: Object = {}): Promise<any> {
    return got.put(`${this.endpoint}${uri}`, {
      query: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, removeUndefined(query)),
      headers: Object.assign({
        'Bankin-Version': this.version
      }, headers),
      json: true
    })
    .then(response => response.body);
  }

  /**
   * DELETE request
   *
   * @param  {string} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   */
  delete(uri: string, query: Object = {}, headers: Object = {}): Promise<any> {
    return got.delete(`${this.endpoint}${uri}`, {
      query: Object.assign({}, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, removeUndefined(query)),
      headers: Object.assign({
        'Bankin-Version': this.version
      }, headers),
      json: true
    })
    .then(response => response.body);
  }
}

export default Client;
