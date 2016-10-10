
class User {
  constructor(api, user) {
    const that = this;

    this._api = api;

    this._user = user;

    this.items = {
      connect(bank_id, redirect_url = undefined) {
        return that._api.items.connect({
          access_token: that._user.access_token,
          bank_id,
          redirect_url
        });
      },

      connectUrl(bank_id, redirect_url = undefined) {
        return that._api.items.connectUrl({
          access_token: that._user.access_token,
          bank_id,
          redirect_url
        });
      },

      list() {

      },

      get() {

      },

      edit() {

      },

      refresh() {

      },

      refreshStatus() {

      },

      mfa() {

      },

      delete() {

      }
    };
  }

  logout() {
    return this.api.logout(this._user.user.uuid);
  }

  edit(current_password, new_password) {
    return this.api.edit(this._user.user.uuid, {current_password, new_password});
  }

  delete(password) {
    return this.api.delete(this._user.user.uuid, {password});
  }
}

export default User;
