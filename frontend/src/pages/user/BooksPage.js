import React, { useEffect, useState } from "react";
import "./BooksPage.css";
import api from "../../services/api";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Borrow a book
  const handleBorrow = async (bookId) => {
    try {
      setError("");
      setSuccess("");
      const response = await api.post("/borrow", { book_id: bookId });
      console.log("✅ Book borrowed:", response.data);
      setSuccess("Book borrowed successfully!");
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("❌ Error borrowing book:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to borrow book.";
      setError(message);
    }
  };

  return (
    <div className="books-section text-center">
      <h1 className="books-title">Available Books</h1>
      <p className="books-subtext">
        Browse through the collection of free books you can borrow.
      </p>

      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <div className="books-placeholder">
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="books-placeholder">
          <p>No books available at the moment.</p>
        </div>
      ) : (
        <div className="books-table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <span
                      className={`status ${
                        book.status === "borrowed" ? "borrowed" : "available"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td>
                    {book.status === "available" ? (
                      <button
                        className="btn-borrow"
                        onClick={() => handleBorrow(book.id)}
                      >
                        Borrow
                      </button>
                    ) : (
                      <button className="btn-disabled" disabled>
                        Unavailable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
