import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./ManageBooksPage.css";
import api from "../../services/api";

const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });

  // Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/books");
      setBooks(response.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add new book (admin only)
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.genre) {
      setError("Please fill in all book fields.");
      return;
    }

    try {
      // ✅ attach admin token automatically via interceptor in api.js
      const response = await api.post("/books", newBook);
      console.log("✅ Book added:", response.data);
      setSuccess("Book added successfully!");
      setError("");
      setNewBook({ title: "", author: "", genre: "" });
      fetchBooks();
    } catch (err) {
      console.error("❌ Error adding book:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to add book. (Admin access required)";
      setError(msg);
      setSuccess("");
    }
  };

  // Delete book (admin only)
  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${bookId}`);
      setSuccess("Book deleted successfully!");
      setError("");
      fetchBooks();
    } catch (err) {
      console.error("❌ Error deleting book:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to delete book. (Admin access required)";
      setError(msg);
      setSuccess("");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <section className="admin-section text-center">
          <h1 className="admin-title">Manage Books</h1>
          <p className="admin-subtext">
            View, update, add, and remove books in the system.
          </p>

          {/* Add Book Form */}
          <div className="add-book-form">
            <h3>Add a New Book</h3>
            <form onSubmit={handleAddBook}>
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Genre"
                value={newBook.genre}
                onChange={(e) =>
                  setNewBook({ ...newBook, genre: e.target.value })
                }
                required
              />
              <button type="submit" className="btn-add">
                Add Book
              </button>
            </form>
          </div>

          {success && <p className="success-text">{success}</p>}
          {error && <p className="error-text">{error}</p>}

          {/* Books Table */}
          {loading ? (
            <div className="admin-placeholder">
              <p>Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="admin-placeholder">
              <p>No books available.</p>
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
                            book.status === "borrowed"
                              ? "borrowed"
                              : "available"
                          }`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ManageBooksPage;
