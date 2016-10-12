import Bankin from '../lib/bankin';

import http from 'http';
import {expect} from 'chai';
import phantomjs from 'phantomjs-prebuilt';
import {remote} from 'webdriverio';

describe.only('items', () => {
  let phantom;
  let bankin;
  let user;
  const wdOpts = {
    desiredCapabilities: {
      'phantomjs.cli.jargs': '--web-security=false',
      browserName: 'phantomjs'
    },
    waitforTimeout: 10000,
    logLevel: 'verbose'
  };
  const email = `loutre${Math.round(Math.random() * 1000)}@mail.com`;

  before(() => {
    bankin = new Bankin(process.env.BANKIN_SANDBOX_CLIENT_ID, process.env.BANKIN_SANDBOX_CLIENT_SECRET);

    return phantomjs.run(
      '--remote-debugger-port=8083',
      '--debug=true',
      '--webdriver=4444',
      '--web-security=false',
      '--webdriver-logfile=/home/pierrick/lendix/bankin/phantom.log',
      '--webdriver-loglevel=INFO'
    )
      .then((p) => {
        phantom = p;
      });
  });

  beforeEach(() => {
    return bankin.users.create(email, 'abcdef123456')
      .then(() => bankin.users.auth(email, 'abcdef123456'))
      .then((u) => user = u);
  });

  it('should connect item', function (done) {
    this.timeout(20000);

    user.items.connectUrl(408, 'http://localhost:8042/')
      .then((url) => {
        console.log(url)

        remote(wdOpts)
          .init()
          .url(url)
          // .debug()
          // .getHTML('body', function(err, html) {
          //     console.log(err, html);
          // })
          // .setValue('input[name="USER"]', '123456789')
          // .getTitle()

          .setValue('input[name="USER"]', '123456789')
          .getValue('input[name="USER"]')
          .then(function(value) {
            console.log('value', value)
            done();
          })
          // .setValue('input[name="USER"]', '123456789')
          // .setValue('input[name="PWD"]', 'demo0')
          // .leftClick('input[name="tos"]')
          // .leftClick('button[type="submit"]')
          // .pause(1000)
          // .getTitle().then(function(title) {
          //   console.log(title)

          //   phantom.kill()
          // })
          // .end();
      });

    http.createServer(function (req, res) {
      console.log('PING §')
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('');

      done();
    })
    .listen(8042);
  });

  afterEach(() => bankin.users._deleteAll());
});
