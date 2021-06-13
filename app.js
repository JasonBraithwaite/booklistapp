//Book Class:  Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3434434",
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "45545",
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  } //end displayBooks()

  //static method for adding books to the list
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"></a>X</td>
      `;

    list.appendChild(row);
  } //end addBookToList()

  //static method for clearing the input fields after a book has been added
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
} //end UI Class

//Store Class:  Handles Storage

//Event:  Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event:  Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Prevent actual submit
  e.preventDefault();

  //Get Form Values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Instantiate a book from the Book Class
  const book = new Book(title, author, isbn);

  //Add book to UI
  UI.addBookToList(book);

  //Clear input fields
  UI.clearFields();
});

//Event:  Remove a Book
