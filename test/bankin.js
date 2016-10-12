import Bankin from '../lib/bankin';
import Client from '../lib/client';
import Users from '../lib/users';
import Banks from '../lib/banks';
import Categories from '../lib/categories';

import {expect} from 'chai';

describe('Class Bankin', () => {
  let bankin;

  beforeEach(() => {
    bankin = new Bankin('CLIENTID', 'SECRET');
  });

  it('should instantiate Client', () => {
    expect(bankin._client).to.be.an.instanceof(Client);
    expect(bankin._client).to.have.property('endpoint', 'https://sync.bankin.com/v2')
    expect(bankin._client).to.have.property('clientId', 'CLIENTID')
    expect(bankin._client).to.have.property('clientSecret', 'SECRET')
    expect(bankin._client).to.have.property('version', '2016-01-18')
  });

  it('should instantiate Users', () => {
    expect(bankin.users).to.be.an.instanceof(Users);
  });

  it('should instantiate Banks', () => {
    expect(bankin.banks).to.be.an.instanceof(Banks);
  });

  it('should instantiate Categories', () => {
    expect(bankin.categories).to.be.an.instanceof(Categories);
  });
});
