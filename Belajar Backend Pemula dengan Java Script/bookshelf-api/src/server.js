const express = require('express');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');

const app = express();
const port = 9000;

// Body Parser Middleware
app.use(bodyParser.json());

// Array untuk menyimpan data buku
const books = [];

// Kriteria 3: Menyimpan Buku (POST /books)
app.post('/books', (req, res) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
});

// Kriteria 4: Menampilkan Seluruh Buku (GET /books)
app.get('/books', (req, res) => {
  const { name, reading, finished } = req.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    const readingStatus = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === readingStatus);
  }

  if (finished) {
    const finishedStatus = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === finishedStatus);
  }

  res.status(200).json({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });
});

// Kriteria 5: Menampilkan Detail Buku (GET /books/:bookId)
app.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

// Kriteria 6: Mengubah Data Buku (PUT /books/:bookId)
app.put('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }

  const updatedBook = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  books[bookIndex] = updatedBook;

  res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
});

// Kriteria 7: Menghapus Buku (DELETE /books/:bookId)
app.delete('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(bookIndex, 1);

  res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
