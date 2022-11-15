class Book {
    constructor(
        title,
        author,
        pages,
        status
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
        this.books.push(newBook)
        } else {
            alert('Book is already in the library!')
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }

}

const library = new Library();

const shelf = document.querySelector('.shelf');
const addBookBtn = document.querySelector('.add-book');
const bookForm = document.querySelector('form');
const submitBookBtn = document.getElementById('submit');

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const status = document.getElementById('status').value
    return new Book(title,author,pages,status)
}

const addBook = (e) => {
    e.preventDefault();
    const newBook = getBookFromInput();
    library.addBook(newBook);
}

function showBooks() {
    shelf.innerHTML = ''
    for (let book of library.books) {
        createBookCard(book)
    }
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const status = document.createElement('div')
    const removeBtn = document.createElement('button')

    if(book.status == 'read') {
        status.classList.add('green')
    } else if(book.status == 'inprogress') {
        status.classList.add('orange')
    } else {
        status.classList.add('red')
    }

    bookCard.classList.add('card')
    bookCard.setAttribute('data-attribute', `${book.title}`)
    removeBtn.classList.add('remove')
    

    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages
    removeBtn.textContent = 'X'


    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(status)
    bookCard.appendChild(removeBtn)
    shelf.appendChild(bookCard)

    removeBtn.addEventListener('click', () => {
        if (bookCard.dataset.attribute == `${book.title}`) {
        bookCard.remove()
        library.removeBook(`${book.title}`)
        }
    })

    status.addEventListener('click', () => {
        if (status.className == 'green') {
            status.className = 'red'
            book.status = 'unread'
        } else  if(status.className == 'red') {
            status.className = 'orange'
            book.status = 'inprogress'
        } else if(status.className = 'orange') {
            status.className = 'green'
            book.status = 'read'
        }
    })
}

addBookBtn.addEventListener('click', () => {
    if(bookForm.style.opacity == 0) {
        bookForm.style.opacity = '1';
        } else {
            return;
        }
});

submitBookBtn.addEventListener('click', addBook);
submitBookBtn.addEventListener('click', showBooks)

showBooks()