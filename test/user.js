import Bankin from '../lib/bankin';

import {expect} from 'chai';

describe('Class User', () => {
  let bankin;
  let user;
  const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

  before(() => {
    bankin = new Bankin(process.env.BANKIN_CLIENT_ID, process.env.BANKIN_CLIENT_SECRET);
  });

  beforeEach(() => {
    return bankin.users.create(email, 'abcdef123456')
      .then(() => bankin.users.auth(email, 'abcdef123456'))
      .then((u) => user = u);
  });

  xdescribe('account', () => {

  });

  xdescribe('items', () => {

  });

  xdescribe('transactions', () => {

  });

  xdescribe('stocks', () => {

  });

  xit('should logout', () => {
    // todo
    // return user.logout()
    //   .then()
  });

  it('should edit user', () => {
    return user.edit('654321fedcba')
      .then((u) => {
        expect(u).to.have.property('email', email);

        return bankin.users.auth(email, '654321fedcba');
      })
      .then((u) => {
        expect(u).to.have.property('access_token');
      });
  });

  it('should delete user', () => {
    return user.delete()
      .then(() => bankin.users.list())
      .then((users) => {
        expect(users.resources).to.have.lengthOf(0);
      });
  });

  afterEach(() => bankin.users._deleteAll());
});
