import Bankin from '../lib/bankin';
import User from '../lib/user';
import Pagination from '../lib/pagination';

import {expect} from 'chai';

describe('Class Users', () => {
  let bankin;

  beforeEach(() => {
    bankin = new Bankin(process.env.BANKIN_SANDBOX_CLIENT_ID, process.env.BANKIN_SANDBOX_CLIENT_SECRET);
  });

  describe('Create', () => {
    it('should create user', () => {
      const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

      return bankin.users.create(email, 'abcdef123456')
        .then(user => {
          expect(user).to.be.an('object');
          expect(user).to.have.property('uuid')
          expect(user).to.have.property('resource_uri')
          expect(user).to.have.property('resource_type')
          expect(user).to.have.property('email', email)
        });
    });

    it('should return error when create user with missing params', () => {
      return bankin.users.create('tototo@mail.com')
        .catch(err => {
          expect(err).to.be.instanceof(Error);
        });
    });

    after(() => bankin.users._deleteAll())
  });

  describe('Auth', () => {
    const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

    before(() => bankin.users.create(email, 'abcdef123456'));

    it('should instantiate User', () => {
      return bankin.users.auth(email, 'abcdef123456')
        .then(user => {
          expect(user).to.be.instanceof(User);
          expect(user).to.have.property('access_token');
          expect(user).to.have.property('expires_at');
          expect(user).to.have.property('user').that.is.an('object');
          expect(user.user).to.have.property('uuid');
          expect(user.user).to.have.property('email');
          expect(user.user).to.have.property('resource_uri');
          expect(user.user).to.have.property('resource_type');
        });
    });

    it('should return error when auth with missing params', () => {
      return bankin.users.auth(email)
        .catch(err => {
          expect(err).to.be.instanceof(Error);
        });
    });

    after(() => bankin.users._deleteAll());
  });

  describe('List', () => {
    before(() => bankin.users.create(`loutre${Math.round(Math.random() * 1000)}@mail.com`, 'abcdef123456')
      .then(() => bankin.users.create(`loutre${Math.round(Math.random() * 1000)}@mail.com`, 'abcdef123456')));

    it('should list users', () => {
      return bankin.users.list()
        .then(users => {
          expect(users).to.be.an.instanceof(Pagination);
          expect(users.resources).to.be.an('array');
          expect(users.resources).to.have.lengthOf(2);
          expect(users.pagination).to.be.an('object');
        });
    });

    it('should list users with `limit`', () => {
      return bankin.users.list({limit: 1})
        .then(users => {
          expect(users.resources).to.have.lengthOf(1);
        });
    });

    after(() => bankin.users._deleteAll());
  });

  describe('Edit / delete user', () => {
    let user;
    const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

    beforeEach(() => {
      return bankin.users.create(email, 'abcdef123456')
        .then(() => bankin.users.auth(email, 'abcdef123456'))
        .then((u) => user = u);
    });

    it('should edit user', () => {
      return bankin.users.edit(user.user.uuid, 'abcdef123456', '654321fedcba')
        .then((u) => {
          expect(u).to.have.property('email', email);

          return bankin.users.auth(email, '654321fedcba');
        })
        .then((u) => {
          expect(u).to.have.property('access_token');
        });
    });

    it('should delete user', () => {
      return bankin.users.delete(user.user.uuid, 'abcdef123456')
        .then(() => bankin.users.list())
        .then((users) => {
          expect(users.resources).to.have.lengthOf(0);
        });
    });

    afterEach(() => bankin.users._deleteAll());
  });
});
