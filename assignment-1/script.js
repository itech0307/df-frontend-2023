// // Your JS code goes here
document.querySelector(".btn-add").addEventListener("click", function () {
  $("#addBookModal").modal("show");
});

document.querySelector(".btn-create").addEventListener("click", function () {
  const bookName = document.querySelector("#name").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookTopic = document.querySelector("#topic").value;

  if (bookName === "" || bookAuthor === "" || bookTopic === "") {
    alert("Please fill all the fields");
    return;
  }
  const book = {
    name: bookName,
    author: bookAuthor,
    topic: bookTopic,
  };
  // add data to the localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  // close the modal
  $("#addBookModal").modal("hide");
  // clear the form
  displayBooks();
});

function displayBooks(booksToDisplay) {
  const books =
    booksToDisplay || JSON.parse(localStorage.getItem("books")) || [];
  let html = "";
  books.forEach(function (book, index) {
    html += `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.topic}</td>
        <td>
          <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Delete</button>
        </td>
      </tr>
    `;
  });
  document.querySelector("#books").innerHTML = html;

  // add event listener to delete button
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      deleteBook(index);
    });
  });
}
function deleteBook(index) {
  // Retrieve the books from local storage
  const books = JSON.parse(localStorage.getItem("books")) || [];

  // Remove the book at the specified index
  books.splice(index, 1);

  // Save the updated books array back to local storage
  localStorage.setItem("books", JSON.stringify(books));

  // Refresh the table
  displayBooks();
}
function searchBooks(searchTerm) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const searchResults = books.filter(function (book) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      book.name.toLowerCase().includes(lowerCaseTerm) ||
      book.author.toLowerCase().includes(lowerCaseTerm) ||
      book.topic.toLowerCase().includes(lowerCaseTerm)
    );
  });
  displayBooks(searchResults);
}

// Event listener for the "Search" button
document
  .querySelector(".btn-search")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const searchTerm = document.querySelector("#searchInput").value;
    searchBooks(searchTerm);
  });
document.querySelector("#searchInput").addEventListener("input", function () {
  const searchTerm = this.value.trim(); // Get the trimmed value
  if (searchTerm === "") {
    displayBooks();
  } else {
    searchBooks(searchTerm);
  }
});
displayBooks();
