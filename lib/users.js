import User from './user';
import Pagination from './pagination';

export default class Users {
  constructor(client) {
    this._client = client;
  }

  create(email, password) {
    return this._client.post('/users', {email, password});
  }

  auth(email, password) {
    return this._client.post('/authenticate', {email, password})
      .then(user => new User(this._client, {password, ...user}));
  }

  list({before, after, limit = 50} = {}) {
    return this._client.get('/users', {before, after, limit})
      .then(users => new Pagination(this._client, users));
  }

  edit(userId, current_password, new_password) {
    return this._client.put(`/users/${userId}/password`, {current_password, new_password});
  }

  delete(userId, password) {
    return this._client.delete(`/users/${userId}`, {password});
  }

  _deleteAll() {
    // Only for sandbox 😄
    return this._client.delete(`/users`);
  }
}
