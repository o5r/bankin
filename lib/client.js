/**
 * @module client
 */
import got from 'got';

/**
 * Remove undefined attributes
 *
 * @param  {Object} obj
 * @return {Object}
 */
function removeUndefined(obj) {
  Object.keys(obj).forEach(function (key) {
    if(typeof obj[key] === 'undefined'){
      delete obj[key];
    }
  });

  return obj;
}

/**
 * Client Class
 *
 * Make requests to Bankin API
 *
 * @private
 */
class Client {
  /**
   * @param  {String}  clientId      Client ID credential
   * @param  {String}  clientSecret  Client Secret
   * @param  {String}  version       Version number. Format 'YYYY-MM-DD' see https://apidocs.bankin.com/v2/docs/versionning
   */
  constructor(clientId, clientSecret, version) {
    this.endpoint = 'https://sync.bankin.com/v2';

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.version = version;
  }

  /**
   * POST request
   *
   * @param  {String} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   * @return {Promise<Object>}
   */
  post(uri, query = {}, headers = {}) {
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
    .then(response => response.body)
    .catch(err => {
      console.log('error', err.response.body)
    });
  }

  /**
   * GET request
   *
   * @param  {String} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   * @return {Promise<Object>}
   */
  get(uri, query = {}, headers = {}) {
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
   * @param  {String} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   * @return {Promise<Object>}
   */
  put(uri, query = {}, headers = {}) {
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
   * @param  {String} uri        Endpoint path
   * @param  {Object} [query]    Additional query-string
   * @param  {Object} [headers]  Additional headers
   * @return {Promise<Object>}
   */
  delete(uri, query = {}, headers = {}) {
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
