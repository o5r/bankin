/* @flow */
import Client from './client';
import User from './user';
import type {
  InputPagination,
  PromisedPagination
} from './pagination';
import Pagination from './pagination';

/**
 * Class Users
 *
 * @param  {Client} client
 */
class Users {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Create a user
   *
   * @param  {string} email     User email address.
   * @param  {string} password  User password. Must be at least 6 characters and less than 255 characters.
   *
   * @see  https://apidocs.bankin.com/v2/docs/create-a-user
   */
  create(email: string, password: string): Promise<Object> {
    return this._client.post('/users', {email, password});
  }

  /**
   * Authenticate a user
   *
   * @param  {string} email     User email.
   * @param  {string} password  User password.
   *
   * @see  https://apidocs.bankin.com/v2/docs/authenticate-a-user
   */
  auth(email: string, password: string): Promise<User> {
    return this._client.post('/authenticate', {email, password})
      .then(user => new User(this._client, {password, ...user}));
  }

  /**
   * List users
   *
   * @param  {Object} [$0]
   * @param  {string} [$0.before]    Cursor pointing to the end of the desired set.
   * @param  {string} [$0.after]     Cursor pointing to the start of the desired set.
   * @param  {number} [$0.limit=50]  Number of records to return. Accepted values: 1 - 500.
   *
   * @see  https://apidocs.bankin.com/v2/docs/list-users
   */
  list({before, after, limit = 50}: InputPagination = {}): PromisedPagination<User> {
    return this._client.get('/users', {before, after, limit})
      .then(users => new Pagination(this._client, users));
  }

  /**
   * Edit user credentials
   *
   * @param  {string} userId
   * @param  {string} current_password  The current user password.
   * @param  {string} new_password      The new user password.
   *
   * @see  https://apidocs.bankin.com/v2/docs/edit-user-credentials
   */
  edit(userId: string, current_password: string, new_password: string): Promise<Object> {
    return this._client.put(`/users/${userId}/password`, {current_password, new_password});
  }

  /**
   * Delete a user
   *
   * @param  {string} userId
   * @param  {string} password  User's current password.
   */
  delete(userId: string, password: string): Promise<Object> {
    return this._client.delete(`/users/${userId}`, {password});
  }

  /**
   * Delete all users
   *
   * ⚠ Only available for sandbox 😄
   */
  _deleteAll(): Promise<Object> {
    return this._client.delete(`/users`);
  }
}

export default Users;
