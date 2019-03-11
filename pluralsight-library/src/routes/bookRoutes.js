const express = require('express');
const bookRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  }
];

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books', 
      {
        nav: [
          {
            link: '/books',
            title: 'Books'
          },
          {
            link: '/authors',
            title: 'Authors'
          }
        ],
        title: 'Books',
        books
      }
    );
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render(
      'book', 
      {
        nav: [
          {
            link: '/books',
            title: 'Books'
          },
          {
            link: '/authors',
            title: 'Authors'
          }
        ],
        title: 'Book ' + id,
        book: books[id]
      }
    );
  });

module.exports = bookRouter;