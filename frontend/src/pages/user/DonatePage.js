import React, { useState } from 'react';
import './DonatePage.css';
import api from '../../services/api';

const DonatePage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !donorName || !donorEmail) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await api.post('/donations', {
        title,
        author,
        genre,
        donor_name: donorName,
        donor_email: donorEmail,
      });

      console.log('✅ Donation submitted:', response.data);

      setSuccess('Thank you! Your donation has been submitted.');
      setTitle('');
      setAuthor('');
      setGenre('');
      setDonorName('');
      setDonorEmail('');
    } catch (err) {
      console.error('❌ Donation error:', err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to submit donation. Please try again later.';
      setError(message);
    }
  };

  return (
    <div className="donate-section text-center">
      <h1 className="donate-title">Donate a Book</h1>
      <p className="donate-subtext">
        Give your books a second life by donating them to fellow students.
      </p>

      <div className="donate-box">
        <form className="donate-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              placeholder="Enter author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Enter genre (e.g. Fiction, Science)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button type="submit" className="btn-donate">Submit Donation</button>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
