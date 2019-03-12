const express = require('express');
const bookRouter = express.Router();
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
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
      res.render(
        'bookView', 
        {
          nav,
          title: 'Book ' + id,
          book: books[id]
        }
      );
    });

  return bookRouter;
}



module.exports = router;