const bankin = new Bankin(CLIENT_ID, CLIENT_SECRET)

bankin.users.create({
  email: '',
  password: ''
})
.then(user => {
  console.log(user);
  /*
  {
    "uuid": "79c8961c-bdf7-11e5-88a3-4f2c2aec0665",
    "email": "john.doe@email.com",
    "resource_type": "user",
    "resource_url": "/v2/users/79c8961c-bdf7-11e5-88a3-4f2c2aec0665"
  }
   */
})
.then(() => {
  return bankin.users.auth({
    email: '',
    password: ''
  })
    .tap((user) => {
      console.log(user);
      /*
      {
        "user": {
          "uuid": "c2a26c9e-dc23-4f67-b887-bbae0f26c415",
          "email": "john.doe@email.com",
          "resource_uri": "/v2/users/c2a26c9e-dc23-4f67-b887-bbae0f26c415",
          "resource_type": "user"
        },
        "access_token": "...",
        "expires_at": "2016-05-06T11:08:25.040Z"
      }
       */
    });
})
.tap((user) => {
  return user.accounts.list({
    before: '' // opt
    after: '', // opt
    limit: '' // opt 1-500 def 50
  })
    .then(accounts => {
      console.log(accounts);
    });
})
.tap((user) => {
  return bankin.accounts.list({
    access_token: '',
    before: '', // opt
    after: '', // opt
    limit: '' // opt 1-500 def 50
  })
    .then(accounts => {
      console.log(accounts);
    });
})
