const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;

      // database
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;

        try {
          // db conection
          client = await MongoClient.connect(url);
          debug('Connected to server successfully!');

          // db & collection selection
          const db = client.db(dbName);
          const col = db.collection('users');

          // create & insert user
          const user = { username, password };
          const results = await col.insertOne(user);

          // login & return user
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug('Error creating user in login');
          debug(error.stack);
        }
      }());
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
