// src/components/SessionWarningModal.js
import React from "react";
import "./SessionWarningModal.css";

const SessionWarningModal = ({ secondsLeft, onStayLoggedIn, onLogout }) => {
  return (
    <div className="session-modal-overlay">
      <div className="session-modal-box">
        <h2 className="session-modal-title">⚠ Session Expiring Soon</h2>
        <p className="session-modal-message">
          You will be logged out in <strong>{secondsLeft}</strong> seconds due to inactivity.
        </p>

        <div className="session-modal-buttons">
          <button className="modal-btn stay-btn" onClick={onStayLoggedIn}>
            Stay Logged In
          </button>
          <button className="modal-btn logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionWarningModal;
