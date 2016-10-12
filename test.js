const Bankin = require('./lib');

const bankin = new Bankin('32574cd1918849b49d7d9fa9a4d6826a', 'kUZn52tFxXe007WmekEQJhfHzboYGJTXbYMWWohLHvNKjD5evKDGHcHnjop7VNIH')

const EMAIL = `toto${Math.round(Math.random() * 1000)}@mail.com`;
const PASSWORD = 'abcdef123456';


// Create user

// bankin.users.create({
//   email: '',
//   password: ''
// })
// .then(user => {
//   console.log(user);
// })
//


// // Get banks list

bankin.banks.list({limit: 2})
  .then((bank) => {
    console.log('\n', bank, '\n');

    return bank.next();
  })
  .then(bank => {
    console.log('\n', bank, '\n');
  });


// // list account

// user.accounts.list({
//   limit: 1
// })
// .then(account.next)
// .then(account => {
//   // the second account
// })
