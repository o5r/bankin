import got from 'got';

function removeUndefined(obj) {
  Object.keys(obj).forEach(function (key) {
    if(typeof obj[key] === 'undefined'){
      delete obj[key];
    }
  });

  return obj;
}

export default class Client {
  constructor(clientId, clientSecret, version) {
    this.endpoint = 'https://sync.bankin.com/v2';

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.version = version;
  }

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
    .then(response => response.body);
  }

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

  delete(uri) {
    return got.delete(`${this.endpoint}${uri}`, {
      query: {
        client_id: this.clientId,
        client_secret: this.clientSecret
      },
      headers: {
        'Bankin-Version': this.version
      },
      json: true
    })
    .then(response => response.body);
  }
}
