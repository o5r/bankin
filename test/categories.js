import Bankin from '../lib/bankin';
import Pagination from '../lib/pagination';

import {expect} from 'chai';

describe('Class Categories', () => {
  let bankin;

  beforeEach(() => {
    bankin = new Bankin(process.env.BANKIN_CLIENT_ID, process.env.BANKIN_CLIENT_SECRET);
  });

  it('should list categories', () => {
    return bankin.categories.list()
      .then(categories => {
        expect(categories).to.be.an.instanceof(Pagination);
        expect(categories.resources).to.be.an('array');
        expect(categories.pagination).to.be.an('object');
      });
  });

  it('should list categories with `limit`', () => {
    return bankin.categories.list({limit: 1})
      .then(categories => {
        expect(categories.resources).to.have.lengthOf(1);
      });
  });

  xit('should list categories with `before`', () => {

  });

  it('should get one category by id', () => {
    return bankin.categories.get(321)
      .then(category => {
        expect(category).to.eql({
          id: 321,
          name: 'Beauty care',
          parent: {
            id: 315,
            resource_uri: '/v2/categories/315',
            resource_type: 'category'
          },
          resource_uri: '/v2/categories/321',
          resource_type: 'category'
        });
      });
  });

  it('should get category in french', () => {
    return bankin.categories.get(321, 'fr')
      .then(category => {
        expect(category.name).to.be.eql('Esthétique');
      });
  });
});
