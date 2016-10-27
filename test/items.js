import Bankin from '../lib/bankin';
import Pagination from '../lib/pagination';

import http from 'http';
import querystring from 'querystring';
import selenium from 'selenium-standalone'
import url from 'url';
import {expect} from 'chai';
import {remote} from 'webdriverio';

function createServer(pathname, port, done) {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('');

    const parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname === pathname) {
      done()
    }
  })
  .listen(port);
}

describe.only('User.items', () => {
  let seleniumProcess;
  let browser;
  let bankin;
  let user;
  let itemId;

  const wdOpts = {
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        "args": [
          "window-size=1366,768",
          "no-proxy-server",
          "no-default-browser-check",
          "no-first-run",
          "disable-boot-animation",
          "disable-default-apps",
          "disable-extensions",
          "disable-translate"
        ]
      }
    },
    logLevel: 'verbose',
    waitforTimeout: 10000
  };
  const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

  function checkStatus(awaitedStatus) {
    return user.items.refreshStatus(itemId)
    .then((status) => {
      console.log(`  ${status.status}`);

      return new Promise((resolve, reject) => {

        setTimeout(() => {

          if (status.status === awaitedStatus) {
            return resolve() /*user.items.get(itemId).then((item) => console.log('item :', item.status))*/;
          }

          return resolve(checkStatus(awaitedStatus));
        }, 2000);

      });
    });
  }

  before(function (done) {
    this.timeout(60000);

    bankin = new Bankin(process.env.BANKIN_SANDBOX_CLIENT_ID, process.env.BANKIN_SANDBOX_CLIENT_SECRET);

    bankin.users.create(email, 'abcdef123456')
      .then(() => bankin.users.auth(email, 'abcdef123456'))
      .then((u) => user = u)
      .then(() => {
        selenium.install({
          drivers: {
            chrome: {}
          }
        }, () => {
          selenium.start({ drivers: { chrome: {} } }, (err, sp) => {
            if (err) {
              return done(err);
            }

            seleniumProcess = sp;


            browser = remote(wdOpts).init();

            browser
              .url('https://www.google.fr');

            setTimeout(() => {
              done()
            }, 2000);
          });
        });
      });
  });

  after((done) => {
    bankin.users._deleteAll()
      .then(() => browser.end())
      .then(() => {
        seleniumProcess.kill();
        done();
      });
  });

  it('should connect item', function (done) {
    this.timeout(60000);
    console.log('before', 'should connect item')
    user.items.connectUrl(408, 'http://localhost:8042/')
      .then((connectUrl) => {
        console.log('after', 'should connect item', connectUrl)
        const parsedUrl = url.parse(connectUrl);
        const parsedQS = querystring.parse(parsedUrl.query);

        expect(parsedUrl.hostname).to.be.eql('sync.bankin.com');
        expect(parsedUrl.pathname).to.be.eql('/v2/items/connect');
        expect(parsedQS).to.have.property('client_id');
        expect(parsedQS).to.have.property('access_token');
        expect(parsedQS).to.have.property('bank_id');
        expect(parsedQS).to.have.property('redirect_url');

        browser
          .url(connectUrl)
          .setValue('input[name="USER"]', '123456789')
          .setValue('input[name="PWD"]', 'demo402')
          .leftClick('input[name="tos"]')
          .leftClick('button[type="submit"]');
      })
      .catch(done);

    createServer('/', 8042, done);
  });

  it('should list items', () => {
    return user.items.list()
      .then(items => {
        expect(items).to.be.an.instanceof(Pagination);
        expect(items.resources).to.be.an('array');
        expect(items.pagination).to.be.an('object');

        itemId = items.resources[0].id;
      });
  });

  it('should get item', () => {
    return user.items.get(itemId)
      .then((item) => {
        expect(item).to.have.property('status');
        expect(item).to.have.property('bank').that.is.eql({
          id: 408,
          resource_uri: '/v2/banks/408',
          resource_type: 'bank'
        });
        expect(item).to.have.property('accounts').that.is.an('array');
        expect(item.accounts[0]).to.have.property('id')
        expect(item.accounts[0]).to.have.property('resource_uri')
        expect(item.accounts[0]).to.have.property('resource_type', 'account')
        expect(item).to.have.property('resource_uri');
        expect(item).to.have.property('resource_type', 'item');
      });
  });

  it('should get refresh status', () => {
    return user.items.refreshStatus(itemId)
      .then((status) => {
        expect(status).to.have.property('status');
        expect(status).to.have.property('mfa');
        expect(status).to.have.property('refreshed_at');
        expect(status).to.have.property('refreshed_accounts_count');
        expect(status).to.have.property('total_accounts_count');
      });
  });

  it('should edit item', function(done) {
    this.timeout(20000);

    user.items.editUrl(itemId, 'http://localhost:8043/')
      .then((connectUrl) => {
        const parsedUrl = url.parse(connectUrl);
        const parsedQS = querystring.parse(parsedUrl.query);

        expect(parsedUrl.hostname).to.be.eql('sync.bankin.com');
        expect(parsedUrl.pathname).to.be.eql(`/v2/items/${itemId}/edit`);
        expect(parsedQS).to.have.property('client_id');
        expect(parsedQS).to.have.property('access_token');
        expect(parsedQS).to.have.property('redirect_url');

        browser
          .url(connectUrl)
          .setValue('input[name="USER"]', '123456789')
          .setValue('input[name="PWD"]', 'demoOTP')
          .leftClick('button[type="submit"]')
      })
      .catch(done);

    createServer('/', 8043, done);
  });

  it('should send MFA', function() {
    this.timeout(20000);

    return checkStatus('info_required')
      .then(() => user.items.mfa(itemId, '123456'));
  });

  it('should refresh item', function() {
    this.timeout(20000);

    return checkStatus('finished')
      .then(() => user.items.refresh(itemId));
  });

  it('should delete item', () => {
    return user.items.delete(itemId)
      .then(() => user.items.list())
      .then((items) => {
        expect(items.resources).to.have.lengthOf(0);
      });
  });
});
