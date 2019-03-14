const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  // auth middleware to allow just logged in users
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected successfully to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView', 
            {
              nav,
              title: 'Books',
              books
            }
          );
        } catch (error) {
          debug("Error getting books");
          debug(error.stack);
        }

        client.close();
      }());
    });
  
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected successfully to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) })

          res.render(
            'bookView', 
            {
              nav,
              title: 'Book: ' + book.title,
              book
            }
          );

        } catch (error) {
          debug("Error getting single book");
          debug(error.stack);
        }

        client.close();
      }());

      
    });

  return bookRouter;
}



module.exports = router;