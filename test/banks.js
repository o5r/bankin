import Bankin from '../lib/bankin';
import Pagination from '../lib/pagination';

import {expect} from 'chai';

describe('Class Banks', () => {
  let bankin;

  beforeEach(() => {
    bankin = new Bankin(process.env.BANKIN_SANDBOX_CLIENT_ID, process.env.BANKIN_SANDBOX_CLIENT_SECRET);
  });

  it('should list banks', () => {
    return bankin.banks.list()
      .then(banks => {
        expect(banks).to.be.an.instanceof(Pagination);
        expect(banks.resources).to.be.an('array');
        expect(banks.pagination).to.be.an('object');
      });
  });

  it('should list banks with `limit`', () => {
    return bankin.banks.list({limit: 1})
      .then(banks => {
        expect(banks.resources).to.have.lengthOf(1);
      });
  });

  xit('should list banks with `before`', () => {

  });

  it('should get one bank by id', () => {
    return bankin.banks.get(64)
      .then(bank => {
        expect(bank).to.be.eql({
          id: 64,
          name: 'Crédit Agricole Languedoc',
          form: [{
            label: 'N° de Compte',
            type: 'USER',
            isNum: '1',
            maxLength: null
          }, {
            label: 'Code Personnel',
            type: 'PWD',
            isNum: '1',
            maxLength: null
          }],
          country_code: 'FR',
          automatic_refresh: true,
          resource_uri: '/v2/banks/64',
          resource_type: 'bank'
        });
      });
  });
});
