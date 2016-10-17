# Bankin'

Un-official node.js module for [Bankin' Web Services](https://bws.bankin.com)

[![Codeship](https://img.shields.io/codeship/35568bf0-71ee-0134-1517-4aa1d703861e/master.svg)](https://app.codeship.com/projects/178470) [![npm](https://img.shields.io/npm/dt/bankin.svg)](https://www.npmjs.com/package/bankin) [![npm](https://img.shields.io/npm/v/bankin.svg)](https://www.npmjs.com/package/bankin) [![license](https://img.shields.io/github/license/lendix/bankin.svg)](https://github.com/Lendix/bankin/blob/master/LICENSE.md)

## Install

```shell
npm install bankin --save
```

## Getting started

```JavaScript
const Bankin = require('bankin');
const bankin = new Bankin('myClientId', 'myClientSecret');

// create a new user
bankin.users.create('myemail@mail.com', 'PaSsEwOrD123456');

// ---

// forge connect item url and redirect user to it
user.items.connectUrl('408')
  .then((url) => res.redirect(url));

// ---

// auth to existing user
bankin.users.auth('myemail2@mail.com', 'PaSsEwOrD123456')) // login with it
  .then((user) => user.transactions.list({ limit: 1 })) // get last transactions
  .then((transactions) => {
      console.log(transactions.resources)
      /*
        [
          {
            "id": 1000013123932,
            "description": "Prelevement Spotify SA",
            "full_description": "Prlv 1512 Spotify SA",
            "amount": -4.99,
            "date": "2016-04-06",
            "update_date": "2016-04-06T09:19:14Z",
            "is_deleted": false,
            "category": {
              "id": 1,
              "resource_uri": "/v2/categories/1",
              "resource_type": "category"
            },
            "account": {
              "id": 2341498,
              "resource_uri": "/v2/accounts/2341498",
              "resource_type": "account"
            },
            "resource_uri": "/v2/transactions/1000013123932",
            "resource_type": "transaction"
          }
        ]
       */

      return transactions.next(); // Get the next page
    });
```

## Documentations

[Official REST API documentation](https://apidocs.bankin.com/v2/docs)
[bankin node module documentation](https://lendix.github.io/bankin)
