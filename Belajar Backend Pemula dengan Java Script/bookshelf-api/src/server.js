const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');

// server Hapi
const server = Hapi.server({
  port: 9000,
  host: 'localhost',
});

// array data buku
const books = [];

// Kriteria 3: Menyimpan Buku (POST /books)
server.route({
  method: 'POST',
  path: '/books',
  handler: (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
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

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  },
});

// Kriteria 4: Menampilkan Seluruh Buku (GET /books)
server.route({
  method: 'GET',
  path: '/books',
  handler: (request, h) => {
    const { name, reading, finished } = request.query;

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

    const simplifiedBooks = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h
      .response({
        status: 'success',
        data: {
          books: simplifiedBooks,
        },
      })
      .code(200);
  },
});

// Kriteria 5: Menampilkan Detail Buku (GET /books/{bookId})
server.route({
  method: 'GET',
  path: '/books/{bookId}',
  handler: (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
    }

    return h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
  },
});

// Kriteria 6: Mengubah Data Buku (PUT /books/{bookId})
server.route({
  method: 'PUT',
  path: '/books/{bookId}',
  handler: (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    const bookIndex = books.findIndex((b) => b.id === bookId);
    if (bookIndex === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
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

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  },
});

// Kriteria 7: Menghapus Buku (DELETE /books/{bookId})
server.route({
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: (request, h) => {
    const { bookId } = request.params;
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
    }

    books.splice(bookIndex, 1);

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  },
});

// Menjalankan server Hapi
const start = async () => {
  try {
    await server.start();
    console.log(`Server berjalan pada port ${server.info.port}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
