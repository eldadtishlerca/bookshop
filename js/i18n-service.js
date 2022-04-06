'use strict'

// console.log(books)

const gTrans = {
  title: {
    en: 'Book Shop Admin',
    ja: 'Bukku shoppu kanrisha',
    he: 'ניהול חנות ספרים',
  },
  subtitle: {
    en: 'Choose language',
    ja: 'Gengo o sentaku',
    he: 'בחר שפה',
  },
  'title-id': {
    en: 'Book ID',
    ja: 'Bukku ID',
    he: 'מספר זיהוי',
  },
  'title-name': {
    en: 'Name',
    ja: 'Namae',
    he: 'כותרת',
  },
  'title-price': {
    en: 'Price',
    ja: 'Kakaku',
    he: 'מחיר',
  },
  'title-actions': {
    en: 'Actions',
    ja: 'Kōdō',
    he: 'אופציות',
  },
  'title-rate': {
    en: 'Rate',
    ja: 'Wariai',
    he: 'דירוג',
  },
  'add-book': {
    en: 'Add book',
    ja: 'Hon o tsuika',
    he: 'הוספת ספר',
  },
  'book-read': {
    en: 'Read',
    he: 'קרא',
    ja: 'Yonda',
  },
  'book-update': {
    en: 'Update',
    he: 'עדכן',
    ja: 'Appudēto',
  },
  'book-delete': {
    en: 'Delete',
    he: 'מחק',
    ja: 'Shōkyo',
  },
  'Demon Slayer Entertainment District Arc': {
    en: 'Demon Slayer Entertainment District Arc',
    he: 'דיימון סלייר סאגת מחוז הבידור',
    ja: 'Kimetsu no Yaiba Yuukaku-hen',
  },
  'One Piece Wano Arc': {
    en: 'One Piece Wano Arc',
    he: 'וואן פיס סאגת וואנו',
    ja: 'Wanpīsu Wano kuni',
  },
  'Death Note Part I': {
    en: 'Death Note Part I',
    he: 'מחברת המווות חלק ראשון',
    ja: 'Desu Nōto Pāto 1',
  },
  symbol: {
    en: '$',
    he: '₪',
    ja: '¥',
  },
}

var gCurrLang = 'en'

function getTrans(transKey) {
  // If key is unknown return 'UNKNOWN'
  var key = gTrans[transKey]
  if (!key) return 'UNKNOWN'

  // Get from gTrans
  const translate = key[gCurrLang]

  // If translation not found - use english
  if (!translate) return key['en']

  return translate
}

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')

  els.forEach((el) => {
    const transKey = el.dataset.trans
    const txt = getTrans(transKey)

    if (el.nodeName === 'INPUT') el.placeholder = txt
    else el.innerText = txt
  })
}

function setLang(lang) {
  gCurrLang = lang
}

function formatNumOlder(num) {
  return num.toLocaleString('es')
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}

function formatDate(time) {
  const option = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}

function kmToMiles(km) {
  return km / 1.609
}
