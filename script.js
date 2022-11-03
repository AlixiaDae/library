let myLibrary = []

const hungerGames = new Book('Hunger Games', 'Suzanne Collins', 384, 'read')
const songOfAchilles = new Book('Song of Achilles', 'Madeline Miller', 416, 'read')

myLibrary.push(hungerGames)
myLibrary.push(songOfAchilles)

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

Book.prototype.addtoLibraryArray = (book) => {
    const existingTitles = myLibrary.map((addedBook) => addedBook.title)
    if(!existingTitles.includes(book.title)) {
        myLibrary.push(book)
    }
}

const shelf = document.querySelector('.shelf')

function showBooks() {
    shelf.innerHTML = ''
    for (let book of myLibrary) {
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
        
    })
}


const bookForm = document.querySelector('form')

function addBookToLibrary() {
    const title = document.getElementById('title').value 
    const author = document.getElementById('author').value 
    const pages = document.getElementById('pages').value 
    const status = document.getElementById('status').value 
    return new Book(title,author,pages,status)
}

const submitBtn = document.getElementById('submit')

submitBtn.addEventListener('click' , (input) => {
    input.preventDefault()
    const newBook = addBookToLibrary()
    newBook.addtoLibraryArray(newBook)
    showBooks()
})

showBooks()