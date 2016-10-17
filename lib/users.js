/**
 * @module users
 */
import User from './user';
import Pagination from './pagination';

/**
 * Class Users
 */
class Users {
  /**
   * @param  {Client} client
   */
  constructor(client) {
    this._client = client;
  }

  /**
   * Create a user
   *
   * @param  {String} email     User's email address.
   * @param  {String} password  User's password. Must be at least 6 characters and less than 255 characters.
   * @see  https://apidocs.bankin.com/v2/docs/create-a-user
   */
  create(email, password) {
    return this._client.post('/users', {email, password});
  }

  /**
   * Authenticate a user
   *
   * @param  {String} email     User's email.
   * @param  {String} password  User's password.
   * @return {Promise<User>}
   * @see  https://apidocs.bankin.com/v2/docs/authenticate-a-user
   */
  auth(email, password) {
    return this._client.post('/authenticate', {email, password})
      .then(user => new User(this._client, {password, ...user}));
  }

  /**
   * List users
   *
   * @param  {String} [options.before]    Cursor pointing to the end of the desired set.
   * @param  {String} [options.after]     Cursor pointing to the start of the desired set.
   * @param  {Number} [options.limit=50]  Number of records to return. Accepted values: 1 - 500.
   * @return {Promise<Pagination<Object>>}
   * @see  https://apidocs.bankin.com/v2/docs/list-users
   */
  list({before, after, limit = 50} = {}) {
    return this._client.get('/users', {before, after, limit})
      .then(users => new Pagination(this._client, users));
  }

  /**
   * Edit user's credentials
   *
   * @param  {String} userId
   * @param  {String} current_password  The current user's password.
   * @param  {String} new_password      The new user's password.
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  edit(userId, current_password, new_password) {
    return this._client.put(`/users/${userId}/password`, {current_password, new_password});
  }

  /**
   * Delete a user
   *
   * @param  {String} userId
   * @param  {String} password  User's current password.
   */
  delete(userId, password) {
    return this._client.delete(`/users/${userId}`, {password});
  }

  /**
   * Delete all users
   *
   * ⚠ Only available for sandbox 😄
   */
  _deleteAll() {
    return this._client.delete(`/users`);
  }
}

export default Users;
