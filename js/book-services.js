var gBooks
_createBooks()

function getBooks() {
  return gBooks
}

function addBook(name, price, rate, heName, jaName) {
  const book = _createBook(name, price, rate)
  if (heName === '') {
    heName = name
  }
  if (jaName === '') {
    jaName = name
  }
  const toTrans = { en: name, he: heName, ja: jaName }
  gTrans[`${name}`] = toTrans
  gBooks.unshift(book)
  saveBooksToStorage()
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function updateBook(bookId, newPrice) {
  const book = getBookById(bookId)
  book.price = newPrice
  saveBooksToStorage()
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  saveBooksToStorage()
}

//AFTER
function changeRate(bookId, diff) {
  const book = getBookById(bookId)
  if (book.rate + diff < 0 || book.rate + diff > 10) return
  book.rate += diff
}

// Private functions
function _createBooks() {
  var books = loadFromStorage('bookDB')

  if (!books || !books.length) {
    books = [
      {
        id: makeId(),
        name: 'Death Note Part I',
        hename: 'מחברת המוות חלק ראשון',
        price: 80,
        rate: 8,
      },
      {
        id: makeId(),
        name: 'One Piece Wano Arc',
        price: 150,
        rate: 9,
      },
      {
        id: makeId(),
        name: 'Demon Slayer Entertainment District Arc',
        price: 120,
        rate: 10,
      },
    ]
  }

  gBooks = books
  saveBooksToStorage()
}

function _createBook(name, price, rate) {
  return {
    id: makeId(),
    name,
    price,
    imgUrl: ' ',
    rate: rate,
  }
}
