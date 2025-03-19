document.addEventListener('DOMContentLoaded', function () {
  const bookForm = document.getElementById('bookForm');
  const searchForm = document.getElementById('searchBook');
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  let books = (JSON.parse(localStorage.getItem('books')) || []).map((book) => ({
    ...book,
    year: Number(book.year),
  }));

  function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  function renderBooks(filterQuery = '') {
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books
      .filter((book) => book.title.toLowerCase().includes(filterQuery.toLowerCase()))
      .forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
  }

  function createBookElement(book) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-item');
    bookContainer.setAttribute('data-bookid', book.id);
    bookContainer.setAttribute('data-testid', 'bookItem');

    const title = document.createElement('h3');
    title.setAttribute('data-testid', 'bookItemTitle');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.setAttribute('data-testid', 'bookItemAuthor');
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement('p');
    year.setAttribute('data-testid', 'bookItemYear');
    year.textContent = `Tahun: ${book.year}`;

    const buttonContainer = document.createElement('div');

    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    toggleButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    toggleButton.addEventListener('click', function () {
      toggleBookStatus(book.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.textContent = 'Hapus Buku';
    deleteButton.addEventListener('click', function () {
      deleteBook(book.id);
    });

    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(deleteButton);

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(year);
    bookContainer.appendChild(buttonContainer);

    return bookContainer;
  }

  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('bookFormTitle').value.trim();
    const author = document.getElementById('bookFormAuthor').value.trim();
    const yearInput = document.getElementById('bookFormYear').value.trim();
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const year = Number(yearInput);

    if (title === '' || author === '' || isNaN(year) || year === 0) {
      return alert('Lengkapi semua data buku dengan benar!');
    }

    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
    bookForm.reset();
  });

  function deleteBook(bookId) {
    books = books.filter((book) => book.id !== bookId);
    saveBooks();
    renderBooks();
  }

  function toggleBookStatus(bookId) {
    const book = books.find((book) => book.id === bookId);
    if (book) {
      book.isComplete = !book.isComplete;
      saveBooks();
      renderBooks();
    }
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('searchBookTitle').value.trim();
    renderBooks(query);
  });

  renderBooks();
});
