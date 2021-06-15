//Book Class:  Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
} //end Book Class

//...........................................End Book Class..............................

//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

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
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  } //end addBookToList()

  //static method to delete a book based on it's element
  static deleteBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  } //end delete book()

  //create an Alert Message to show if the user does not input data into the fields
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //Make Alert Vanish after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  } //end showAlert

  //static method for clearing the input fields after a book has been added
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  } //end clearFields()
} //end UI Class

//.............................end UI Class....................................................

//Store Class:  Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books")); //local storage stores things as a string so we need to convert the String to an array using JSON.parse so that we can treat it like an object.
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks(); // get the Books

    books.push(book); //add the book to the end of the array

    localStorage.setItem("books", JSON.stringify(books)); //here we need to use JSON.stringify to turn the books array into a String so that it can be added to localStorage
  }

  static removeBook(isbn) {
    //we will remove a book by it's ISBN as this is a unique number to the book - so we know we have the correct book

    const books = Store.getBooks(); //get the books

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    }); //end loop

    localStorage.setItem("books", JSON.stringify(books));
  } //end removeBook()
} //end Store Class()

//.............................end Store Class...........................................

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

  //validate that the title, author and isbn have been filled in
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //Instantiate a book from the Book Class
    const book = new Book(title, author, isbn);

    //Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    //Show book added success message
    UI.showAlert("Book Added", "success");

    //Clear input fields
    UI.clearFields();
  }
});

//Event:  Remove a Book from UI
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // Remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show book deleted message
  UI.showAlert("Book Removed", "success");
});
