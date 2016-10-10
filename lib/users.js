import User from './user';

class Users {
  constructor(api) {
    this._api = api;
  }

  create(email, password) {
    return this._api.users.create({email, password});
  }

  auth(email, password) {
    return this._api.users.auth({email, password})
      .then(user => new User(this.api, user));
  }

  list({before = null, after = null, limit = 50}) {
    return this._api.users.list({before, after, limit});
  }

  deleteAll() {
    return this._api.users.deleteAll();
  }
}

export default Users;
