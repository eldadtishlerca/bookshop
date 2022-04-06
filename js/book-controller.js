function onInit() {
  doTrans()
  renderBooks()
}

function renderBooks() {
  var books = getBooks()
  var strHtmls = books.map(
    (book) =>
      `<tr>
        <td>${book.id}</td>
        <td>${htmlTrans(book.name)}</td>
        <td>${changeSymbol(book.price)} ${htmlTrans('symbol')}</td>
        <td>
            <button class="action-btn read" onclick="onReadBook('${
              book.id
            }')">${htmlTrans('book-read')}</button>
            <button class="action-btn update" onclick="onUpdateBook('${
              book.id
            }')">${htmlTrans('book-update')}</button>
            <button class="action-btn delete" onclick="onDeleteBook('${
              book.id
            }')">${htmlTrans('book-delete')}</button>
        </td>
        <td>
        <button class="btn-rate" onclick="onChangeRate('${
          book.id
        }',1)">+</button>
        ${book.rate}
        <button class="btn-rate" onclick="onChangeRate('${
          book.id
        }',-1)">-</button>
    </td>
    </tr>`
  )
  document.querySelector('.table-body-container').innerHTML = strHtmls.join('')
}

function htmlTrans(dataAttr) {
  var txt = getTrans(dataAttr)
  return txt
}

function changeSymbol(price) {
  switch (gCurrLang) {
    case 'en':
      return price
    case 'he':
      return price * 3
    case 'ja':
      return price * 123
  }
}

function onOpenModal() {
  const modal = document.querySelector('.modal')
  modal.style.display = 'block'
}

function onCloseModal() {
  const modal = document.querySelector('.modal')
  modal.style.display = 'none'
}

function onAddBook() {
  var elBookTitle = document.querySelector('input[id="booktitle"]')
  var elBookTitleHe = document.querySelector('input[id="booktitlehe"]')
  var elBookTitleJa = document.querySelector('input[id="booktitleja"]')
  var elBookPrice = document.querySelector('input[id="bookprice"]')
  var getBookPriceToNum = Number(elBookPrice.value)
  var elBookRate = document.querySelector('input[id="bookrate"]')
  var getBookRateToNum = Number(elBookRate.value)
  if (
    elBookTitle === '' ||
    isNaN(getBookPriceToNum) ||
    isNaN(getBookRateToNum)
  ) {
    return alert('Please enter vaild values')
  } else {
    addBook(
      elBookTitle.value,
      getBookPriceToNum,
      getBookRateToNum,
      elBookTitleHe.value,
      elBookTitleJa.value
    )
    elBookTitle.placeholder = 'Enter book title'
    elBookTitleHe.placeholder = 'Enter book title hebrew'
    elBookTitleJa.placeholder = 'Enter book title japanese'
    elBookPrice.placeholder = 'Enter book price'
    elBookRate.placeholder = 'Enter book rate'

    elBookTitle.value = ''
    elBookTitleHe.value = ''
    elBookTitleJa.value = ''
    elBookPrice.value = ''
    elBookRate.value = ''
    onCloseModal()
    renderBooks()
  }
}

function onDeleteBook(bookId) {
  deleteBook(bookId)
  renderBooks()
}

function onUpdateBook(bookId) {
  const book = getBookById(bookId)
  var newPrice = +prompt('New price?', book.price)

  if (!newPrice) return

  updateBook(bookId, newPrice)
  renderBooks()
}

function onReadBook(bookId) {
  var book = getBookById(bookId)
  var elModal = document.querySelector('.readModal')
  elModal.querySelector('h3').innerText = book.name
  elModal.querySelector('h4').innerText = `${book.price}`
  elModal.querySelector('p').innerText = 'blalblabllablalbllalsdflaksdf'
  elModal.querySelector(
    '.img-container'
  ).innerHTML = `<img src="img/${book.name}.jpg" alt="no photo for this book"></img>`

  const rateHtml = `
        <button onclick="onChangeRate('${book.id}',1)">+</button>
            ${book.rate}
        <button onclick="onChangeRate('${book.id}',-1)">-</button>`
  elModal.querySelector('.rate-container').innerHTML = rateHtml

  elModal.classList.add('open')
}

function onChangeRate(bookId, diff) {
  changeRate(bookId, diff)
  onReadBook(bookId)
  renderBooks()
}

function onSetLang(lang) {
  setLang(lang)
  // If lang is hebrew add RTL class to document.body
  if (lang === 'he' || lang === 'ja') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')

  doTrans()
  renderBooks()
}
